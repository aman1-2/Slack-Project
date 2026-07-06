import { v4 as uuidv4 } from 'uuid';

import workspaceRepository from "../repositories/workspaceRepository.js";
import ValidationError from "../utils/errors/validationError.js";
import channelRepository from '../repositories/channelRepository.js';
import ClientError from '../utils/errors/clientError.js';
import userRepository from '../repositories/userRepository.js';

// Some function might be populated and few might not so we are checking for both.
const isUserAdminOfWorkspace = (workspace, userId) => {
    return workspace.members.find(
        (member) => (
            (member.memberId.toString() == userId) || (member.memberId._id.toString() === userId)
        ) && member.role === 'admin'
    );
};

const isUserMemberOfWorkspace = (workspace, userId) => {
    return workspace.members.find(
        (member) => member.memberId.toString() === userId
    );
}; 

const isChannelPartOfWorkspace = (workspace, channelName) => {
    return workspace.channels.find(
        (channel) => channel.name === channelName
    );
};

export const createWorkspaceService = async (workspaceData) => {
    try {
        const joinCode = uuidv4().toUpperCase(); // This will return 36 character string
        
        const response = await workspaceRepository.create({ 
            name: workspaceData.name,
            description: workspaceData.description,
            joinCode  
        });

        await workspaceRepository.addMemberToWorkspace(response._id, workspaceData.owner, 'admin');

        const updatedWorkspace = await workspaceRepository.addChannelToWorkspace(response._id, 'Daemon');

        return updatedWorkspace;
    } catch(error) {
        console.log("Workspace Creation Service Layer Error: ", error);
        if (error.name === 'ValidationError') {
            throw new ValidationError(
                {
                    error: error.errors
                },
                error.message
            );
        }

        if (error.name === 'MongoServerError' && error.code === 11000) {
            throw new ValidationError(
                {
                    error: ['A Workspace with same details already exists']
                },
                'A Workspace with same details already exists'
            );
        }

        throw error;
    }
};

export const getWorkspaceUserIsMemberOfService = async (userId) => {
    try {
        const response = await workspaceRepository.fetchAllWorkspaceByMemberId(userId);
        return response;
    } catch(error) {
        console.log("Workspace Service Layer User Is Member of Workspace Error: ", error);
        throw error;
    }
};

export const deleteWorkspaceService = async (workspaceId, userId) => {
    try {
        const workspace = await workspaceRepository.getById(workspaceId);

        if(!workspace) {
            throw new ClientError({
                explanation: "Invalid Data send from the client",
                message: "Workspace not found",
                statusCode: 404
            });
        }

        // const isAllowed = workspace.members.find(
        //     (member) => member.memberId.toString() === userId && member.role === 'admin'
        // );

        const isAllowed = isUserAdminOfWorkspace(workspace, userId);

        // const channelIds = workspace.channels.map((channel) => channel._id);

        if(isAllowed) {
            await channelRepository.deleteMany(
                workspace.channels
            );

            const response = await workspaceRepository.delete(workspaceId);
            return response;
        }

        throw new ClientError({
            explanation: "User is either not a member or an admin of the workspace",
            message: "User not allowed to delete the Workspace",
            statusCode: 401
        });

    } catch(error) {
        console.log("Workspace deletion Service Layer Error: ", error);
        throw error;
    }
};

export const getWorkspaceService = async (workspaceId, userId) => {
    try {
        const workspace = await workspaceRepository.getById(workspaceId);
        if(!workspace) { // If workspace not exists
            throw new ClientError({
                explanation: 'Invalid data sent from the client',
                message: 'Workspace not found',
                statusCode: 404
            });
        }

        const isMember = isUserMemberOfWorkspace(workspace, userId);

        if(!isMember) { // If user not memeber of workspace
            throw new ClientError({
                explanation: 'Invalid data sent from the client',
                message: 'User not member of Workspace',
                statusCode: 401
            });
        }

        return workspace;
    } catch (error) {
        console.log("Get (details) Workspace Service Layer Error: ", error);
        throw error;
    }
};

export const getWorkspaceByJoinCodeService = async (joinCode, userId) => {
    try {
        const workspace = await workspaceRepository.getWorkspaceByJoinCode(joinCode);

        if(!workspace) {
            throw new ClientError({
                explanation: 'Invalid data sent from the client',
                message: 'Workspace not Found by following Join code',
                statusCode: 404
            });
        }

        const isMember = isUserMemberOfWorkspace(workspace, userId);

        if(!isMember) {
            throw new ClientError({
                explanation: 'Invalid data sent from the client',
                message: 'User not member of Workspace',
                statusCode: 401
            });
        }

        return workspace;
    } catch (error) {
        console.log("Get (details) Workspace by Join Code Service Layer Error: ", error);
        throw error;
    }
};

// Workspace will only be updated by the admin therefore not using getByIdAndUpdate function.
export const updateWorkspaceService = async ( 
    workspaceId, 
    workspaceData, 
    userId
) => {
    try {
        const workspace = await workspaceRepository.getById(workspaceId);

        if(!workspace) {
            throw new ClientError({
                explanation: 'Invalid data sent from the client',
                message: 'Workspace not Found',
                statusCode: 404
            });
        }

        const isAdmin = isUserAdminOfWorkspace(workspace, userId);

        if(!isAdmin) {
            throw new ClientError({
                explanation: 'User is not an admin of the Workspace',
                message: 'User is not an admin of the Workspace',
                statusCode: 401
            });
        }

        const updatedWorkspace = await workspaceRepository.update(workspaceId, workspaceData);

        return updatedWorkspace;
    } catch(error) {
        console.log("Update Workspace Service Layer Error: ", error);
        throw error;
    }
};

export const addMemberToWorkspaceService = async (workspaceId, memberId, role, userId ) => {
    try {
        const workspace = await workspaceRepository.getById(workspaceId);

        if(!workspace) {
            throw new ClientError({
                explanation: 'Invalid data sent from the client',
                message: 'Workspace not Found',
                statusCode: 404
            });
        }

        const isAdmin = isUserAdminOfWorkspace(workspace, userId);

        if(!isAdmin) {
            throw new ClientError({
                explanation: 'User is not an Admin of the Workspace to add a member',
                error: 'User is not an Admin of the Workspace',
                statusCode: 401
            });
        }


        const isValidUser = userRepository.getById(memberId);
        
        if(!isValidUser) {
            throw new ClientError({
                explanation: 'Invalid data sent from the client',
                message: 'User not found',
                statusCode: 404
            });
        }

        const isMember = isUserMemberOfWorkspace(workspace, memberId);

        if(isMember) {
            throw new ClientError({
                explanation: 'User is already a member of workspace',
                message: 'User is already a member of workspace',
                statusCode: 401
            });
        }

        const response = await workspaceRepository.addMemberToWorkspace(
            workspaceId, memberId, role
        );

        return response;
    } catch(error) {
        console.log("Add Member to Workspace Service Layer Error: ", error);
        throw error;
    }
};

export const addChannelToWorkspaceService = async (workspaceId, channelName, userId) => {
    try {
        const workspace = await workspaceRepository.getWorkspaceDetailsById(workspaceId);

        if(!workspace) {
            throw new ClientError({
                explanation: 'Invalid data sent from the client',
                message: 'Workspace not Found',
                statusCode: 404
            });
        }

        const isAdmin = isUserAdminOfWorkspace(workspace, userId);
        
        if(!isAdmin) {
            throw new ClientError({
                explanation: 'User is not an Admin of the Workspace',
                message: 'User is not an Admin of the Workspace',
                statusCode: 401
            });
        }

        const isChannelAlreadyCreated = isChannelPartOfWorkspace(workspace, channelName);

        if(isChannelAlreadyCreated) {
            throw new ClientError({
                explanation: 'Invvalid data sent from the client',
                message: 'Channel Already part of the Workspace',
                statusCode: 403
            });
        }

        const response = await workspaceRepository.addChannelToWorkspace(
            workspaceId, channelName
        );

        return response;
    } catch(error) {
        console.log("Add Channel to Workspace Service Layer Error: ", error);
        throw error;
    }
}
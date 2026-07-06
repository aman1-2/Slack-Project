import Workspace from "../schema/workspace.js";
import User from "../schema/user.js";

import crudRepository from "./crudRepository.js";

import ClientError from "../utils/errors/clientError.js";
import channelRepository from "./channelRepository.js";

const workspaceRepository = {
    ...crudRepository(Workspace),

    getWorkspaceByName: async function (workspaceName) {
        try {
            const workspace = await Workspace.findOne({ name: workspaceName });

            if(!workspace) {
                throw new ClientError({
                    explanation: "Invalid data send from client",
                    message: "Workspace not found",
                    statusCode: "404"
                });
            }

            return workspace;
        } catch(error) {
            console.log("Workspace Repository get by name Error: ", error);
            throw error;
        }
    },

    getWorkspaceByJoinCode: async function(joinCode) {
        try {
            const workspace = await Workspace.findOne({ joinCode });

            if(!workspace) {
                throw new ClientError({
                    explanation: "Invalid data send from client",
                    message: "Workspace not found",
                    statusCode: 404
                });
            }

            return workspace;
        } catch(error) {
            console.log("Workspace Repository get by join code Error: ", error);
            throw error;
        }
    },

    addMemberToWorkspace: async function(workspaceId, memberId, role) {
        try {
            const workspace = await Workspace.findById(workspaceId);

            if(!workspace) {
                throw new ClientError({
                    explanation: "Invalid data send from client",
                    message: "Workspace not found",
                    statusCode: "404"
                });
            }

            const isValidUser = await User.findById(memberId);

            if(!isValidUser) {
                throw new ClientError({
                    explanation: "Invalid data send feom client",
                    message: "User not found to add in workspace",
                    statusCode: "404"
                });
            }

            // Member already the part of the workspace
            const isMemberPartOfWorkspace = workspace.members.find((member) => member.memberId == memberId);
            
            if(isMemberPartOfWorkspace) {
                throw new ClientError({
                    explanation: "Invalid data sent from the client",
                    message: "User already part of workspace",
                    statusCode: 403
                });
            }

            workspace.members.push({
                memberId,
                role
            });

            await workspace.save();

            return workspace;
        } catch(error) {
            console.log("Workspace Repository add member Error: ", error);
            throw error;
        }
    },

    addChannelToWorkspace: async function(workspaceId, channelName) {
        try {
            const workspace = await Workspace.findById(workspaceId).populate('channels');

            if(!workspace) {
                throw new ClientError({
                    explanation: "Invalid data send from client",
                    message: "Workspace not found",
                    statusCode: "404"
                });
            }

            const isChannelPartOfWorkspace = await workspace.channels.find((channel) => channel.name === channelName);

            if(isChannelPartOfWorkspace) {
                throw new ClientError({
                    explanation: "Invalid data send from client",
                    message: "Channel is already part of the workspace",
                    statusCode: "403"
                });
            }

            // If channel doesn't exist then its first time this channel is going to created so we need to create this channel.
            const channel = await channelRepository.create({name: channelName, workspaceId: workspaceId});

            workspace.channels.push(channel);

            await workspace.save();

            return workspace;

        } catch(error) {
            console.log("Workspace Repository add channel Error: ", error);
            throw error;
        }
    },

    fetchAllWorkspaceByMemberId: async function(memberId) {
        try {
            const workspaces = await Workspace.find({
                'members.memberId': memberId
            }).populate('members.memberId', 'username email avatar');

            if(!workspaces) {
                throw new ClientError({
                    explanation: "",
                    message: "Member Not added in any Workspace",
                    statusCode: 404
                });
            }

            return workspaces;
        } catch(error) {
            console.log("Workspace Repository fetch all workspace by member-id Error: ", error);
            throw error;
        }
    },

    getWorkspaceDetailsById: async function(workspaceId) {
        try {
            const workspace = Workspace.findById(workspaceId)
            .populate('members.memberId', 'username email avatar')
            .populate('channels');

            return workspace;
        } catch(error) {
           console.log("Get workspace details by id Repository Layer Error: ", error);
            throw error; 
        }
    }
};

export default workspaceRepository;
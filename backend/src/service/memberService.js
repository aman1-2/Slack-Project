import workspaceRepository from '../repositories/workspaceRepository.js';
import userRepository from '../repositories/userRepository.js';
import { isUserMemberOfWorkspace } from '../utils/common/userUtils.js';
import ClientError from '../utils/errors/clientError.js';

export const isMemberPartOfWorkspaceService = async (
    workspaceId, memberId
) => {
    try {
        const workspace = await workspaceRepository.getById(workspaceId);

        if(!workspace) {
            throw new ClientError({
                explanation: 'Invalid data sent by client',
                message: "Workspace not found",
                statusCode: 404
            });
        }

        const isUserMember = isUserMemberOfWorkspace(workspace, memberId);
        
        if(!isUserMember) {
            throw new ClientError({
                explanation: 'User not a member of Workspace',
                message: "User not a member of Workspace",
                statusCode: 401
            });
        }

        const user = await userRepository.getById(memberId);

        return user;
    } catch(error) {
        console.log("Message Service Layer Error for checking Is member part of Workspace: ", error);
        throw error;
    }
};
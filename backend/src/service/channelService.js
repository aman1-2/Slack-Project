import channelRepository from '../repositories/channelRepository.js';
import { isUserMemberOfWorkspace } from '../utils/common/userUtils.js';
import  ClientError from '../utils/errors/clientError.js';

export const getChannelByIdService = async (channelId, userId) => {
    try {
        const channel = await channelRepository.getChannelWithWorkspaceDetails(channelId);

        if(!channel) {
            throw new ClientError({
                explanation: 'Invalid data sent by Client, no such channel-id exists',
                message: 'Channel Not Found',
                statusCode: 404
            });
        }

        const isUserPartOfWorkspace = isUserMemberOfWorkspace(channel.workspaceId, userId);

        if(!isUserPartOfWorkspace) {
            throw new ClientError({
                explanation: 'User is not a member of the Workspace and hence cannot access the channel.',
                message: 'User is not a member of the Workspace',
                statusCode: 401
            });
        }

        return channel;
    } catch(error) {
        console.log("Getting Channel by Id Service Layer Error: ", error);
        throw error;
    }
};
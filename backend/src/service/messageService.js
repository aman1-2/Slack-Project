import channelRepository from '../repositories/channelRepository.js';
import messageRepository from '../repositories/messageRepository.js';
import ClientError from '../utils/errors/clientError.js'
import { isUserMemberOfWorkspace } from '../utils/common/userUtils.js';

export const getMessagesService = async (messageParams, page, limit, userId) => {
    try {
        const channelDetails = await channelRepository.getChannelWithWorkspaceDetails(messageParams.channelId);

        if(!channelDetails) {
            throw new ClientError({
                explanation: 'Invalid data sent by client',
                message: 'Invalid Channel-Id Channel Not Found',
                statusCode: 404
            });
        }
        
        const workspace = channelDetails.workspaceId;

        const isMember = isUserMemberOfWorkspace(workspace, userId);

        if(!isMember) {
            throw new ClientError({
                explanation: 'User is not a member of workspace',
                message: 'User is not a memeber of workspace',
                statusCode: 401
            });
        }

        const messages = await messageRepository.getPaginatedMessages(
            messageParams, page, limit
        );

        if(!messages) {
            throw new ClientError({
                explanation: 'Channel or Message does not exists.',
                message: 'Channel or Message does not exists.',
                statusCode: 404
            });
        }

        return messages;
    } catch(error) {
        console.log("Fetching Messages, Message Service Layer Error: ", error);
        throw error;
    }
};

export const createMessageService = async(messageData) => {
    try {
        const messageResponse = messageRepository.create(messageData);
        return messageResponse;
    } catch(error) {
        console.log("Message Service Layer Error while Creating Message: ", error);
        throw error;
    }
};
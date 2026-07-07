import Channel from "../schema/channel.js";
import ClientError from "../utils/errors/clientError.js";
import crudRepository from "./crudRepository.js";

const channelRepository = {
    ...crudRepository(Channel),

    getChannelWithWorkspaceDetails: async function(channelId) {
        try {
            const channel = await Channel.findById(channelId).populate('workspaceId');

            if(!channel) {
                throw new ClientError({
                    explanation: "Invalid data send from client",
                    message: "Channel not found",
                    statusCode: "404"
                });
            }

            return channel;
        } catch(error) {
            console.log("Channel Repository get channel with workspace details Error: ", error);
            throw error;
        }
    }
};

export default channelRepository;
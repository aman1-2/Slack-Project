import { JOIN_CHANNEL } from "../utils/common/eventConstant.js";

export default function channelSocketHandler (io, socket) {
    socket.on(JOIN_CHANNEL, 
        async function joinChannelHandler(messageData, cb) {
            const roomId = messageData.channelId;

            socket.join(roomId);

            console.log(`User with Socket-id: ${socket.id} Joined Room Id: ${roomId}`);

            cb({
                success: true,
                message: "Successfully Joined the Channel",
                data: roomId
            });
        }
    );
};
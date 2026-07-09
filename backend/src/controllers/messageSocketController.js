import { createMessageService } from "../service/messageService.js";
import { NEW_MESSAGE_EVENT, NEW_MESSAGE_RECEIVED_EVENT } from "../utils/common/eventConstant.js";

export default function messageSocketHandlers(io, socket) {
    socket.on(NEW_MESSAGE_EVENT, 
        async function createMessageHandler(messageData, cb) {
            const messageResponse = await createMessageService(messageData);

            const roomId = messageData.channelId; 

            console.log("Room Id where New-Message-event is Trigged is: ", roomId);

            io.to(roomId).emit(NEW_MESSAGE_RECEIVED_EVENT, messageResponse); // Implementation of Rooms
            
            cb({
                status: true,
                message: "Successfully Created the Message.",
                data: messageResponse
            });
        }
    );
};
import { createMessageService } from "../service/messageService.js";
import { NEW_MESSAGE_EVENT } from "../utils/common/eventConstant.js";

export const messageHandlers = (io, socket) => {
    socket.on(NEW_MESSAGE_EVENT, createMessageHandler);
};

async function createMessageHandler(messageData, cb) {
    const messageResponse = await createMessageService(messageData);
    cb({
        status: true,
        message: "Successfully Created the Message.",
        data: messageResponse
    });
};
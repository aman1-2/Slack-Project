import mailQueue from "../queues/mailQueue.js"

import '../processors/mailProcessor.js';

export const addEmailtoMailQueue = async (emailData) => {
    try{
        await mailQueue.add("send-mail", emailData);
        console.log("Email Added to the Queue.");
    } catch(error) {
        console.log("Add Email to mail queue error: ", error);
        throw error;
    }
};
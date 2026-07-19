import { APP_LINK, MAIL_ID } from "../../config/serverConfig.js";

export const workspaceJoinMail = function(workspaceName) {
    return {
        from:  MAIL_ID,
        subject: "You have been added to the Workspace",
        text: `Congratulations! you have been added to the workspace ${workspaceName}`
    };
};

export const verifyEmailMail = function(verificationToken) {
    return {
        from: MAIL_ID,
        subject: "Welcome to the App. Please verify your Mail.",
        text: `Welcome to the App. Please verify your email by clicking on the link below: 
        ${APP_LINK}/verify/${verificationToken}`
    }
}

export default {
    from: MAIL_ID
};
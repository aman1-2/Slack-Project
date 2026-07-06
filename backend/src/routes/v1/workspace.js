import { Router } from "express";

import { createWorkspaceController, getWorkspacesUserIsMemberOfController, deleteWorkspaceController, getWorkspaceController, getWorkspaceByJoinCodeController, updateWorkspaceController, addMemberToWorkspaceController, addChannelToWorkspaceController } from "../../controllers/workspaceController.js";
import { validate } from "../../validators/zodValidator.js";
import { addChannelToWorkspaceSchema, addMemberToWorkspaceSchema, createWorkspaceSchema } from "../../validators/workspaceSchema.js";
import { isAuthenticates } from "../../middlewares/authMiddleware.js";

const router = Router();

router.post(
    '/', 
    isAuthenticates, 
    validate(createWorkspaceSchema), 
    createWorkspaceController
);

router.get(
    '/', 
    isAuthenticates, 
    getWorkspacesUserIsMemberOfController
);

router.delete(
    '/:workspaceId', 
    isAuthenticates, 
    deleteWorkspaceController
);

router.get(
    '/:workspaceId', 
    isAuthenticates, 
    getWorkspaceController
);

router.get(
    '/join/:joinCode', 
    isAuthenticates, 
    getWorkspaceByJoinCodeController);
router.put(
    '/:workspaceId', 
    isAuthenticates, 
    updateWorkspaceController
);

router.put(
    '/:workspaceId/members', 
    isAuthenticates, 
    validate(addMemberToWorkspaceSchema), 
    addMemberToWorkspaceController
);

router.put(
    '/:workspaceId/channels', 
    isAuthenticates, 
    validate(addChannelToWorkspaceSchema), 
    addChannelToWorkspaceController
);


export default router;
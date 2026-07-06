import { Router } from "express";

import { createWorkspaceController, getWorkspacesUserIsMemberOfController, deleteWorkspaceController, getWorkspaceController } from "../../controllers/workspaceController.js";
import { validate } from "../../validators/zodValidator.js";
import { createWorkspaceSchema } from "../../validators/workspaceSchema.js";
import { isAuthenticates } from "../../middlewares/authMiddleware.js";

const router = Router();

router.post('/', isAuthenticates, validate(createWorkspaceSchema), createWorkspaceController);
router.get('/', isAuthenticates, getWorkspacesUserIsMemberOfController);
router.delete('/:workspaceId', isAuthenticates, deleteWorkspaceController);
router.get('/:workspaceId', isAuthenticates, getWorkspaceController);

export default router;
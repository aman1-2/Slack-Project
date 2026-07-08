import { Router } from 'express';

import { isAuthenticates } from '../../middlewares/authMiddleware.js';

import { isMemberPartOfWorkspaceController } from '../../controllers/memberController.js';

const router = Router();

router.get('/workspace/:workspaceId', isAuthenticates, isMemberPartOfWorkspaceController);

export default router;
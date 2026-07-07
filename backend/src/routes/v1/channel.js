import { Router } from 'express';

import { isAuthenticates } from "../../middlewares/authMiddleware.js";
import { getChannelByIdController } from '../../controllers/channelController.js';

const router = Router();

router.get('/:channelId', isAuthenticates, getChannelByIdController);

export default router;
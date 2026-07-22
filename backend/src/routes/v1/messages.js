import { Router } from 'express';
import { isAuthenticates } from '../../middlewares/authMiddleware.js';
import { getMessagesController } from '../../controllers/messageController.js';

const router = Router();

router.get('/:channelId' ,isAuthenticates, getMessagesController);

export default router;
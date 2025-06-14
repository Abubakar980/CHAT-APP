import express from 'express';
import { getMessages, sendMessage } from '../controllers/message.controllers.js';
import { protectRoute } from '../middlewares/protectRoute.js';

const messageRouter = express.Router();

messageRouter.get('/:id', protectRoute, getMessages)
messageRouter.post('/send/:id', protectRoute, sendMessage)

export default messageRouter;
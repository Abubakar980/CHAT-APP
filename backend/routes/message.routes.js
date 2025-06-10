import express from 'express';
import { sendMessage } from '../controllers/message.controllers.js';
import { protectRoute } from '../middlewares/protectRoute.js';

const messageRouter = express.Router();

messageRouter.get('/send/:id', protectRoute, sendMessage)

export default messageRouter;
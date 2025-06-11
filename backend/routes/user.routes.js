import express from 'express';
import { protectRoute } from '../middlewares/protectRoute.js';
import { getUserForSidebar } from '../controllers/user.controllers.js';

const userRouter = express.Router();

userRouter.get('/', protectRoute, getUserForSidebar);

export default userRouter;
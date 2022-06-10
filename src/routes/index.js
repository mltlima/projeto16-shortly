import { Router } from 'express';

import authRouter from './authrouter.js';
import urlRouter from './urlrouter.js';
import userRouter from './userRouter.js';

const router = Router();

router.use(authRouter);
router.use(urlRouter);
router.use(userRouter);

export default router;
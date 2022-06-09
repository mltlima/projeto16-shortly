import { Router } from 'express';

import authRouter from './authrouter.js';
import urlRouter from './urlrouter.js';

const router = Router();

router.use(authRouter);
router.use(urlRouter);

export default router;
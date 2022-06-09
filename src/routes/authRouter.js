import { Router } from 'express';

import { signIn, signUp } from '../controllers/authController.js';
import validateMiddleware from '../middlewares/validateMiddleware.js';
import { signUpSchema, signInSchema } from '../schemas/authSchema.js';

const authRouter = Router();

authRouter.post("/signup", validateMiddleware(signUpSchema), signUp);
authRouter.post("/signin", validateMiddleware(signInSchema), signIn);

export default authRouter;
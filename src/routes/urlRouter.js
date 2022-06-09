import { Router } from "express";

import { shortenUrl } from "../controllers/urlController.js";
import validateMiddleware from '../middlewares/validateMiddleware.js';
import { validateToken } from "../middlewares/authMiddleware.js";
import { urlSchema } from '../schemas/urlSchema.js';

const urlRouter = Router();

urlRouter.use(validateToken);

urlRouter.post("/urls/shorten", validateMiddleware(urlSchema), shortenUrl);

export default urlRouter;
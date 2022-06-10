import { Router } from "express";

import { shortenUrl, getShortenedUrl } from "../controllers/urlController.js";
import validateMiddleware from '../middlewares/validateMiddleware.js';
import { validateToken } from "../middlewares/authMiddleware.js";
import { urlSchema } from '../schemas/urlSchema.js';

const urlRouter = Router();

urlRouter.post("/urls/shorten", validateMiddleware(urlSchema), validateToken, shortenUrl);
urlRouter.get("/urls/:id", getShortenedUrl);

export default urlRouter;
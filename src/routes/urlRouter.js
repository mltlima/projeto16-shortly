import { Router } from "express";

import { shortenUrl, getShortenedUrl, getUrl, deleteUrl } from "../controllers/urlController.js";
import validateMiddleware from '../middlewares/validateMiddleware.js';
import { validateToken } from "../middlewares/authMiddleware.js";
import { urlSchema } from '../schemas/urlSchema.js';

const urlRouter = Router();

urlRouter.post("/urls/shorten", validateMiddleware(urlSchema), validateToken, shortenUrl);
urlRouter.get("/urls/:id", getShortenedUrl);
urlRouter.get("/urls/open/:shortUrl", getUrl);
urlRouter.delete("/urls/:id", validateToken, deleteUrl);

export default urlRouter;
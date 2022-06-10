import { Router } from "express";
import { addURL } from "../controllers/URLController.js";
import { URLValidação } from "../middlewares/URLMiddleware.js";
import { getURLId } from "../controllers/URLController.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten",URLValidação, addURL);
urlRouter.get("/urls/:id", getURLId);
urlRouter.get("/urls/open/:shortUrl");
urlRouter.delete("/urls/:id");

export default urlRouter;
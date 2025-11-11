import { Router } from "express";
import { addFilePage } from "../controllers/readDB.js";

const addFileRouter = Router();

addFileRouter.get("/", addFilePage);

export default addFileRouter;

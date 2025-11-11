import { Router } from "express";
import { folderPageGet, editFolderPage } from "../controllers/readDB.js";
import { deleteFolder } from "../controllers/deleteFromDB.js";

const folderRouter = Router();

folderRouter.post("/deleteFolder/:id", deleteFolder);

folderRouter.get("/editFolderPg/:id", editFolderPage);

folderRouter.get("/:id", folderPageGet);

export default folderRouter;

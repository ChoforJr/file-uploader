import { Router } from "express";
import { folderPageGet, editFolderPage } from "../controllers/readDB.js";
import { deleteFolder } from "../controllers/deleteFromDB.js";
import { editFolder } from "../controllers/putToDB.js";
import {
  validateFolder,
  checkFolderValidationResult,
} from "../controllers/validations/validateFolder.js";

const folderRouter = Router();

folderRouter.post("/deleteFolder/:id", deleteFolder);

folderRouter.get("/editFolderPg/:id", editFolderPage);
folderRouter.post(
  "/editFolder/:id",
  validateFolder,
  checkFolderValidationResult,
  editFolder
);

folderRouter.get("/:id", folderPageGet);

export default folderRouter;

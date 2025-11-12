import { Router } from "express";
import multer from "multer";
import { addFilePage } from "../controllers/readDB.js";
import {
  validateFilesFolder,
  checkFilesFolderValidationResult,
} from "../controllers/validations/validateFileFolder.js";
import { addFiles } from "../controllers/postToDB.js";
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + "--" + file.originalname;
    cb(null, filename);
  },
});
const uploads = multer({ storage: fileStorageEngine });

const addFileRouter = Router();

addFileRouter.post(
  "/",
  uploads.single("uploads"),
  validateFilesFolder,
  checkFilesFolderValidationResult,
  addFiles
);

addFileRouter.get("/", addFilePage);

export default addFileRouter;

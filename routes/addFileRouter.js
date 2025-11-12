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

const allowedMimeTypes = ["image/jpeg", "image/png", "application/pdf"];
const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    // This file type is allowed
    cb(null, true);
  } else {
    // This file type is not allowed
    // Pass an error to be caught by the global error handler
    cb(
      new Error("Invalid file type. Only JPG, PNG, and PDF are allowed."),
      false
    );
  }
};

const limits = {
  fileSize: 1024 * 1024, // 1 MB limit
};

const uploads = multer({
  storage: fileStorageEngine,
  fileFilter: fileFilter,
  limits: limits,
});

const addFileRouter = Router();

addFileRouter.post(
  "/",
  uploads.array("uploads", 5),
  validateFilesFolder,
  checkFilesFolderValidationResult,
  addFiles
);

addFileRouter.use((err, req, res, next) => {
  console.error(err.stack);

  // Handle Multer-specific errors
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ error: "A file is too large. Max size is 1MB." });
    }
    if (err.code === "LIMIT_FILE_COUNT") {
      return res
        .status(400)
        .json({ error: "Too many files. Max 5 files are allowed." });
    }
    // You can add more Multer error codes here
  }

  // Handle our custom file type error
  if (
    err.message === "Invalid file type. Only JPG, PNG, and PDF are allowed."
  ) {
    return res.status(400).json({ error: err.message });
  }

  // Handle other generic or Prisma errors
  res.status(500).json({ error: "Something went wrong on the server." });
});

addFileRouter.get("/", addFilePage);

export default addFileRouter;

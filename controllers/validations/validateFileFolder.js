import { body, validationResult } from "express-validator";
import { getUserInfoByID } from "../../prisma_queries/find.js";

export const validateFilesFolder = [
  body("folder")
    .trim()
    .custom(async (value, { req }) => {
      const user = await getUserInfoByID(req.user.id);
      if (!user) {
        throw new Error("User Not Log-In");
      }
      const folders = user.folders;
      const folderExists = folders.find((folder) => folder.id == value);
      if (folderExists) {
        return true;
      }
      throw new Error("Folder doesn't exist");
    }),
];

export const checkFilesFolderValidationResult = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const folders = await getUserInfoByID(req.user.id);
    return res.status(400).render("addFile", {
      errors: errors.array(),
      styles: ["style.css"],
      folder: req.body.folder,
      folders,
    });
  } else {
    next();
  }
};

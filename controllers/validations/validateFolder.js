import { body, validationResult } from "express-validator";
import { getUserInfoByID } from "../../prisma_queries/find.js";

export const validateFolder = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("A title is required")
    .custom(async (value, { req }) => {
      const user = await getUserInfoByID(req.user.id);
      if (!user || !user.folders) {
        return true;
      }
      const folders = user.folders;
      const folderExists = folders.some(
        (folder) => folder.title.toLowerCase() === value.toLowerCase()
      );
      if (folderExists) {
        throw new Error("Folder name already taken");
      }
      return true;
    }),
];

export const checkFolderValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("createFolder", {
      errors: errors.array(),
      title: req.body.title,
      styles: ["style.css"],
    });
  } else {
    next();
  }
};

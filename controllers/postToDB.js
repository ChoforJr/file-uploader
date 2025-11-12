import {
  insertUser,
  insertfolder,
  insertFiles,
} from "../prisma_queries/create.js";
import { matchedData } from "express-validator";
import { hash } from "bcryptjs";

export async function addNewUser(req, res, next) {
  try {
    const { username, password } = matchedData(req);
    const hashedPassword = await hash(password, 10);
    const usernameLowerCase = username.toLowerCase();
    await insertUser(usernameLowerCase, hashedPassword);
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
}

export async function addFolder(req, res, next) {
  try {
    const { title } = matchedData(req);
    const author = Number(req.user.id);
    await insertfolder(author, title);
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
}

export async function addFiles(req, res, next) {
  try {
    const { folder } = matchedData(req);
    const author = Number(req.user.id);
    const folderId = Number(folder);
    insertFiles(
      req.file.originalname,
      req.file.filename,
      req.file.size,
      req.file.path,
      author,
      folderId
    );
    // console.log(req.file);
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
}

// data: {
//   original_name: originalName,
//   filename:      fileName,
//   size:          fileSize,
//   url :          filePath,
//   authorId      :userId,
//   foldersId     :folderID,
// },

import { unlink } from "node:fs";
import { delFolder, delFile } from "../prisma_queries/delete.js";
import { getFileByID } from "../prisma_queries/find.js";
import { getFoldersByID } from "../prisma_queries/find.js";

export async function deleteFolder(req, res, next) {
  try {
    const folderId = Number(req.params.id);
    const folders = await getFoldersByID(folderId);
    const files = folders.files;
    files.map((file) => {
      unlink(`${file.url}`, (err) => {
        if (err) throw err;
        console.log(`${file.url} was deleted`);
      });
    });
    await delFolder(folderId);
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
}

export async function deleteFile(req, res, next) {
  try {
    const fileId = Number(req.params.id);
    const file = await getFileByID(fileId);
    unlink(`${file.url}`, (err) => {
      if (err) throw err;
      console.log(`${file.url} was deleted`);
    });
    await delFile(fileId);
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
}

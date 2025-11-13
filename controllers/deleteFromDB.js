import { v2 as cloudinary } from "cloudinary";
import { delFolder, delFile } from "../prisma_queries/delete.js";
import { getFileByID } from "../prisma_queries/find.js";
import { getFoldersByID } from "../prisma_queries/find.js";

export async function deleteFolder(req, res, next) {
  try {
    const folderId = Number(req.params.id);
    const folders = await getFoldersByID(folderId);
    const files = folders.files;
    const publicIds = files.map((file) => {
      return file.filename;
    });
    await cloudinary.api.delete_resources(publicIds);
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
    if (!file) {
      return res.status(404).send("File not found");
    }
    await cloudinary.uploader.destroy(file.filename);
    await delFile(fileId);
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
}

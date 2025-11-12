import { delFolder, delFile } from "../prisma_queries/delete.js";

export async function deleteFolder(req, res, next) {
  try {
    const folderId = Number(req.params.id);
    await delFolder(folderId);
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
}

export async function deleteFile(req, res, next) {
  try {
    const fileId = Number(req.params.id);
    await delFile(fileId);
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
}

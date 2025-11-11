import { delFolder } from "../prisma_queries/delete.js";

export async function deleteFolder(req, res, next) {
  try {
    const folderId = Number(req.params.id);
    await delFolder(folderId);
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
}

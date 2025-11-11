import { userIsAdmin, updateFolder } from "../prisma_queries/update.js";
import { matchedData } from "express-validator";

export async function userBecomeAdmin(req, res) {
  await userIsAdmin(req.user.id);
  res.redirect("/");
}

export async function editFolder(req, res, next) {
  try {
    const { title } = matchedData(req);
    const folderID = Number(req.params.id);
    await updateFolder(folderID, title);
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
}

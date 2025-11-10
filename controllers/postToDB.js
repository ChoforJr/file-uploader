import { insertUser, insertfolder } from "../prisma_queries/create.js";
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

// import { insertUser, insertMessage } from "../db/queriesPost.js";
// import { matchedData } from "express-validator";
// import { hash } from "bcryptjs";

// export async function addNewUser(req, res, next) {
//   try {
//     const { fullname, username, password, isAdmin = false } = matchedData(req);
//     const hashedPassword = await hash(password, 10);
//     const usernameLowerCase = username.toLowerCase();
//     let isMember = false;
//     if (isAdmin) {
//       isMember = true;
//     }
//     await insertUser(
//       usernameLowerCase,
//       fullname,
//       hashedPassword,
//       isAdmin,
//       isMember
//     );
//     res.redirect("/");
//   } catch (err) {
//     return next(err);
//   }
// }

// export async function addNewMessage(req, res, next) {
//   try {
//     const { text, title } = matchedData(req);
//     const author = req.user.id;
//     await insertMessage(text, title, author);
//     res.redirect("/");
//   } catch (err) {
//     return next(err);
//   }
// }

// import { insertUser, insertMessage } from "../db/queriesPost.js";
// import { hash } from "bcryptjs";
// import { removeMessage, clearTables } from "../db/queriesDelete.js";

// export async function delMessage(req, res) {
//   await removeMessage(req.params.id);
//   res.redirect("/");
// }

// export async function toDefault(req, res, next) {
//   try {
//     await clearTables();
//     await addInitialUsers();
//     await addInitialMessages();
//     next();
//   } catch (error) {
//     return next(error);
//   }
// }

// async function addInitialUsers() {
//   for await (const element of initialUsers) {
//     const hashedPassword = await hash(element.password, 10);

//     await insertUser(
//       element.username,
//       element.fullname,
//       hashedPassword,
//       element.isAdmin,
//       element.isMember
//     );
//   }
// }
// async function addInitialMessages() {
//   for await (const element of initialMessages) {
//     await insertMessage(element.text, element.title, element.author);
//   }
// }

// const initialUsers = [
//   {
//     username: "choforforsakang@gmail.com",
//     fullname: "Chofor Forsakang",
//     password: "1234567890",
//     isAdmin: true,
//     isMember: true,
//   },
//   {
//     username: "goku@gmail.com",
//     fullname: "Son Goku",
//     password: "1234567890",
//     isAdmin: false,
//     isMember: true,
//   },
//   {
//     username: "vegeta@gmail.com",
//     fullname: "Prince Vegeta",
//     password: "1234567890",
//     isAdmin: false,
//     isMember: false,
//   },
// ];

// const initialMessages = [
//   {
//     text: "I am the Admin and first member",
//     title: "Admin",
//     author: "1",
//   },
//   {
//     text: "I am the second member",
//     title: "Member Only",
//     author: "2",
//   },
//   {
//     text: "I am just a user not a member",
//     title: "User Only",
//     author: "3",
//   },
// ];

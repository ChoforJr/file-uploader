import prisma from "../config/prisma.js";

export async function insertUser(username, password) {
  await prisma.user.create({
    data: {
      username: `${username}`,
      password: `${password}`,
    },
  });
}

export async function insertfolder(userId, title) {
  await prisma.folders.create({
    data: {
      title: title,
      authorId: userId,
    },
  });
}

import prisma from "../config/prisma.js";

export async function insertUser(username, password) {
  await prisma.user.create({
    data: {
      username: `${username}`,
      password: `${password}`,
    },
  });
}

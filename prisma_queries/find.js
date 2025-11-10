import prisma from "../config/prisma.js";

export async function getUsers() {
  const users = await prisma.user.findMany({
    include: {
      files: true,
      folders: true,
    },
  });
  return users;
}

export async function getUserInfoByUsername(username) {
  const user = await prisma.user.findUnique({
    where: { username: username },
  });
  return user;
}

export async function getUserInfoByID(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      files: true,
      folders: true,
    },
  });
  return user;
}

export async function getFiles() {
  const files = await prisma.files.findMany({
    include: {
      folders: true,
    },
  });
  return files;
}

export async function getFolders() {
  const folders = await prisma.folders.findMany();
  return folders;
}

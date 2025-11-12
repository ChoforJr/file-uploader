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

export async function insertFiles(
  originalName,
  fileName,
  fileSize,
  filePath,
  userId,
  folderID
) {
  await prisma.files.create({
    data: {
      original_name: originalName,
      filename: fileName,
      size: fileSize,
      url: filePath,
      authorId: userId,
      foldersId: folderID,
    },
  });
}
// await prisma.files.createMany({
//   data,
//   skipDuplicates: true, // Skip 'Bobo'
// })

import prisma from "../config/prisma.js";

export async function userIsAdmin(userId) {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      is_admin: true,
    },
  });
}

export async function updateFolder(folderID, newTitle) {
  await prisma.folders.update({
    where: {
      id: folderID,
    },
    data: {
      title: newTitle,
    },
  });
}

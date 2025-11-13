import prisma from "../config/prisma.js";

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

export async function updateFileFolder(fileId, folderId) {
  await prisma.files.update({
    where: {
      id: fileId,
    },
    data: {
      foldersId: folderId,
    },
  });
}

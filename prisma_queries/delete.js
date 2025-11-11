import prisma from "../config/prisma.js";

export async function delFolder(id) {
  await prisma.folders.delete({
    where: {
      id: id,
    },
  });
}

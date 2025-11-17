import { nodeCron as cron } from "node-cron";
import { v2 as cloudinary } from "cloudinary";
import {
  delFolder,
  delFile,
  deleteAllUsers,
} from "../prisma_queries/delete.js";
import {
  getFileByID,
  getFoldersByID,
  getAllFiles,
} from "../prisma_queries/find.js";

export async function deleteFolder(req, res, next) {
  try {
    const folderId = Number(req.params.id);
    const folders = await getFoldersByID(folderId);
    const files = folders.files;
    if (files.length == 0) {
      await delFolder(folderId);
      res.redirect("/");
    }
    const publicIds = files.map((file) => {
      return file.filename;
    });
    await cloudinary.api.delete_resources(publicIds);
    await delFolder(folderId);
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
}

export async function deleteFile(req, res, next) {
  try {
    const fileId = Number(req.params.id);
    const file = await getFileByID(fileId);
    if (!file) {
      return res.status(404).send("File not found");
    }
    await cloudinary.uploader.destroy(file.filename);
    await delFile(fileId);
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
}

export const clearAllData = cron.schedule("*/10 * * * *", async () => {
  console.log("Running scheduled database cleanup task...");
  try {
    const files = await getAllFiles();
    await deleteAllUsers();
    if (files.length == 0) {
      console.log("No files available");
      res.redirect("/");
      return;
    }
    const publicIds = files.map((file) => {
      return file.filename;
    });
    await cloudinary.api.delete_resources(publicIds);
    console.log("Database cleared successfully.");
  } catch (error) {
    console.error("Error during database cleanup:", error);
  }
});

export async function deleteAllManually(req, res, next) {
  try {
    console.log("Running manual database cleanup task...");
    const files = await getAllFiles();
    await deleteAllUsers();
    if (files.length == 0) {
      console.log("No files available");
      res.redirect("/");
      return;
    }
    const publicIds = files.map((file) => {
      return file.filename;
    });
    await cloudinary.api.delete_resources(publicIds);
    console.log("Database cleared successfully.");
  } catch (error) {
    console.error("Error during database cleanup:", error);
  }
}

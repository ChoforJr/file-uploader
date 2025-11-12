import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";
import path from "node:path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// Configure Cloudinary storage for Multer
export const cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    asset_folder: "file-uploader", // A folder name in your Cloudinary account
    allowed_formats: ["jpg", "png", "jpeg", "pdf"], // Allowed formats
    // You can add more transformation parameters here if needed
  },
});

# File Uploader

With this app user can upload files like jpg,png and pdf and download them later on, I will be using libraries like multer middleware for temporal storage and cloud storage like cloudinary for persitent storage

# Author : FORSAKANG CHOFOR JUNIOR

# Intructions, Incase your want to do it yourself

1. Set up a new project using Express and Prisma. Install all the necessary dependencies including Passport etc.
2. Set up session based authentication using Passport.js. Use the Prisma session store library to persist sessions in the database.
3. Add a form where authenticated users can upload a file. Save the file in your filesystem for now. You’ll need to integrate the multer middleware. We’ll upload these files once we have all other features working.
4. Add folders. Users should be able to CRUD folders and upload files in them. Set up routes and necessary database interactions for this.
5. Add a route to view specific file details like name, size, and upload time. There should be a download button to allow users to download the file.
6. Finally, add logic to upload files. You could store it in a database, but it’s advised to use a cloud storage service for this usecase. You can use Cloudinary or Supabase storage. When a file is uploaded, save the file URL in the database.
   Validate your files! How you do this is up to you. You can limit certain file types to upload and/or restrict files that are too heavy.

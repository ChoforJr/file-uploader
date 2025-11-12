import {
  getUserInfoByID,
  getFoldersByID,
  getFilesByFolderID,
  getFilesByUserID,
  getFoldersByUserID,
  getFileByID,
} from "../prisma_queries/find.js";

export async function homePageGet(req, res) {
  let userById = [];
  let filesByuserId = [];
  if (req.user) {
    userById = await getUserInfoByID(req.user.id);
    filesByuserId = await getFilesByUserID(req.user.id);
  }

  res.render("index", {
    scripts: ["index.js"],
    styles: ["style.css", "styleTable.css"],
    currentUser: req.user,
    files: filesByuserId,
    folders: userById.folders || [],
  });
}

export async function signUpPageGet(req, res) {
  res.render("signUp", {
    username: "",
    password: "",
    confirmPassword: "",
    styles: ["style.css"],
  });
}

export async function logInPageGet(req, res) {
  res.render("logIn", {
    username: "",
    password: "",
    styles: ["style.css"],
  });
}

export async function becomeAdminPage(req, res) {
  res.render("becomeAdmin", {
    code: "",
    styles: ["style.css"],
  });
}

export async function addFolderPage(req, res) {
  res.render("createFolder", {
    title: "",
    styles: ["style.css"],
    action: "addFolder",
    heading: "Create A Folder for your files",
    submitState: "Create",
  });
}

export async function folderPageGet(req, res) {
  const folder = await getFoldersByID(Number(req.params.id));
  const files = await getFilesByFolderID(Number(req.params.id));
  res.render("folderPage", {
    styles: ["style.css", "styleTable.css"],
    files: files,
    folder: folder,
  });
}

export async function editFolderPage(req, res) {
  const folder = await getFoldersByID(Number(req.params.id));
  res.render("createFolder", {
    title: folder.title,
    styles: ["style.css"],
    action: `folderPage/editFolder/${req.params.id}`,
    heading: "Change Folder Title",
    submitState: "Edit",
  });
}

export async function addFilePage(req, res) {
  const folders = await getFoldersByUserID(Number(req.user.id));
  res.render("addFile", {
    styles: ["style.css"],
    folders,
  });
}

export async function editFilePage(req, res) {
  const folders = await getFoldersByUserID(Number(req.user.id));
  res.render("changeFileFolder", {
    styles: ["style.css"],
    folders,
    action: `changeFolder/${req.params.id}`,
  });
}

export async function downloadFile(req, res) {
  const fileId = Number(req.params.id);
  const file = await getFileByID(fileId);
  res.download(`${file.url}`, `${file.original_name}`, (err) => {
    if (err) throw err;
    console.log(`${file.original_name} is unavailable`);
  });
}

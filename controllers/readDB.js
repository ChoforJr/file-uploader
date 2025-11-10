import { getUserInfoByID } from "../prisma_queries/find.js";

export async function homePageGet(req, res) {
  let userById = [];
  if (req.user) {
    userById = await getUserInfoByID(req.user.id);
  }

  res.render("index", {
    scripts: ["index.js"],
    styles: ["style.css", "styleTable.css"],
    currentUser: req.user,
    files: userById.files || [],
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
  });
}

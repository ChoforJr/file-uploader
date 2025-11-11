import { Router } from "express";
import passport from "passport";
import {
  homePageGet,
  signUpPageGet,
  logInPageGet,
  becomeAdminPage,
  addFolderPage,
} from "../controllers/readDB.js";
import { addNewUser, addFolder } from "../controllers/postToDB.js";
import {
  checkValidationResult,
  validateSignUpRules,
} from "../controllers/validations/validateSignUp.js";
import {
  validateLogInRules,
  checkLoginValidationResult,
} from "../controllers/validations/validateLogIn.js";
import {
  validateCode,
  checkCodeValidationResult,
} from "../controllers/validations/validateCode.js";
import { userBecomeAdmin } from "../controllers/putToDB.js";
import {
  validateFolder,
  checkFolderValidationResult,
} from "../controllers/validations/validateFolder.js";

import folderRouter from "./folderRouter.js";
import addFileRouter from "./addFileRouter.js";

const indexRouter = Router();

indexRouter.get("/sign-up", signUpPageGet);
indexRouter.post(
  "/sign-up",
  validateSignUpRules,
  checkValidationResult,
  addNewUser
);

indexRouter.get("/log-in", logInPageGet);
indexRouter.post(
  "/log-in",
  validateLogInRules,
  checkLoginValidationResult,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
  })
);

indexRouter.get("/becomeAdmin", becomeAdminPage);
indexRouter.post(
  "/becomeAdmin",
  validateCode,
  checkCodeValidationResult,
  userBecomeAdmin
);

indexRouter.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

indexRouter.get("/addFolder", addFolderPage);
indexRouter.post(
  "/addFolder",
  validateFolder,
  checkFolderValidationResult,
  addFolder
);

indexRouter.use("/folderPage/", folderRouter);

indexRouter.use("/addFile", addFileRouter);

indexRouter.get("/", homePageGet);

export default indexRouter;

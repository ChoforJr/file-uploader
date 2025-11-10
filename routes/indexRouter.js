import { Router } from "express";
import passport from "passport";
import {
  homePageGet,
  signUpPageGet,
  logInPageGet,
} from "../controllers/readDB.js";

const indexRouter = Router();

indexRouter.get("/sign-up", signUpPageGet);

indexRouter.get("/log-in", logInPageGet);

indexRouter.get("/", homePageGet);

export default indexRouter;

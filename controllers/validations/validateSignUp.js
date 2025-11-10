import { body, validationResult } from "express-validator";
import { getUserInfoByUsername } from "../../prisma_queries/find.js";

export const validateSignUpRules = [
  body("username")
    .trim()
    .isEmail()
    .withMessage("Email: Should be an email")
    .isLength({ min: 8, max: 250 })
    .withMessage("Email: Has to have a length of between 8 and 250")
    .custom(async (value) => {
      const user = await getUserInfoByUsername(value);
      if (!user) {
        return true;
      }
      throw new Error("Email: Has already been Added");
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8, max: 250 })
    .withMessage("Password: Has to have a length of between 8 and 250"),
  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("Confirm Password is required")
    .isLength({ min: 8, max: 250 })
    .withMessage("Confirm Password: Has to have a length of between 8 and 250")
    .custom(async (value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match Password");
      }
      return true;
    }),
];

export const checkValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const checkAdmin = req.body.isAdmin || false;
    return res.status(400).render("signUp", {
      errors: errors.array(),
      username: req.body.username,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      styles: ["style.css"],
    });
  } else {
    next();
  }
};

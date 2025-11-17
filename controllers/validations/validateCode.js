import { body, validationResult } from "express-validator";
import { getUserInfoByID } from "../../prisma_queries/find.js";

export const validateCode = [
  body("code")
    .trim()
    .notEmpty()
    .withMessage("Code is required")
    .equals("2025")
    .withMessage("Incorrect, Try Again!")
    .custom(async (value, { req }) => {
      const user = await getUserInfoByID(req.user.id);
      if (user.is_admin) {
        throw new Error("User is already an Admin");
      }
      return true;
    }),
];

export const checkCodeValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("becomeAdmin", {
      errors: errors.array(),
      code: req.body.code,
      styles: ["style.css"],
    });
  } else {
    next();
  }
};

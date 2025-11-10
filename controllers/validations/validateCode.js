import { body, validationResult } from "express-validator";

export const validateCode = [
  body("code")
    .trim()
    .notEmpty()
    .withMessage("Code is required")
    .equals("2025")
    .withMessage("Incorrect, Try Again!"),
];

export const checkCodeValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("join", {
      errors: errors.array(),
      code: req.body.code,
    });
  } else {
    next();
  }
};

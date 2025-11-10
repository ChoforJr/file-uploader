import { body, validationResult } from "express-validator";

export const validateMessageRules = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title: is required")
    .isLength({ max: 64 })
    .withMessage("Title: Can not be more than 64 characters"),
  body("text")
    .trim()
    .notEmpty()
    .withMessage("Message: is required")
    .isLength({ max: 250 })
    .withMessage("Message: Can not be more than 250 characters"),
];

export const checkMessageValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("newMessage", {
      errors: errors.array(),
      title: req.body.title,
      text: req.body.text,
    });
  } else {
    next();
  }
};

import { validationResult } from "express-validator";

export const handleInputError = (req, res, next) => {
  const errors = validationResult(req);
  console.log("errors: ", errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }).end();
  }
  next();
};

const { check, validationResult } = require("express-validator");

//this is for the signup validation
exports.validateSignupRequest = [
  check("firstName").notEmpty().withMessage("FirstName is required"),
  check("lastName").notEmpty().withMessage("LastName is required"),
  check("lastName"),
  check("email").isEmail().withMessage("Valid Email is required"),
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 character long"),
  //   check("password")
  //     .isLength({ min: 6 })
  //     .withMessage("Password must be at least 6 character long"),
];

//this is for the signin validation
exports.validateSigninRequest = [
  check("email").isEmail().withMessage("Valid Email is required"),
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("Password wrong"),
  //   check("password")
  //     .isLength({ min: 6 })
  //     .withMessage("Password must be at least 6 character long"),
];

//request need to validate before signin/signup
exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};

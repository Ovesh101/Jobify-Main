import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customError.js";
import { body, param, validationResult } from "express-validator";
import { JOB_STATUS, JOB_TYPE } from "../utils/constant.js";
import Job from "../models/JobModel.js";
import User from "../models/UserModel.js";
import mongoose from "mongoose";

const withValidationError = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      console.log(errors);
      if (!errors.isEmpty()) {
        const errorMessage = errors.array().map((error) => error.msg);

        if (errorMessage[0].startsWith("no job")) {
          throw new NotFoundError(errorMessage);
        }
        if (errorMessage[0].startsWith("Not Authorized")) {
          throw new NotFoundError(errorMessage);
        }

        throw new BadRequestError(errorMessage);
      }
      next();
    },
  ];
};

export const validateJobInput = withValidationError([
  body("company").notEmpty().withMessage("Please Provide Company"),
  body("position").notEmpty().withMessage("Please Provide Position"),
  body("jobLocation").notEmpty().withMessage("Please Provide Location"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("Invalid Status"),
  body("jobType").isIn(Object.values(JOB_TYPE)).withMessage("Invalid Type"),
]);

export const validateIdParam = withValidationError([
  param("id").custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError("Invalid MongoDB id.....");
    const job = await Job.findById(value);
    if (!job) throw new NotFoundError(`no job with id ${value}`);
    const isAdmin = req.user.role === "admin";
    const isOwnerOfJob = req.user.userId === job.createdBy.toString();
    if (!isAdmin && !isOwnerOfJob)
      throw new UnauthorizedError("Not Authorized to access this route");
  }),
]);

export const validateRegisterInput = withValidationError([
  body("name")
    .notEmpty()
    .withMessage("Please Provide name")
    .bail() // Stops further validations if this rule fails
    .isLength({ min: 3, max: 20 })
    .withMessage("Name must be between 3 and 20 characters"),
  body("email")
    .notEmpty()
    .withMessage("Please Provide Email")
    .bail()
    .isEmail()
    .withMessage("Invalid Email")
    .bail()
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError("Email already exists.");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("Please Provide Password")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("lastName")
    .notEmpty()
    .withMessage("Please Provide Last Name")
    .bail()
    .isLength({ min: 4, max: 20 })
    .withMessage("Last Name must be between 4 and 20 characters"),
  body("location")
    .notEmpty()
    .withMessage("Please Provide Location")
    .bail()
    .isLength({ min: 4, max: 20 })
    .withMessage("Location must be between 4 and 20 characters"),
]);


export const validateLoginInput = withValidationError([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),
  body("password").notEmpty().withMessage("password is required"),
]);

export const validateUpdateUserInput = withValidationError([
  body("name")
    .notEmpty()
    .withMessage("Please Provide name")
    .isLength({ min: 3, max: 20 }),
  body("email")
    .notEmpty()
    .withMessage("Please Provide Email")
    .isEmail()
    .withMessage("Invalid Email")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() != req.user.userId) {
        throw new BadRequestError("Email already exist..");
      }
    }),

  body("lastName")
    .notEmpty()
    .withMessage("Please Provide name")
    .isLength({ min: 4, max: 20 }),
  body("location")
    .notEmpty()
    .withMessage("Please Provide name")
    .isLength({ min: 4, max: 20 }),
]);

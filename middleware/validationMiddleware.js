import { BadRequestError , NotFoundError, UnauthorizedError } from "../errors/customError.js";
import { body , param , validationResult } from "express-validator";
import { JOB_STATUS, JOB_TYPE , ROLE } from "../utils/constant.js";
import Job from "../models/JobModel.js"
import User from "../models/UserModel.js"
import mongoose from "mongoose";

 const withValidationError = (validateValues)=>{
    return [
        validateValues,
        (req , res , next)=>{
            const errors = validationResult(req);
            console.log(errors);
            if(!errors.isEmpty()){
              const errorMessage = errors.array().map((error)=>error.msg)

              if(errorMessage[0].startsWith('no job')){
                throw new NotFoundError(errorMessage)
              }
              if(errorMessage[0].startsWith('Not Authorized')){
                throw new NotFoundError(errorMessage)
              }

              throw new BadRequestError(errorMessage)
            }
            next();
        }
    ]
}

export const validateJobInput = withValidationError([
    body('company').notEmpty().withMessage('Please Provide Company'),
    body('position').notEmpty().withMessage('Please Provide Position'),
    body('jobLocation').notEmpty().withMessage('Please Provide Location'),
    body('jobStatus').isIn(Object.values(JOB_STATUS)).withMessage("Invalid Status"),
    body("jobType").isIn(Object.values(JOB_TYPE)).withMessage("Invalid Type")


])

export  const validateIdParam = withValidationError([
    param('id').custom( async (value , {req})=> {
       const isValidId =  mongoose.Types.ObjectId.isValid(value);
       if(!isValidId) throw new BadRequestError("Invalid MongoDB id.....")
       const job =  await Job.findById(value);
       if (!job) throw new NotFoundError( `no job with id ${value}` )
       const isAdmin = req.user.role === 'admin'
       const isOwnerOfJob = req.user.userId === job.createdBy.toString()
       if(!isAdmin && !isOwnerOfJob) throw new UnauthorizedError("Not Authorized to access this route")
    }),
])

export const validateRegisterInput = withValidationError([
    body('name').notEmpty().withMessage('Please Provide name').isLength({min:3 , max : 20}),
    body('email').notEmpty().withMessage('Please Provide Email').isEmail().withMessage("Invalid Email").custom( async (email)=>{
        const user = await User.findOne({email})
        if(user){
            throw new BadRequestError("Email already exist..")
        }
    }),
    body('password').notEmpty().withMessage('Please Provide name').isLength({min:8 }).withMessage("Password must be atleast 8 character long.."),
    body('lastName').notEmpty().withMessage('Please Provide last name').isLength({min:4 , max : 20}),
    body('location').notEmpty().withMessage('Please Provide Location').isLength({min:4 , max : 20}),
    // body('role').isIn(Object.values(ROLE)).withMessage("Invalid  Credentials..")
])

export const validateLoginInput = withValidationError ([
    body('email')
      .notEmpty()
      .withMessage('email is required')
      .isEmail()
      .withMessage('invalid email format'),
    body('password').notEmpty().withMessage('password is required'),
  ]);

  export const validateUpdateUserInput = withValidationError([
    body('name').notEmpty().withMessage('Please Provide name').isLength({min:3 , max : 20}),
    body('email').notEmpty().withMessage('Please Provide Email').isEmail().withMessage("Invalid Email").custom( async (email , {req})=>{
        const user = await User.findOne({email})
        if(user  && user._id.toString() != req.user.userId){
            throw new BadRequestError("Email already exist..")
        }
    }),
   
    body('lastName').notEmpty().withMessage('Please Provide name').isLength({min:4 , max : 20}),
    body('location').notEmpty().withMessage('Please Provide name').isLength({min:4 , max : 20}),

  ])
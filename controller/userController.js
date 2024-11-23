import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import { UnauthenticatedError } from "../errors/customError.js";

import { createJWT } from "../utils/tokenUtils.js";

import { hashPassword, comparePassword } from "../utils/passwordUtils.js";

const register = async (req, res) => {
  req.body.password = await hashPassword(req.body.password);
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";
  const user = await User.create(req.body);
  res.status(StatusCodes.OK).json({ msg: "Register Successfully" });
};

const login = async (req, res) => {
  // check if user exists
  // check if password is correct

  const user = await User.findOne({ email: req.body.email });
  console.log(user);
  
  if (!user) throw new UnauthenticatedError("Invalid Email..");

  const isPasswordCorrect = await comparePassword(
    req.body.password,
    user.password
  );
  if (!isPasswordCorrect) throw new UnauthenticatedError("Invalid password..");

  const token = createJWT({ userId: user._id, role: user.role });

  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.OK).json({ msg: "Login Successfully " });
};

export const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "User Logout Successfully" });
};

export { register, login };

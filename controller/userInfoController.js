import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import Job from "../models/JobModel.js";
import cloudinary from "cloudinary";
import { formatImage } from "../middleware/multerMiddleware.js";
import { hashPassword } from "../utils/passwordUtils.js";

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user });
};

export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(StatusCodes.OK).json({ users, jobs });
};

export const updateUser = async (req, res) => {
  const newUser = { ...req.body };
  console.log(newUser);

  delete newUser.password;

  if (req.file) {
    const file = formatImage(req.file);

    const response = await cloudinary.v2.uploader.upload(file);

    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);
  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
  }

  res.status(StatusCodes.OK).json({ msg: "update user" });
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}); // You can apply filters like status, role, etc.
    res.status(StatusCodes.OK).json({ users });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Error fetching users", error });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params; // Get the user ID from the URL parameters
    const user = await User.findById(id); // Find user by ID

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "User not found" });
    }

    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Error fetching user", error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id; // User ID to be deleted
    const user = await User.findById(userId);

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" });
    }

    // If the user has an avatar, delete it from Cloudinary
    if (user.avatarPublicId) {
      await cloudinary.v2.uploader.destroy(user.avatarPublicId);
    }

    // Delete user from the database
    await User.findByIdAndDelete(userId);

    res.status(StatusCodes.OK).json({ msg: "User deleted successfully" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Error deleting user", error });
  }
};

export const createUser = async (req, res) => {
  try {
    console.log("User info:", req.body);

    // Check if the email is passed correctly
    const { email } = req.body;
    if (!email) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Email is required" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "User already exists" });
    }

    // Hash the password
    req.body.password = await hashPassword(req.body.password);


    // Create the user
    const user = await User.create(req.body);
    res
      .status(StatusCodes.CREATED)
      .json({ msg: "User Created Successfully", user });
  } catch (error) {
    console.error("Error during user creation:", error); // Log detailed error
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Error creating user", error });
  }
};

export const updateUserInfo = async (req, res) => {
  try {
    const userId = req.params.id; // User ID to be updated
    const updatedData = req.body; // Data to update the user with

 
    

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" });
    }

    // Update user fields (you can add more checks/fields to update as necessary)
    Object.assign(user, updatedData);

    // Save the updated user
    await user.save();

    res.status(StatusCodes.OK).json({
      msg: "User updated successfully",
      user: user, // Returning the updated user data
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Error updating user",
      error: error.message,
    });
  }
};

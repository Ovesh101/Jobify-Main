
import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
     
    },
    permissions: {
      type: [String], // Array of strings to store permission names or identifiers
      default: [], // Default to an empty array if no permissions are assigned
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
  }
);


export default mongoose.model('Role', RoleSchema);

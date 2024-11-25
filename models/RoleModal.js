import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      unique:true,
      trim: true, // Removes whitespace around the value
      set: (value) => value.toLowerCase(), // Convert to lowercase before saving
    },
    permissions: {
      type: Map, // Use a Map to define dynamic resources
      of: new mongoose.Schema(
        {
          view: { type: Boolean, default: false },
          create: { type: Boolean, default: false },
          update: { type: Boolean, default: false },
          delete: { type: mongoose.Schema.Types.Mixed, default: false }, 
          // Mixed allows boolean or dynamic conditions (functions or objects)
        },
        { _id: false } // Prevents an _id field for nested permissions
      ),
      default: {}, // Default to an empty object
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

export default mongoose.model("Role", RoleSchema);

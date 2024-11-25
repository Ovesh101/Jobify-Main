import mongoose from 'mongoose';
import { ROLE } from '../utils/constant.js';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true, // Automatically trims whitespace from the name
  },
  email: {
    type: String,
    trim: true, // Automatically trims whitespace from the email
    unique: true, // Ensures email is unique
    required: true, // Email must be provided
  },
  password: {
    type: String,
    required: true, // Password must be provided
  },
  lastName: {
    type: String,
    default: 'lastName',
    trim: true, // Automatically trims whitespace
  },
  location: {
    type: String,
    default: 'my city',
    trim: true, // Automatically trims whitespace
  },
  role: {
    type: String,
    default: ROLE.USER.toLowerCase(), // Ensure default is uppercase
  
   
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'], // Enum for status
    default: 'Active', // Default status is Active
  },
  avatar: String,
  avatarPublicId: String,
});

UserSchema.methods.toJSON = function(){
  let obj = this.toObject();
  delete obj.password;
  return obj;
}

export default mongoose.model('User', UserSchema);
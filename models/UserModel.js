import mongoose from 'mongoose';
import { ROLE } from '../utils/constant.js';

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  lastName: {
    type: String,
    default: 'lastName',
  },
  location: {
    type: String,
    default: 'my city',
  },
  role: {
    type: String,
  
    default: ROLE.USER,
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'], // Enum for status
    default: 'Active', // Default status is Active
  },
  avatar:String,
  avatarPublicId : String
});

UserSchema.methods.toJSON = function(){
  let obj = this.toObject();
  delete obj.password;
  return obj;
}

export default mongoose.model('User', UserSchema);
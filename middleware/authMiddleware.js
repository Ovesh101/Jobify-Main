import {
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} from "../errors/customError.js";
import RoleModal from "../models/RoleModal.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) throw new UnauthenticatedError("Authentication Invalid.....");
  try {
    const { userId, role } = verifyJWT(token);
   
    

    req.user = { userId, role };

    console.log("user data in token" , req.user);
    
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};

export const authorizedPermission = (resource, action) => {
  return async (req, res, next) => {
    const userRole = req.user.role;
    const roleData = await RoleModal.findOne({ role: userRole });

    if (!roleData.permissions[resource]?.[action]) {
      throw new UnauthorizedError(`You do not have permission to ${action} ${resource}`);
    }

    console.log("permission granted");
    

    next();
  };
};



export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser) throw new BadRequestError("Demo User. Read Only");
  next();
};

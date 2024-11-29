import { Router } from 'express';
const router = Router();


import {
  getCurrentUser,
  getApplicationStats,
  updateUser,
  getAllUsers,
  deleteUser,
  createUser,
  updateUserInfo,
  getUserById,
} from "../controller/userInfoController.js"
import { validateRegisterInput, validateUpdateUserInput } from '../middleware/validationMiddleware.js';

import upload from "../middleware/multerMiddleware.js"
import { authorizedPermission } from '../middleware/authMiddleware.js';

router.get('/current-user',  getCurrentUser);
router.get('/users/:id',  getUserById);
router.get('/users', authorizedPermission("users", "view"),   getAllUsers);
router.delete('/users/:id', authorizedPermission("users", "delete"),    deleteUser);
router.patch('/users/:id',  authorizedPermission("users", "update"),   updateUserInfo);
router.post('/users', authorizedPermission("users", "create"),  validateRegisterInput ,     createUser);
router.get('/admin/app-stats', getApplicationStats);
router.patch('/update-user' ,  upload.single('avatar')  , validateUpdateUserInput, updateUser);
export default router;
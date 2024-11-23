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
} from "../controller/userInfoController.js"
import { validateUpdateUserInput } from '../middleware/validationMiddleware.js';
import { authorizedPermission } from '../middleware/authMiddleware.js';
import { checkForTestUser } from "../middleware/authMiddleware.js"
import upload from "../middleware/multerMiddleware.js"

router.get('/current-user', getCurrentUser);
router.get('/users',  getAllUsers);
router.delete('/users/:id',  deleteUser);
router.patch('/users/:id',  updateUserInfo);
router.post('/users',   createUser);
router.get('/admin/app-stats',authorizedPermission('admin') , getApplicationStats);
router.patch('/update-user' , checkForTestUser , upload.single('avatar')  , validateUpdateUserInput, updateUser);
export default router;
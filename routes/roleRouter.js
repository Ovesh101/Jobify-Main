import express from 'express'; // Import express

import { createRole , editRole , deleteRole , getAllRoles , getRoleById } from '../controller/rolesController.js';
import { authorizedPermission } from '../middleware/authMiddleware.js';


const router = express.Router();

// Route to create a new role
router.post('/', authorizedPermission("roles", "create"), createRole);

// Route to get all roles
router.get('/', authorizedPermission("roles", "view"),   getAllRoles);

// Route to get a single role by ID
router.get('/:id',  getRoleById);

// Route to update a role by ID
router.patch('/:id', authorizedPermission("roles", "update"),  editRole);

// Route to delete a role by ID
router.delete('/:id', authorizedPermission("roles", "delete"),  deleteRole);

export default router; // Export the router

import express from 'express'; // Import express

import { createRole , editRole , deleteRole , getAllRoles , getRoleById } from '../controller/rolesController.js';
import { checkForTestUser } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to create a new role
router.post('/', checkForTestUser , createRole);

// Route to get all roles
router.get('/', checkForTestUser , getAllRoles);

// Route to get a single role by ID
router.get('/:id', checkForTestUser , getRoleById);

// Route to update a role by ID
router.patch('/:id', checkForTestUser , editRole);

// Route to delete a role by ID
router.delete('/:id', checkForTestUser , deleteRole);

export default router; // Export the router

import express from 'express'; // Import express

import { createRole , editRole , deleteRole , getAllRoles , getRoleById } from '../controller/rolesController.js';


const router = express.Router();

// Route to create a new role
router.post('/',  createRole);

// Route to get all roles
router.get('/',   getAllRoles);

// Route to get a single role by ID
router.get('/:id',  getRoleById);

// Route to update a role by ID
router.patch('/:id',  editRole);

// Route to delete a role by ID
router.delete('/:id',  deleteRole);

export default router; // Export the router

import Role from '../models/RoleModal.js'; // Import the Role model

// Create a new role
export const createRole = async (req, res) => {
    try {
      const { role, permissions } = req.body;
  
      console.log("role collection", req.body);
  
      // Check if the role already exists
      const existingRole = await Role.findOne({ role });
      if (existingRole) {
        return res.status(400).json({ message: 'Role already exists' });
      }
  
      // Create and save the new role
      const newRole = new Role({
        role,
        permissions, // Permissions should be an array of strings
      });
  
      await newRole.save();
  
      return res.status(201).json({
        message: 'Role created successfully',
        role: newRole,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };
  
  

// Get all roles
export const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find({});

    return res.status(200).json(roles);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get a single role by ID
export const getRoleById = async (req, res) => {
  try {
    const getRole = await Role.findById(req.params.id);

    if (!getRole) {
      return res.status(404).json({ message: 'Role not found' });
    }

    return res.status(200).json(getRole);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Edit a role by ID
export const editRole = async (req, res) => {
  try {
    console.log("hello");
    
    const { role, permissions } = req.body;
  
    

    // Find the role to update
    const updated_role = await Role.findById(req.params.id);
    if (!updated_role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    // Update role name and permissions if provided
    if (updated_role) {
        updated_role.role = role;
    }
    if (permissions) {
        updated_role.permissions = permissions;
    }

    await updated_role.save();

    return res.status(200).json({
      message: 'Role updated successfully',
      updated_role,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};



export const deleteRole = async (req, res) => {
  try {
    // Validate the ID in the request
    const { id } = req.params;
    const ToDeleteRole = await Role.findById(id);
    if (!ToDeleteRole) {
      return res.status(400).json({ message: 'There is No role' });
    }

    // Attempt to delete the role by ID
    const deletedRole = await Role.findByIdAndDelete(id);

    // If no role was found
    if (!deletedRole) {
      return res.status(404).json({ message: 'Role not found' });
    }

    return res.status(200).json({ message: 'Role deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

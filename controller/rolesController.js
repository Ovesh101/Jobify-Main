import Role from '../models/RoleModal.js'; // Import the Role model

export const createRole = async (req, res) => {
  try {
    const { role, permissions, customAttr } = req.body; // Extract `role`, `permissions`, and `customAttr` from the request body

    console.log("Role data received:", req.body);

    // Check if the role already exists
    const existingRole = await Role.findOne({ role });
    if (existingRole) {
      return res.status(400).json({ message: "Role already exists" });
    }

    // Validate permissions
    if (permissions && typeof permissions !== "object") {
      return res.status(400).json({ message: "Invalid permissions format" });
    }

    // Validate customAttr
    if (customAttr && typeof customAttr !== "object") {
      return res.status(400).json({ message: "Invalid customAttr format" });
    }

    // Create and save the new role
    const newRole = new Role({
      role,
      permissions: permissions ? new Map(Object.entries(permissions)) : undefined, // Convert permissions object to a Map if provided
      customAttr: customAttr || {}, // Default to an empty object if not provided
    });

    await newRole.save();

    return res.status(201).json({
      message: "Role created successfully",
      role: newRole,
    });
  } catch (error) {
    console.error("Error creating role:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


  
  

// Get all roles
export const getAllRoles = async (req, res) => {
    try {
      // Fetch all roles from the database
      const roles = await Role.find({});
    
      // Transform permissions from Map to plain object for easier readability in response
      const transformedRoles = roles.map(role => {
        const transformedRole = role.toObject(); // Convert Mongoose document to plain object
        
        // Convert the permissions Map to a plain object
        if (transformedRole.permissions instanceof Map) {
          transformedRole.permissions = Object.fromEntries(transformedRole.permissions.entries());
        }
        
        return transformedRole;
      });
    
      return res.status(200).json(transformedRoles);
    } catch (error) {
      console.error("Error fetching roles:", error);
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
      // Log for debugging purposes
      console.log("Editing role...");
  
      // Extract role and permissions from the request body
      const { role, permissions , customAttr } = req.body;
      console.log("editing " , req.body );
      
  
      // Validate role name (e.g., not empty or whitespace)
      if (role && role.trim().length === 0) {
        return res.status(400).json({ message: 'Role name cannot be empty' });
      }
  
      // Find the role by ID
      const updatedRole = await Role.findById(req.params.id);
      
      // If the role doesn't exist, return a 404 error
      if (!updatedRole) {
        return res.status(404).json({ message: 'Role not found' });
      }
  
      // Update the role name if provided
      if (role) {
        updatedRole.role = role;
      }
  
      // Update the permissions if provided
      if (permissions) {
        // Validate the permissions structure if needed
        // Example: Check if permissions is an object
        if (typeof permissions !== 'object' || Array.isArray(permissions)) {
          return res.status(400).json({ message: 'Invalid permissions structure' });
        }
  
        updatedRole.permissions = permissions;
      }
      if (customAttr) {
        // Validate the permissions structure if needed
        // Example: Check if permissions is an object
        if (typeof customAttr !== 'object' || Array.isArray(customAttr)) {
          return res.status(400).json({ message: 'Invalid Custom Attr structure' });
        }
  
        updatedRole.customAttr = customAttr;
      }
  
      // Save the updated role to the database
      await updatedRole.save();
  
      // Return a success response with the updated role
      return res.status(200).json({
        message: 'Role updated successfully',
        updatedRole, // Return the updated role object
      });
    } catch (error) {
      console.error("Error updating role:", error);
      return res.status(500).json({ message: 'Server error' });
    }
  };



export const deleteRole = async (req, res) => {
    try {

    
      
      // Extract the role ID from the request parameters
      const { id } = req.params;
  
      // Find the role by its ID
      const roleToDelete = await Role.findById(id);
  
      // If the role doesn't exist, return an error response
      if (!roleToDelete) {
        return res.status(404).json({ message: 'Role not found' });
      }
  
      // Attempt to delete the role by ID
      const deletedRole = await Role.findByIdAndDelete(id);
  
      // If the deletion was successful, return a success message
      return res.status(200).json({ message: 'Role deleted successfully' });
    } catch (error) {
      console.error("Error deleting role:", error);
      return res.status(500).json({ message: 'Server error' });
    }
  };

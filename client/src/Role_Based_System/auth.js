import customFetch from "../utils/customFetch"; // Utility for API calls

class PermissionSystem {
  constructor() {
    this.roles = {}; // Store roles and permissions
  }

  // Load roles and permissions from the server
  async loadPermissions() {

    console.log("load permission called");
    
    try {
      const response = await customFetch.get("/roles"); // Fetch roles
      const rolesData = response.data; // API returns an array of role objects
      console.log("role data in permission " , rolesData);
      
      rolesData.forEach((role) => {
        this.roles[role.role] = role.permissions; // Map roles to permissions
      });
    } catch (error) {
      console.error("Error loading permissions:", error);
    }
  }

  // Check if a user has permission for a specific resource and action
  hasPermission(user, resource, action) {

    if(user.role === "superadmin")return true;

    console.log("next line");
    
    
    const rolePermissions = this.roles[user.role]; // Get permissions for the user's role
    if (!rolePermissions) return false; // Role not found

    const resourcePermissions = rolePermissions[resource]; // Get resource permissions
    if (!resourcePermissions) return false; // Resource not found
  
    
    return resourcePermissions[action] === true; // Check if the action is allowed
  }
}

export default new PermissionSystem();

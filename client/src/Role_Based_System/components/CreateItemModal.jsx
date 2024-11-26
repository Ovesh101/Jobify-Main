import { useState } from "react";
import {
  Modal,
  Button,
  Box,
  Typography,
  Table,
  TextField,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CreateItemModal = ({ open, onClose, type, onSubmit }) => {
  const availablePermissions = ["users", "roles"]; // Resources (columns)

  const getInitialFormState = () => {
    if (type === "Role") {
      const permissions = availablePermissions.reduce((acc, resource) => {
        acc[resource] = {
          view: false,
          create: false,
          update: false,
          delete: false,
        };
        return acc;
      }, {});

      return {
        role: "",
        permissions,
        customAttr: {}, // Object to store custom permissions
      };
    }

    if (type === "User") {
      return {
        name: "",
        email: "",
        password: "",
        lastName: "",
        location: "",
      };
    }

    return {};
  };

  const [formData, setFormData] = useState(getInitialFormState());
  const [customPermission, setCustomPermission] = useState(""); // Input state for new permission

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle checkbox selection for resource actions
  const handlePermissionChange = (resource, action) => {
    setFormData((prevData) => {
      const updatedPermissions = { ...prevData.permissions };
      updatedPermissions[resource][action] =
        !updatedPermissions[resource][action];
      return { ...prevData, permissions: updatedPermissions };
    });
  };

  // Handle adding custom permission
  const handleAddCustomPermission = () => {
    if (customPermission.trim()) {
      setFormData((prevData) => {
        const updatedCustomAttr = { ...prevData.customAttr }; // Clone the object
        updatedCustomAttr[customPermission.trim()] = false; // Add new permission with default value false
        return { ...prevData, customAttr: updatedCustomAttr };
      });
      setCustomPermission(""); // Reset input after adding
    }
  };

  //handling deleting custom permission
  const handleDeleteCustomPermission = (key) => {
    setFormData((prevData) => {
      const updatedCustomAttr = { ...prevData.customAttr }; // Clone the object
      delete updatedCustomAttr[key]; // Remove the specific permission
      return { ...prevData, customAttr: updatedCustomAttr };
    });
  };

  // Handle checkbox change for custom permission
  const handleCustomPermissionChange = (permission) => {
    setFormData((prevData) => {
      const updatedCustomAttr = { ...prevData.customAttr }; // Clone the object
      updatedCustomAttr[permission] = !updatedCustomAttr[permission]; // Toggle value
      return { ...prevData, customAttr: updatedCustomAttr };
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(getInitialFormState()); // Reset form after submit
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: { xs: 3, sm: 4 },
          width: { xs: "95%", sm: "600px" },
          maxHeight: "90vh",
          overflowY: "auto",
          borderRadius: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "text.primary",
          }}
        >
          <CloseIcon />
        </IconButton>
        {/* Header */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 2,
            textAlign: "center",
            color: "text.primary",
          }}
        >
          Create {type}
        </Typography>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {type === "Role" && (
            <>
              <Box>
                {/* Role Name */}
                <Typography
                  variant="subtitle1"
                  sx={{ mb: 1, color: "text.secondary" }}
                >
                  Role Name
                </Typography>
                <TextField
                  label="Role Name"
                  variant="outlined"
                  fullWidth
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  sx={{ marginBottom: 2 }}
                />

                {/* Permissions Table */}
                <Typography
                  variant="subtitle1"
                  sx={{ mb: 1, color: "text.secondary" }}
                >
                  Permissions
                </Typography>
                <TableContainer
                  sx={{
                    maxHeight: "200px",
                    overflowY: "auto",
                    borderRadius: 2,
                  }}
                >
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell>Resource</TableCell>
                        <TableCell align="center">View</TableCell>
                        <TableCell align="center">Create</TableCell>
                        <TableCell align="center">Update</TableCell>
                        <TableCell align="center">Delete</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {availablePermissions.map((resource) => (
                        <TableRow key={resource}>
                          <TableCell>{resource}</TableCell>
                          {["view", "create", "update", "delete"].map(
                            (action) => (
                              <TableCell key={action} align="center">
                                <Checkbox
                                  checked={
                                    formData.permissions[resource][action]
                                  }
                                  onChange={() =>
                                    handlePermissionChange(resource, action)
                                  }
                                />
                              </TableCell>
                            )
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Custom Permissions */}
                <Box mt={3}>
                  <Typography
                    variant="subtitle1"
                    sx={{ mb: 1, color: "black" }}
                  >
                    Add Custom Permission
                  </Typography>
                  <TextField
                    label="Custom Permission"
                    variant="outlined"
                    fullWidth
                    value={customPermission}
                    onChange={(e) => setCustomPermission(e.target.value)}
                    sx={{ marginBottom: 2 }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddCustomPermission}
                    sx={{ marginBottom: 2 }}
                  >
                    Add Permission
                  </Button>

                  {/* Display Custom Permissions */}
                  <Box>
                    {Object.keys(formData.customAttr).map(
                      (permission, index) => (
                        <Box
                          key={index}
                          display="flex"
                          alignItems="center"
                          color="black"
                          justifyContent="space-between"
                          sx={{ mb: 1 }}
                        >
                          <Box display="flex" alignItems="center" gap={1}>
                            <Checkbox
                              checked={formData.customAttr[permission]}
                              onChange={() =>
                                handleCustomPermissionChange(permission)
                              }
                            />
                            <Typography>{permission}</Typography>
                          </Box>
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={() =>
                              handleDeleteCustomPermission(permission)
                            }
                          >
                            Remove
                          </Button>
                        </Box>
                      )
                    )}
                  </Box>
                </Box>
              </Box>
            </>
          )}

          {type === "User" && (
            <Box>
              {/* User Fields */}
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Location"
                variant="outlined"
                fullWidth
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                sx={{ marginBottom: 2 }}
              />
            </Box>
          )}

          {/* Submit Button */}
          <Box mt={3}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateItemModal;

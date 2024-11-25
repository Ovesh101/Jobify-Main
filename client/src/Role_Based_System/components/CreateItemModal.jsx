import React, { useState } from "react";
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
} from "@mui/material";

const CreateItemModal = ({ open, onClose, type, onSubmit }) => {
  const availablePermissions = ["users", "roles"]; // Resources (columns)

  const getInitialFormState = () => {
    if (type === "Role") {
      // Initialize permissions for all available resources
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

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(getInitialFormState());
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
          p: 4,
          width: { xs: "90%", sm: "500px" },
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 2,
            textAlign: "center",
            color: "black",
          }}
        >
          Create {type}
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Role Fields */}
          {type === "Role" && (
            <>
              <Box mb={3}>
                <Typography variant="subtitle1" sx={{ mb: 1, color: "black" }}>
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

                <Typography variant="subtitle1" sx={{ mb: 1, color: "black" }}>
                  Permissions
                </Typography>

                {/* Permissions Table */}
                <TableContainer>
                  <Table >
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
              </Box>
            </>
          )}

          {/* User Fields */}
          {type === "User" && (
            <>
              <Box mb={3}>
                <Typography variant="subtitle1" sx={{ mb: 1, color: "black" }}>
                  First Name
                </Typography>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  sx={{ marginBottom: 2 }}
                />

                <Typography variant="subtitle1" sx={{ mb: 1, color: "black" }}>
                  Last Name
                </Typography>
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
                <Typography variant="subtitle1" sx={{ mb: 1, color: "black" }}>
                  Email
                </Typography>
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
                <Typography variant="subtitle1" sx={{ mb: 1, color: "black" }}>
                  Password
                </Typography>
                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  sx={{ marginBottom: 2 }}
                />

                <Typography variant="subtitle1" sx={{ mb: 1, color: "black" }}>
                  Location
                </Typography>
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
            </>
          )}

          {/* Submit Button */}
          <Box mt={3}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                padding: "12px 0",
                "&:hover": { backgroundColor: "primary.dark" },
              }}
            >
              Create {type}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateItemModal;

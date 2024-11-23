import React, { useState } from "react";
import {
  Modal,
  Button,
  TextField,
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { toast } from "react-toastify";

const CreateItemModal = ({ open, onClose, type, onSubmit }) => {
  const availablePermissions = ["create_user", "edit_user", "delete_user"]; // Sample permissions list

  const getInitialFormState = () => {
    if (type === "User") {
      return {
        name: "",
        email: "",
        password: "",
        lastName: "",
        location: "",
      };
    }
    if (type === "Role") {
      return {
        role: "",
        permissions: [],
      };
    }
    return {};
  };

  const [formData, setFormData] = useState(getInitialFormState());

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle checkbox selection
  const handlePermissionChange = (permission) => {
    setFormData((prevData) => {
      const permissions = prevData.permissions.includes(permission)
        ? prevData.permissions.filter((perm) => perm !== permission)
        : [...prevData.permissions, permission];
      return { ...prevData, permissions };
    });
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      toast.success(`${type} created successfully!`);
      setFormData(getInitialFormState());
      onClose();
    } catch (error) {
      toast.error(`Error creating ${type}: ${error.message}`);
    }
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
            color: "text.primary",
            textAlign: "center",
          }}
        >
          Create {type}
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* User Fields */}
          {type === "User" && (
            <>
              <Box mb={3}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  sx={{
                    marginBottom: 2,
                    "& .MuiInputLabel-root": {
                      color: "text.secondary",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "gray",
                      },
                      "&:hover fieldset": {
                        borderColor: "primary.main",
                      },
                    },
                  }}
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  sx={{
                    marginBottom: 2,
                    "& .MuiInputLabel-root": {
                      color: "text.secondary",
                    },
                  }}
                />
                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  sx={{
                    marginBottom: 2,
                  }}
                />
                <TextField
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  sx={{
                    marginBottom: 2,
                  }}
                />
                <TextField
                  label="Location"
                  variant="outlined"
                  fullWidth
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </Box>
            </>
          )}

          {/* Role Fields */}
          {type === "Role" && (
            <>
              <Box mb={3}>
                <TextField
                  label="Role Name"
                  variant="outlined"
                  fullWidth
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  sx={{
                    marginBottom: 2,
                  }}
                />
                <Typography variant="subtitle1" sx={{ mb: 1 , color:"black" }}>
                  Permissions
                </Typography>
                <FormGroup sx={{ display: "grid", gap: 1 }}>
                  {availablePermissions.map((permission) => (
                    <FormControlLabel
                      key={permission}
                      control={
                        <Checkbox
                          checked={formData.permissions.includes(permission)}
                          onChange={() => handlePermissionChange(permission)}
                        />
                      }
                      label={permission}
                      sx={{
                        "& .MuiTypography-root": {
                          fontSize: "0.875rem", // Custom font size
                          color: "text.primary", // Set the color to the primary text color
                        },
                      }}
                    />
                  ))}
                </FormGroup>
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
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
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

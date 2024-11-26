import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  IconButton,
  Tooltip,
  Modal,
  Dialog,
  Collapse,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Divider,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import CreateItemModal from "./CreateItemModal"; // Reusing CreateItemModal

import PermissionSystem from "../auth";
import { useAdminContext } from "../Admin";

const RolesPermission = () => {
  const [roles, setRoles] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [createOpenModal, setCreateOpenModal] = useState(false);
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
  const [deleteRoleId, setDeleteRoleId] = useState(null);
  const [customPermission, setCustomPermission] = useState(""); // For input field
  const [openRows, setOpenRows] = useState({});

  const { user, isDarkTheme } = useAdminContext(); // Access the user from context

  const canCreateRoles = PermissionSystem.hasPermission(
    user.user,
    "roles",
    "create"
  );
  const canUpdateRoles = PermissionSystem.hasPermission(
    user.user,
    "roles",
    "update"
  );
  const canDeleteRoles = PermissionSystem.hasPermission(
    user.user,
    "roles",
    "delete"
  );

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await customFetch.get("/roles");

        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    fetchRoles();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditRole = (role) => {
    setSelectedRole(role);
    setOpenModal(true);
  };

  const handleSaveRole = async () => {
    try {
      // Send the PATCH request to update the role
      const response = await customFetch.patch(
        `/roles/${selectedRole._id}`,
        selectedRole
      );

      // Show success toast if the request is successful
      toast.success("Updated Role Successfully");

      // Update the roles in the state after the role is updated
      setRoles((prevRoles) =>
        prevRoles.map((role) =>
          role._id === selectedRole._id ? { ...role, ...selectedRole } : role
        )
      );

      // Close the modal and reset the selectedRole state
      setOpenModal(false);
      setSelectedRole(null);
    } catch (error) {
      // Check if the error contains a response with a message
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while updating the role";
      toast.error(errorMessage);
      console.error("Error saving role:", error);
    }
  };

  const handleDeleteRole = async (roleId) => {
    try {
      // Perform the DELETE request to delete the role
      const response = await customFetch.delete(`/roles/${roleId}`);

      // Handle success: filter out the deleted role from the state
      setRoles((prevRoles) => prevRoles.filter((role) => role._id !== roleId));

      // Show success toast message
      toast.success("Role deleted successfully!");

      // Close the confirmation dialog
      setIsDeleteConfirm(false);
    } catch (error) {
      // Handle errors and show error toast message
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while deleting the role";
      toast.error(errorMessage);
      console.error("Error deleting role:", error);
    }
  };

  const handleCreateRole = async (formData) => {
    try {
      const response = await customFetch.post("/roles", formData);

      toast.success(response.data.message);

      setRoles((prevRoles) => [...prevRoles, response.data.role]);

      setCreateOpenModal(false);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong!";

      // Show error toast message
      toast.error(errorMessage);

      // Log error for debugging
      console.error("Error occurred while creating role:", errorMessage);
    }
  };

  const handlePermissionChange = (resource, permission, checked) => {
    setSelectedRole((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [resource]: {
          ...prev.permissions[resource],
          [permission]: checked,
        },
      },
    }));
  };

  const handleDeleteCustomAttr = (key) => {
    setSelectedRole((prevState) => {
      const updatedCustomAttr = { ...prevState.customAttr }; // Clone the current customAttr object
      delete updatedCustomAttr[key]; // Remove the specified attribute
      return {
        ...prevState,
        customAttr: updatedCustomAttr, // Update the customAttr with the modified object
      };
    });
  };
  const handleAddCustomPermission = () => {
    if (customPermission.trim()) {
      setSelectedRole((prevState) => {
        const updatedCustomAttr = { ...prevState.customAttr }; // Clone the object
        updatedCustomAttr[customPermission.trim()] = false; // Add new permission with default value false
        return { ...prevState, customAttr: updatedCustomAttr };
      });
      setCustomPermission(""); // Reset the input field after adding
    }
  };

  const handleCustomPermissionChange = (permission) => {
    setSelectedRole((prevData) => {
      const updatedCustomAttr = { ...prevData.customAttr }; // Clone the object
      updatedCustomAttr[permission] = !updatedCustomAttr[permission]; // Toggle value
      return { ...prevData, customAttr: updatedCustomAttr };
    });
  };

  const toggleRow = (id) => {
    setOpenRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="mb-10  ">
      <h2
        className={`text-2xl font-semibold mb-4 ${
          isDarkTheme ? "text-white" : "text-black"
        }`}
      >
        Roles & Permissions
      </h2>

      {canCreateRoles ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCreateOpenModal(true)}
          sx={{ marginBottom: "20px" }}
        >
          Create Role
        </Button>
      ) : (
        ""
      )}

      <TableContainer component={Paper} className="shadow-lg rounded-md">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="font-semibold">Role Name</TableCell>
              <TableCell className="font-semibold">Summary</TableCell>
              <TableCell className="font-semibold" align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.length > 0 ? (
              roles
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((role) => (
                  <>
                    {/* Compact Row */}
                    <TableRow key={role._id} hover>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <IconButton
                            onClick={() => toggleRow(role._id)}
                            size="small"
                          >
                            {openRows[role._id] ? (
                              <KeyboardArrowUp />
                            ) : (
                              <KeyboardArrowDown />
                            )}
                          </IconButton>
                          <span className="ml-2">{role.role}</span>
                        </Box>
                      </TableCell>

                      {/* Summary */}
                      <TableCell>
                        {role.role === "superadmin"
                          ? "All Permissions"
                          : `${
                              Object.keys(role.permissions || {}).length
                            } Permissions`}
                      </TableCell>

                      {/* Actions */}
                      <TableCell align="center">
                        {role.role !== "superadmin" ? (
                          <>
                            {canUpdateRoles && (
                              <Tooltip title="Edit Role">
                                <IconButton
                                  color="primary"
                                  onClick={() => handleEditRole(role)}
                                >
                                  <EditIcon />
                                </IconButton>
                              </Tooltip>
                            )}
                            {canDeleteRoles && (
                              <Tooltip title="Delete Role">
                                <IconButton
                                  color="error"
                                  onClick={() => {
                                    // Add your delete logic here
                                  }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            )}
                          </>
                        ) : (
                          <span>Protected</span>
                        )}
                      </TableCell>
                    </TableRow>

                    {/* Collapsible Row */}
                    <TableRow>
                      <TableCell
                        style={{ paddingBottom: 0, paddingTop: 0 }}
                        colSpan={3}
                      >
                        <Collapse
                          in={openRows[role._id]}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Box margin={2}>
                            {/* Permissions Section */}
                            <h4 className="font-semibold mb-2">Permissions</h4>
                            {Object.keys(role.permissions || {}).map(
                              (section) => (
                                <div key={section} className="mb-2">
                                  <h5 className="font-medium">{section}</h5>
                                  <Box display="flex" flexWrap="wrap">
                                    {Object.keys(role.permissions[section]).map(
                                      (perm) => (
                                        <Box
                                          key={perm}
                                          display="flex"
                                          alignItems="center"
                                          mr={2}
                                        >
                                          <Checkbox
                                            checked={
                                              role.permissions[section][perm]
                                            }
                                            disabled
                                          />
                                          <span>{perm}</span>
                                        </Box>
                                      )
                                    )}
                                  </Box>
                                </div>
                              )
                            )}

                            {/* Custom Attributes */}
                            {role.customAttr &&
                              Object.keys(role.customAttr).length > 0 && (
                                <>
                                  <h4 className="font-semibold mt-4 mb-2">
                                    Custom Attributes
                                  </h4>
                                  <Box display="flex" flexWrap="wrap">
                                    {Object.entries(role.customAttr).map(
                                      ([key, value]) => (
                                        <Box
                                          key={key}
                                          display="flex"
                                          alignItems="center"
                                          mr={2}
                                        >
                                          <Checkbox checked={value} disabled />
                                          <span>{key}</span>
                                        </Box>
                                      )
                                    )}
                                  </Box>
                                </>
                              )}
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No roles created
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={roles.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className="mt-4"
        />
      </TableContainer>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: "12px",
            boxShadow: 24,
            p: 4,
            width: { xs: "90%", sm: "600px" }, // Responsive width
            maxHeight: "90vh", // Scrollable for small screens
            overflowY: "auto",
          }}
        >
          <IconButton
            onClick={() => setOpenModal(false)}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "text.primary",
            }}
          >
            <CloseIcon />
          </IconButton>
          {/* Modal Header */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              color: "primary.main",
              mb: 3,
            }}
          >
            Edit Role
          </Typography>

          {/* Role Name Field */}
          <TextField
            label="Role Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedRole?.role || ""}
            onChange={(e) =>
              setSelectedRole((prev) => ({ ...prev, role: e.target.value }))
            }
          />

          <Divider sx={{ my: 3 }} />

          {/* Permissions Section */}
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", mb: 2, color: "text.primary" }}
          >
            Permissions
          </Typography>

          {/* Permission List */}
          {Object.keys(selectedRole?.permissions || {}).map((resource) => (
            <Box key={resource} sx={{ mb: 3 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  color: "text.primary",
                  mb: 1,
                }}
              >
                {resource.charAt(0).toUpperCase() + resource.slice(1)}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  color: "text.primary",
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                {Object.keys(selectedRole.permissions[resource]).map(
                  (permission) => (
                    <FormControlLabel
                      key={permission}
                      control={
                        <Checkbox
                          checked={
                            selectedRole.permissions[resource][permission]
                          }
                          onChange={(e) =>
                            handlePermissionChange(
                              resource,
                              permission,
                              e.target.checked
                            )
                          }
                        />
                      }
                      label={
                        permission.charAt(0).toUpperCase() + permission.slice(1)
                      }
                    />
                  )
                )}
              </Box>
            </Box>
          ))}

          {/* Add Custom Permissions */}
          <Divider sx={{ my: 3 }} />
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", mb: 2, color: "text.primary" }}
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
              fullWidth
              onClick={handleAddCustomPermission}
              sx={{ mb: 2 }}
            >
              Add Permission
            </Button>
            <Box>
              {selectedRole?.customAttr &&
                Object.keys(selectedRole.customAttr).map(
                  (permission, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          color: "black",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <Checkbox
                          checked={!!selectedRole.customAttr[permission]}
                          onChange={() =>
                            handleCustomPermissionChange(permission)
                          }
                        />
                        <Typography
                          variant="body2"
                          sx={{ color: "text.primary" }}
                        >
                          {permission}
                        </Typography>
                      </Box>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleDeleteCustomAttr(permission)}
                      >
                        Remove
                      </Button>
                    </Box>
                  )
                )}
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Save Button */}
          <Button
            onClick={handleSaveRole}
            variant="contained"
            color="primary"
            fullWidth
            sx={{ py: 1.5, fontWeight: "bold" }}
          >
            Save Changes
          </Button>
        </Box>
      </Modal>

      <Dialog
        open={isDeleteConfirm}
        onClose={() => setIsDeleteConfirm(false)}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography
            variant="body1"
            color="textSecondary"
            id="delete-dialog-description"
          >
            Are you sure you want to delete this role? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteConfirm(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleDeleteRole(deleteRoleId)}
            color="secondary"
            variant="contained"
          >
            Yes, delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Role Modal */}
      <CreateItemModal
        open={createOpenModal}
        onClose={() => setCreateOpenModal(false)}
        onSubmit={handleCreateRole}
        type="Role"
      />
    </div>
  );
};

export default RolesPermission;

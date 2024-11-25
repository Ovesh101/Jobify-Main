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
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Divider,
  Box,
  Typography,
  Alert,
  FormControl,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
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

  const { user } = useAdminContext(); // Access the user from context

  const canCreateRoles = PermissionSystem.hasPermission(
    user,
    "roles",
    "create"
  );
  const canUpdateRoles = PermissionSystem.hasPermission(
    user,
    "roles",
    "update"
  );
  const canDeleteRoles = PermissionSystem.hasPermission(
    user,
    "roles",
    "delete"
  );

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await customFetch.get("/roles");
        console.log("roles info", response.data);

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
    console.log("role table info", role);

    setSelectedRole(role);
    setOpenModal(true);
  };

  const handleSaveRole = async () => {
    console.log(selectedRole);

    try {
      // Send the PATCH request to update the role
      const response = await customFetch.patch(
        `/roles/${selectedRole._id}`,
        selectedRole
      );

      console.log(response.data);

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
      console.log("Form data in role:", formData);

      const response = await customFetch.post("/roles", formData);

      console.log("Successfully created role:", response.data);

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

  return (
    <div className="mb-10  ">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
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
              <TableCell className="font-semibold">Permissions</TableCell>
              <TableCell className="font-semibold">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.length > 0 ? (
              roles
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((role) => (
                  <TableRow
                    key={role._id}
                    hover
                    className="transition duration-300 ease-in-out"
                  >
                    {/* Role Name */}
                    <TableCell>{role.role}</TableCell>

                    {/* Permissions */}
                    <TableCell>
                      <div>
                        {/* Loop through the permissions object keys */}
                        {role.permissions &&
                          Object.keys(role.permissions).map((section) => (
                            <div key={section} className="mb-4">
                              {/* Resource Name */}
                              <h4 className="font-semibold mb-2 text-lg">
                                {section}
                              </h4>

                              {/* Display permissions using Box (Flexbox) */}
                              <Box display="flex" flexWrap="wrap">
                                {/* Check if the role is "superadmin" */}
                                {role.role === "superadmin" ? (
                                  <div>All Permissions</div>
                                ) : (
                                  // Otherwise, map through the permissions
                                  Object.keys(role.permissions[section]).map(
                                    (perm) => (
                                      <Box
                                        key={perm}
                                        display="flex"
                                        alignItems="center"
                                        mr={4}
                                      >
                                        <Checkbox
                                          checked={
                                            role.permissions[section][perm]
                                          }
                                          disabled
                                          color="primary"
                                          inputProps={{
                                            "aria-label": `${perm} permission`,
                                          }}
                                        />
                                        <span>{perm}</span>
                                      </Box>
                                    )
                                  )
                                )}
                              </Box>
                            </div>
                          ))}
                      </div>
                    </TableCell>

                    {/* Actions */}
                    <TableCell>
                      {/* Check if role is superadmin */}
                      {role.role === "superadmin" ? (
                        <span>Settings are protected</span>
                      ) : (
                        <>
                          {/* Conditionally show Edit button based on canUpdateUsers */}
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

                          {/* Always show Delete button for non-superadmin roles */}
                          {canDeleteRoles && (
                          <Tooltip title="Delete Role">
                            <IconButton
                              color="error"
                              onClick={() => {
                                setIsDeleteConfirm(true);
                                setDeleteRoleId(role._id);
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                          )}
                        </>
                      )}
                    </TableCell>
                  </TableRow>
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

        {/* Pagination Controls */}
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
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
            width: "400px",
          }}
        >
          <Typography variant="h6" sx={{ color: "black" }} gutterBottom>
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

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle1" sx={{ color: "black" }}>
            Permissions
          </Typography>

          {/* Permissions List - Iterating over resources */}
          {Object.keys(selectedRole?.permissions || {}).map((resource) => (
            <Box key={resource} sx={{ mb: 2 }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", mb: 1, color: "black" }}
              >
                {resource.charAt(0).toUpperCase() + resource.slice(1)}
              </Typography>

              {/* Permissions in a Row using Box with flex */}
              <Box sx={{ display: "flex", gap: 2 }}>
                {Object.keys(selectedRole.permissions[resource]).map(
                  (permission) => (
                    <FormControl
                      key={permission}
                      fullWidth
                      sx={{ mb: 1, color: "black" }}
                    >
                      <FormControlLabel
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
                          permission.charAt(0).toUpperCase() +
                          permission.slice(1)
                        }
                      />
                    </FormControl>
                  )
                )}
              </Box>
            </Box>
          ))}
          <Divider sx={{ my: 2 }} />

          {/* Save Changes Button */}
          <Button
            onClick={handleSaveRole}
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
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

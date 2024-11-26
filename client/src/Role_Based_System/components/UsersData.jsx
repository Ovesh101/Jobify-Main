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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Modal,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import CreateItemModal from "./CreateItemModal"; // Import CreateItemModal component
import { useAdminContext } from "../Admin";
import PermissionSystem from "../auth";

const UsersData = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [users, setUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null); // Store the userId to delete
  const [roleData, setRoleData] = useState([]); // Array of roles
  const [createOpenModal, setCreateOpenModal] = useState(false); // State for Create Modal
  const { user, isDarkTheme } = useAdminContext();

  // Permission System
  const canCreateUsers = PermissionSystem.hasPermission(
    user.user,
    "users",
    "create"
  );
  const canUpdateUsers = PermissionSystem.hasPermission(
    user.user,
    "users",
    "update"
  );
  const canDeleteUsers = PermissionSystem.hasPermission(
    user.user,
    "users",
    "delete"
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await customFetch.get("/info/users");
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await customFetch.get("/roles");
        setRoleData(response.data); // Assuming the response is an array of roles
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchUsers();
    fetchRoles();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUser(null);
  };

  const handleSaveUser = async () => {
    try {
      const response = await customFetch.patch(
        `/info/users/${selectedUser._id}`,
        selectedUser
      );
      toast.success("Updated User Successfully");
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === selectedUser._id ? { ...user, ...selectedUser } : user
        )
      );
      handleCloseModal();
    } catch (error) {
      toast.error("Failed to update user");
      console.error("Error saving user:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await customFetch.delete(`/info/users/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      setIsDeleteConfirm(false); // Close the confirmation
      toast.success("User deleted successfully!"); // Display success message
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error(
        error.response?.data?.msg || "Failed to delete user. Please try again."
      ); // Display error message
    }
  };

  const handleCreateUser = async (formData) => {
    try {
      const response = await customFetch.post("/info/users", formData);
      setUsers((prevUsers) => [...prevUsers, response.data.user]);
      setCreateOpenModal(false); // Close modal after creation
      toast.success("User created successfully!"); // Show success toast
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error(
        error.response?.data?.msg || "Failed to create user. Please try again."
      ); // Show error toast
    }
  };

  const handleRoleChange = (event) => {
    const updatedUser = { ...selectedUser, role: event.target.value };
    setSelectedUser(updatedUser); // Update the selected user with the new role
  };

  return (
    <div className="mb-10">
      <h2
        className={`text-2xl font-semibold mb-4 ${
          isDarkTheme ? "text-white" : "text-black"
        }`}
      >
        Users Data
      </h2>

      {canCreateUsers && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCreateOpenModal(true)} // Open Create Modal
          sx={{ marginBottom: "20px" }}
        >
          Create User
        </Button>
      )}

      <TableContainer
        component={Paper}
        elevation={3}
        sx={{
          borderRadius: 2,
          overflowX: "auto", // Enable horizontal scrolling
          overflowY: "hidden", // Prevent vertical scrolling unless needed
          maxWidth: "100%",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Enhance shadow effect
        }}
      >
        <Table
          sx={{
            minWidth: "800px", // Force a minimum width to trigger horizontal scroll when needed
          }}
        >
          <TableHead
            sx={{
              backgroundColor: "#f5f5f5",
              "& th": {
                fontWeight: "bold",
                color: "#555",
              },
            }}
          >
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography variant="body2" color="text.secondary">
                    No users found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((SingleUser) => (
                  <TableRow
                    key={SingleUser._id}
                    hover
                    sx={{
                      transition: "background-color 0.3s",
                      "&:hover": {
                        backgroundColor: "#f9f9f9",
                      },
                    }}
                  >
                    <TableCell>{SingleUser.name}</TableCell>
                    <TableCell>{SingleUser.email}</TableCell>
                    <TableCell>{SingleUser.lastName}</TableCell>
                    <TableCell>{SingleUser.location}</TableCell>
                    <TableCell>{SingleUser.role}</TableCell>
                    <TableCell>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          color:
                            SingleUser.status === "Active" ? "green" : "red",
                        }}
                      >
                        {SingleUser.status}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {(() => {
                        const isCurrentUserSuperAdmin =
                          user.user.role === "superadmin";
                        const isTargetUserSuperAdmin =
                          SingleUser.role === "superadmin";

                        if (
                          isCurrentUserSuperAdmin &&
                          user.user._id === SingleUser._id
                        ) {
                          return (
                            <>
                              <Tooltip title="Edit User">
                                <IconButton
                                  color="primary"
                                  onClick={() => handleEditUser(SingleUser)}
                                >
                                  <EditIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete User">
                                <IconButton
                                  color="error"
                                  onClick={() => {
                                    setDeleteUserId(user._id);
                                    setIsDeleteConfirm(true);
                                  }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            </>
                          );
                        }

                        if (
                          !isCurrentUserSuperAdmin &&
                          isTargetUserSuperAdmin
                        ) {
                          return (
                            <Typography variant="body2" color="text.secondary">
                              Settings Protected
                            </Typography>
                          );
                        }

                        return (
                          <>
                            {canUpdateUsers && (
                              <Tooltip title="Edit User">
                                <IconButton
                                  color="primary"
                                  onClick={() => handleEditUser(SingleUser)}
                                >
                                  <EditIcon />
                                </IconButton>
                              </Tooltip>
                            )}
                            {canDeleteUsers && (
                              <Tooltip title="Delete User">
                                <IconButton
                                  color="error"
                                  onClick={() => {
                                    setDeleteUserId(SingleUser._id);
                                    setIsDeleteConfirm(true);
                                  }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            )}
                          </>
                        );
                      })()}
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            backgroundColor: "#f5f5f5",
            "& .MuiTablePagination-toolbar": {
              justifyContent: "center",
            },
          }}
        />
      </TableContainer>

      {/* Modal for editing user */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="edit-user-modal"
        aria-describedby="edit-user-description"
      >
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
            width: { xs: "90%", sm: "500px" }, // Responsive width
            maxHeight: "90vh", // Ensures the modal is scrollable on small screens
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
            id="edit-user-modal"
            variant="h5"
            sx={{
              color: "primary.main",
              fontWeight: "bold",
              textAlign: "center",
              mb: 3,
            }}
          >
            Edit User
          </Typography>

          {/* User Details Form */}
          <form>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={selectedUser?.name || ""}
              onChange={(e) =>
                setSelectedUser((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={selectedUser?.lastName || ""}
              onChange={(e) =>
                setSelectedUser((prev) => ({
                  ...prev,
                  lastName: e.target.value,
                }))
              }
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={selectedUser?.email || ""}
              onChange={(e) =>
                setSelectedUser((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            <TextField
              label="Location"
              variant="outlined"
              fullWidth
              margin="normal"
              value={selectedUser?.location || ""}
              onChange={(e) =>
                setSelectedUser((prev) => ({
                  ...prev,
                  location: e.target.value,
                }))
              }
            />
            {/* Role Selection */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Role</InputLabel>
              <Select
                value={selectedUser?.role || ""}
                onChange={handleRoleChange}
                label="Role"
              >
                {roleData.map((role) => {
                  if (
                    role.role === "superadmin" &&
                    user.user.role !== "superadmin"
                  ) {
                    return null;
                  }
                  return (
                    <MenuItem key={role._id} value={role.role}>
                      {role.role}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            {/* Status Selection */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                value={selectedUser?.status || ""}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, status: e.target.value })
                }
                label="Status"
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
            ;{/* Save Button */}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 3,
                py: 1.5, // Increase padding for a modern button feel
                fontWeight: "bold",
              }}
              onClick={handleSaveUser}
            >
              Save
            </Button>
          </form>
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
            Are you sure you want to delete this user? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteConfirm(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleDeleteUser(deleteUserId)}
            color="secondary"
            variant="contained"
          >
            Yes, delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create User Modal */}
      <CreateItemModal
        open={createOpenModal}
        onClose={() => setCreateOpenModal(false)}
        onSubmit={handleCreateUser}
        type="User"
      />
    </div>
  );
};

export default UsersData;

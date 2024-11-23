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
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import CreateItemModal from "./CreateItemModal"; // Import CreateItemModal component

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
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleCreateUser = async (formData) => {
    console.log("formdata", formData);

    try {
      const response = await customFetch.post("/info/users", formData);
      setUsers((prevUsers) => [...prevUsers, response.data.user]);
      setCreateOpenModal(false); // Close modal after creation
    } catch (error) {
      toast.error("Error creating user");
      console.error("Error creating user:", error);
    }
  };

  const handleRoleChange = (event) => {
    const updatedUser = { ...selectedUser, role: event.target.value };
    setSelectedUser(updatedUser); // Update the selected user with the new role
  };

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Users Data</h2>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setCreateOpenModal(true)} // Open Create Modal
        sx={{ marginBottom: "20px" }}
      >
        Create User
      </Button>

      <TableContainer component={Paper} className="shadow-lg rounded-md">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="font-semibold">Name</TableCell>
              <TableCell className="font-semibold">Email</TableCell>
              <TableCell className="font-semibold">Last Name</TableCell>
              <TableCell className="font-semibold">Location</TableCell>
              <TableCell className="font-semibold">Role</TableCell>
              <TableCell className="font-semibold">Status</TableCell>
              <TableCell className="font-semibold">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow
                    key={user.id}
                    hover
                    className="transition duration-300 ease-in-out"
                  >
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.location}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <span
                        className={`${
                          user.status === "Active"
                            ? "text-green-500"
                            : "text-red-500"
                        } font-semibold`}
                      >
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Edit User">
                        <IconButton
                          color="primary"
                          onClick={() => handleEditUser(user)}
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
          className="mt-4"
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
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
            width: "400px",
          }}
        >
          <Typography variant="h6" sx={{ color: "black" }} gutterBottom>
            Edit User
          </Typography>

          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedUser?.name || ""}
            onChange={(e) =>
              setSelectedUser((prev) => ({ ...prev, name: e.target.value }))
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
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedUser?.lastName || ""}
            onChange={(e) =>
              setSelectedUser((prev) => ({ ...prev, lastName: e.target.value }))
            }
          />
          <TextField
            label="Location"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedUser?.location || ""}
            onChange={(e) =>
              setSelectedUser((prev) => ({ ...prev, location: e.target.value }))
            }
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              value={selectedUser?.role || ""}
              onChange={handleRoleChange}
              label="Role"
            >
              {roleData.map((role) => (
                <MenuItem key={role._id} value={role.role}>
                  {role.role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={selectedUser?.status || ""}
              onChange={(e) => {
                const updatedUser = { ...selectedUser, status: e.target.value };
                setSelectedUser(updatedUser); // Update the selected user with the new status
              }}
              label="Status"
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSaveUser}
          >
            Save
          </Button>
        </Box>
      </Modal>

      {/* Delete Confirmation Modal */}
      {isDeleteConfirm && (
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
            width: "300px",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" sx={{ color: "black" }} gutterBottom>
            Are you sure you want to delete this user?
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDeleteUser(deleteUserId)}
            sx={{ mr: 2 }}
          >
            Yes
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setIsDeleteConfirm(false)}
          >
            No
          </Button>
        </Box>
      )}

      {/* Create User Modal */}
      <CreateItemModal
        open={createOpenModal}
        onClose={() => setCreateOpenModal(false)}
        onSubmit={handleCreateUser}
      />
    </div>
  );
};

export default UsersData;

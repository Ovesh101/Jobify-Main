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
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import CreateItemModal from "./CreateItemModal"; // Reusing CreateItemModal

const RolesPermission = () => {
  const [roles, setRoles] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [createOpenModal, setCreateOpenModal] = useState(false);
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
  const [deleteRoleId, setDeleteRoleId] = useState(null);

  // Permission options
  const permissionsList = ["create_user", "edit_user" , "delete_user"];

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
    setSelectedRole(role);
    setOpenModal(true);
  };

  const handleSaveRole = async () => {
    console.log(selectedRole);

    try {
      const response = await customFetch.patch(
        `/roles/${selectedRole._id}`,
        selectedRole
      );
      console.log(response.data);

      toast.success("Updated Role Successfully");
      setRoles((prevRoles) =>
        prevRoles.map((role) =>
          role._id === selectedRole._id ? { ...role, ...selectedRole } : role
        )
      );
      setOpenModal(false);
      setSelectedRole(null);
    } catch (error) {
      toast.error("Failed to update role");
      console.error("Error saving role:", error);
    }
  };

  const handleDeleteRole = async (roleId) => {
    try {
      await customFetch.delete(`/roles/${roleId}`);
      setRoles((prevRoles) => prevRoles.filter((role) => role._id !== roleId));
      setIsDeleteConfirm(false);
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

  const handleCreateRole = async (formData) => {
    console.log("form data in role", formData);

    try {
      const response = await customFetch.post("/roles", formData);
      setRoles((prevRoles) => [...prevRoles, response.data.role]);
      setCreateOpenModal(false);
    } catch (error) {
      toast.error("Error creating role");
      console.error("Error creating role:", error);
    }
  };

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Roles & Permissions
      </h2>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setCreateOpenModal(true)}
        sx={{ marginBottom: "20px" }}
      >
        Create Role
      </Button>

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
                    className="transition duration-300 ease-in-out "
                  >
                    <TableCell>{role.role}</TableCell>
                    <TableCell>
                      {role.permissions && role.permissions.join(", ")}
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Edit Role">
                        <IconButton
                          color="primary"
                          onClick={() => handleEditRole(role)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Role">
                        <IconButton
                          color="error"
                          onClick={() => {
                            setDeleteRoleId(role._id);
                            setIsDeleteConfirm(true);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
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

      {/* Edit Modal */}
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
          <Typography variant="h6" sx={{color:"black"}} gutterBottom>
            Edit Role
          </Typography>

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

          <Typography variant="subtitle1" sx={{ mt: 2 , color:"black" }}>
            Permissions
          </Typography>
          {permissionsList.map((permission) => (
            <FormControl key={permission} sx={{color:"black"}} margin="normal">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedRole?.permissions?.includes(permission)}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      setSelectedRole((prev) => ({
                        ...prev,
                        permissions: isChecked
                          ? [...prev.permissions, permission]
                          : prev.permissions.filter((p) => p !== permission),
                      }));
                    }}
                  />
                }
                label={permission}
              />
            </FormControl>
          ))}

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

      {/* Delete Confirmation */}
      {isDeleteConfirm && (
        <Alert
          severity="warning"
          action={
            <>
              <Button
                color="secondary"
                size="medium"
                onClick={() => handleDeleteRole(deleteRoleId)}
              >
                Yes, delete
              </Button>
              <Button
                color="primary"
                size="small"
                onClick={() => setIsDeleteConfirm(false)}
              >
                Cancel
              </Button>
            </>
          }
        >
          Are you sure you want to delete this role?
        </Alert>
      )}

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

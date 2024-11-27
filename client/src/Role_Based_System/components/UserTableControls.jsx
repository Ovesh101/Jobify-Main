import React from "react";
import { TextField, Stack, Box, InputAdornment, MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useAdminContext } from "../Admin";

const UserTableControls = ({
  roleData, // Dynamically passed role data
  searchTerm,
  onSearchChange,
  filterStatus,
  onFilterStatusChange,
  filterRole,
  onFilterRoleChange,
  sortOrder,
  onSortChange,
}) => {
  const { isDarkTheme } = useAdminContext();

  return (
    <div
      style={{
        backgroundColor: isDarkTheme ? "#1e1e1e" : "#fff",
        color: isDarkTheme ? "#e0e0e0" : "#000",
        padding: "20px",
        marginBottom: "20px",
        borderRadius: "8px",
        boxShadow: isDarkTheme
          ? "0px 4px 6px rgba(0, 0, 0, 0.5)"
          : "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Stack
        spacing={2}
        direction={{ xs: "column", sm: "row" }}
        alignItems="center"
      >
        {/* Search Bar */}
        <Box sx={{ flex: 1 }}>
          <TextField
            variant="outlined"
            placeholder="Search"
            value={searchTerm}
            onChange={onSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              width: "100%",
              backgroundColor: isDarkTheme ? "#2e2e2e" : "#f7f7f7",
              "& .MuiOutlinedInput-root": {
                borderColor: isDarkTheme ? "#555" : "#ccc",
                color: isDarkTheme ? "#fff" : "#000",
              },
              "& .MuiOutlinedInput-root.Mui-focused": {
                borderColor: isDarkTheme ? "#aaa" : "#000",
              },
              "& .MuiInputLabel-root": {
                color: isDarkTheme ? "#aaa" : "#666",
                fontSize: "0.875rem",
              },
            }}
          />
        </Box>

        {/* Status Filter */}
        <Box sx={{ flex: 1 }}>
          <TextField
            select
            label="Status"
            value={filterStatus}
            onChange={onFilterStatusChange}
            sx={{
              width: "100%",
              backgroundColor: isDarkTheme ? "#2e2e2e" : "#f7f7f7",
              "& .MuiOutlinedInput-root": {
                borderColor: isDarkTheme ? "#555" : "#ccc",
                color: isDarkTheme ? "#fff" : "#000",
              },
              "& .MuiInputLabel-root": {
                color: isDarkTheme ? "#aaa" : "#666",
                fontSize: "0.875rem",
              },
            }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </TextField>
        </Box>

        {/* Role Filter */}
        <Box sx={{ flex: 1 }}>
          <TextField
            select
            label="Role"
            value={filterRole}
            onChange={onFilterRoleChange}
            sx={{
              width: "100%",
              backgroundColor: isDarkTheme ? "#2e2e2e" : "#f7f7f7",
              "& .MuiOutlinedInput-root": {
                borderColor: isDarkTheme ? "#555" : "#ccc",
                color: isDarkTheme ? "#fff" : "#000",
              },
              "& .MuiInputLabel-root": {
                color: isDarkTheme ? "#aaa" : "#666",
                fontSize: "0.875rem",
              },
            }}
          >
            <MenuItem value="">All</MenuItem>
            {roleData && roleData.length > 0 ? (
              roleData.map((role) => (
                <MenuItem key={role.role._id} value={role.role}>
                  {role.role}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="" disabled>
                No roles available
              </MenuItem>
            )}
          </TextField>
        </Box>

        {/* Sort Order */}
        <Box sx={{ flex: 1 }}>
          <TextField
            select
            label="Sort Order"
            value={sortOrder}
            onChange={(e) => onSortChange(e.target.value)}
            sx={{
              width: "100%",
              backgroundColor: isDarkTheme ? "#2e2e2e" : "#f7f7f7",
              "& .MuiOutlinedInput-root": {
                borderColor: isDarkTheme ? "#555" : "#ccc",
                color: isDarkTheme ? "#fff" : "#000",
              },
              "& .MuiInputLabel-root": {
                color: isDarkTheme ? "#aaa" : "#666",
                fontSize: "0.875rem",
              },
            }}
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </TextField>
        </Box>
      </Stack>
    </div>
  );
};

export default UserTableControls;

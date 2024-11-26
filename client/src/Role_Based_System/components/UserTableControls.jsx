import React from 'react';
import { TextField, InputAdornment, MenuItem, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useAdminContext } from '../Admin';

const UserTableControls = ({
  roleData,  // Dynamically passed role data
  searchTerm,
  onSearchChange,
  filterStatus,
  onFilterStatusChange,
  filterRole,
  onFilterRoleChange,
  sortOrder,
  onSortChange
}) => {
  const { isDarkTheme } = useAdminContext();

  return (
    <div
      style={{
        backgroundColor: isDarkTheme ? '#333' : '#fff',
        color: isDarkTheme ? '#fff' : '#000',
        padding: '12px',
        borderRadius: '8px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Grid container spacing={2} alignItems="center">
        {/* Search Bar */}
        <Grid item xs={12} sm={3}>
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
              width: '100%',
              backgroundColor: isDarkTheme ? '#555' : '#f0f0f0',
              '& .MuiOutlinedInput-root': {
                borderColor: isDarkTheme ? '#555' : '#ccc',
              },
              '& .MuiInputLabel-root': {
                fontSize: '0.875rem',  // Smaller text
              },
            }}
          />
        </Grid>

        {/* Status Filter */}
        <Grid item xs={6} sm={2}>
          <TextField
            select
            label="Status"
            value={filterStatus}
            onChange={onFilterStatusChange}
            sx={{
              width: '100%',
              backgroundColor: isDarkTheme ? '#555' : '#f0f0f0',
              '& .MuiOutlinedInput-root': {
                borderColor: isDarkTheme ? '#555' : '#ccc',
              },
              '& .MuiInputLabel-root': {
                fontSize: '0.875rem',  // Smaller text
              },
            }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </TextField>
        </Grid>

        {/* Role Filter */}
        <Grid item xs={6} sm={3}>
          <TextField
            select
            label="Role"
            value={filterRole}
            onChange={onFilterRoleChange}
            sx={{
              width: '100%',
              backgroundColor: isDarkTheme ? '#555' : '#f0f0f0',
              '& .MuiOutlinedInput-root': {
                borderColor: isDarkTheme ? '#555' : '#ccc',
              },
              '& .MuiInputLabel-root': {
                fontSize: '0.875rem',  // Smaller text
              },
            }}
          >
            <MenuItem value="">All</MenuItem>
            {/* Ensure roleData is an array and is populated */}
            {roleData && roleData.length > 0 ? (
              roleData.map((role) => (
                <MenuItem key={role.role._id} value={role.role}>
                  {role.role}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="" disabled>No roles available</MenuItem>
            )}
          </TextField>
        </Grid>

        {/* Sort Order */}
        <Grid item xs={6} sm={2}>
          <TextField
            select
            label="Sort Order"
            value={sortOrder}
            onChange={(e) => onSortChange(e.target.value)}
            sx={{
              width: '100%',
              backgroundColor: isDarkTheme ? '#555' : '#f0f0f0',
              '& .MuiOutlinedInput-root': {
                borderColor: isDarkTheme ? '#555' : '#ccc',
              },
              '& .MuiInputLabel-root': {
                fontSize: '0.875rem',  // Smaller text
              },
            }}
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserTableControls;

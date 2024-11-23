import { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import RolesPermission from "./components/RolesPermission";
import UsersData from "./components/UsersData";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div className="min-h-screen p-5 bg-gray-100">
      <div className="max-w-7xl mx-auto bg-white p-5 shadow-lg rounded-md">
        {/* Tabs using MUI components */}
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="admin dashboard tabs"
          >
           
            <Tab label="Users Data" />
            <Tab label="Roles & Permissions" />
          </Tabs>
        </Box>

        {/* Tab Content */}
        <Box sx={{ paddingTop: 2 }}>
         
          {activeTab === 0 && <UsersData activeTab={activeTab} />}
          {activeTab === 1 && <RolesPermission activeTab={activeTab} />}
        </Box>
      </div>
    </div>
  );
};

export default AdminDashboard;

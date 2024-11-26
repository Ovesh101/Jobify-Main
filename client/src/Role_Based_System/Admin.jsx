import { createContext, useContext, useState, useEffect } from "react";
import {
  Outlet,

  useNavigate,
  useNavigation,
} from "react-router-dom";
import customFetch from "../utils/customFetch";

import BigSidebar from "./components/BigSidebar";
import Wrapper from "../assets/wrappers/Dashboard";
import { toast } from "react-toastify";
import SmallSidebar from "./components/SmallSidebar";
import Navbar from "./components/Navbar";
import { useUser } from "./context/useUser";
import { Loading } from "../components";

// remove loader fucntion

const AdminContext = createContext();

const AdminLayout = ({ isDarkThemeEnabled }) => {

  
  const { user  } = useUser();



  const navigate = useNavigate();
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";

  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled);

  useEffect(() => {
    const storedTheme = localStorage.getItem("darkTheme");
    const token = localStorage.getItem("token")
    if (storedTheme) {
      setIsDarkTheme(storedTheme === "true");
      document.body.classList.toggle("dark-theme", storedTheme === "true");
    }
    if(!token){
      navigate("/admin/login")
    }

  }, []);

  // Toggle dark theme
  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  // Logout function
  const logoutUser = async () => {
    try {
      await customFetch.get("/users/logout");
      localStorage.removeItem("token");
 
      toast.success("Logged out successfully...");
      navigate("/admin/login"); // Redirect to login page after logout
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <AdminContext.Provider
      value={{
        user,
        showSidebar,
    
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              {isPageLoading ? (
                <Loading />
              ) : (
                <Outlet context={{ user }} /> // Render child components
              )}
            </div>
          </div>
        </main>
      </Wrapper>
    </AdminContext.Provider>
  );
};

// Custom hook to access AdminContext in any component
export const useAdminContext = () => useContext(AdminContext);

export default AdminLayout;

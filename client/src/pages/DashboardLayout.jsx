import { createContext, useContext, useState, useEffect } from 'react';
import Wrapper from '../assets/wrappers/Dashboard';
import { BigSidebar, Navbar, SmallSidebar, Loading } from '../components';
import { Outlet, redirect, useLoaderData, useNavigate, useNavigation } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

// Loader function to fetch current admin user
export const loader = async () => {
  try {
    const { data } = await customFetch.get('/info/current-user');
    
    redirect("/dashboard")
    return data;
  } catch (error) {
    return redirect('/dashboard');
  }
};

// Create the context
const DashboardContext = createContext();

// Dashboard Layout Component
const DashboardLayout = ({ isDarkThemeEnabled }) => {
  const { user } = useLoaderData(); // Get user data from loader
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';

  // Sidebar and theme state management
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled);

  // Set initial theme from localStorage or fallback to prop
  useEffect(() => {
    const token = localStorage.getItem("token")
    const storedTheme = localStorage.getItem('darkTheme');
    if (storedTheme) {
      setIsDarkTheme(storedTheme === 'true');
      document.body.classList.toggle('dark-theme', storedTheme === 'true');
    } else {
      // Apply the passed theme if available, otherwise fallback to default
      document.body.classList.toggle('dark-theme', isDarkTheme);
    }

    if(!token){
      navigate('/login')
    }
  }, [isDarkTheme, isDarkThemeEnabled]);

  // Toggle dark theme
  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle('dark-theme', newDarkTheme);
    localStorage.setItem('darkTheme', newDarkTheme);
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  // Logout function
  const logoutUser = async () => {
    try {
      await customFetch.get('/users/logout');
      localStorage.removeItem("token")
      toast.success('Logged out successfully!');
      navigate('/'); // Redirect to the homepage or login page after logout
    } catch (error) {
      toast.error('Logout failed. Please try again.');
    }
  };

  return (
    <DashboardContext.Provider
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
    </DashboardContext.Provider>
  );
};

// Custom hook to access the DashboardContext in any component
export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;

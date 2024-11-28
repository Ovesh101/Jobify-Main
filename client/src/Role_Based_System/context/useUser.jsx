import { createContext, useContext, useState, useEffect } from "react";
import customFetch from "../../utils/customFetch";
import { Loading } from "../../components";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // To handle error state

  // Function to fetch current user data
  const fetchCurrentUser = async () => {
    try {
      const { data } = await customFetch.get("/info/current-user");
      setUser(data); // Update user data with API response
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      setError("Failed to fetch user data."); // Set error message
      setUser(null); // Clear user data in case of error
    } finally {
      setLoading(false); // Indicate loading is complete
    }
  };

  // Function to handle logout
  const logout = () => {
    setUser(null); // Clear user state
    // You may also clear cookies or session storage if necessary:
    // localStorage.removeItem('token');
    // Or call an API to invalidate the session
  };

  // Fetch user data on component mount
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>; // Optionally render error feedback
  }

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access AuthContext
export const useUser = () => {
  return useContext(AuthContext);
};

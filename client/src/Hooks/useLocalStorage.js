import { useState } from 'react';

// Custom Hook to interact with localStorage
const useLocalStorage = (key) => {
  // Get the item from localStorage on initial render
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      // Parse stored JSON or return null
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Error getting item from localStorage:", error);
      return null;
    }
  });

  // Function to set the value in localStorage
  const setValue = (value) => {
    try {
      // Save the value to localStorage
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Error setting item in localStorage:", error);
    }
  };

  // Function to remove the value from localStorage
  const removeValue = () => {
    try {
      localStorage.removeItem(key);
      setStoredValue(null); // Clear state
    } catch (error) {
      console.error("Error removing item from localStorage:", error);
    }
  };

  return [storedValue, setValue, removeValue];
};

export default useLocalStorage;

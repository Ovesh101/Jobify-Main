import React from 'react';
import Wrapper from '../../assets/wrappers/Navbar';
import { FaHome, FaAlignLeft } from "react-icons/fa";

import { Logo } from '../../components';
import { useAdminContext } from '../Admin';




import ThemeToggle from './ThemeToggle';
import LogoutContainer from './LogoutContainer';

const Navbar = () => {
  // Use AdminContext to get context values like sidebar toggle function and user info
  const { toggleSidebar } = useAdminContext(); // Changed to useAdminContext


  

  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>

        <div>
          <Logo />
          <h4 className="logo-text">Admin Dashboard</h4> {/* Changed text to Admin Dashboard */}
        </div>

        <div className="btn-container">
          <ThemeToggle /> {/* Theme toggle to switch between light and dark mode */}
          <LogoutContainer />
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;

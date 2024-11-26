import React from "react";
import Wrapper from "../../assets/wrappers/SmallSidebar";

import { useAdminContext } from "../Admin";
import { FaTimes } from "react-icons/fa";

import { Logo } from "../../components";

import NavLinks from "./NavLinks";

const SmallSidebar = () => {
  const { showSidebar, user, toggleSidebar } = useAdminContext(); // Use AdminContext

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button type="button" className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <div className="text-2xl mt-5">
            {user.user.role.charAt(0).toUpperCase() + user.user.role.slice(1)} Dashboard
          </div>
          <NavLinks /> {/* Updated to AdminNavLinks */}
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;

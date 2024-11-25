import React from "react";
import Wrapper from "../../assets/wrappers/BigSidebar";
import { Logo } from "../../components";
import NavLinks from "./NavLinks"; // Admin-specific NavLinks

import { useAdminContext } from "../Admin";

const BigSidebar = () => {
  const { showSidebar } = useAdminContext(); // Use AdminContext for managing sidebar visibility

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container" : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo /> {/* Logo component */}
          </header>
          <NavLinks isBigSidebar /> {/* Admin-specific NavLinks */}
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;

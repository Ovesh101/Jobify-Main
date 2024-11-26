import React from "react";
import { NavLink } from "react-router-dom";

import { useAdminContext } from "../Admin";
import { FaWpforms } from "react-icons/fa"; // FaUsersCog for user-related actions
import { MdQueryStats } from "react-icons/md"; // MdSettings for roles
import PermissionSystem from "../auth"

const NavLinks = ({ isBigSidebar }) => {
  const {  user ,toggleSidebar } = useAdminContext(); // Use AdminContext
  

  // Define Admin-specific links
  const adminLinks = [
    { text: "Users", path: "users", icon: <FaWpforms /> },
    { text: "Roles", path: "roles", icon: <MdQueryStats /> },
  ];

  return (
    <div className="nav-links">
      {adminLinks.map((link) => {
     
        const { text, path, icon } = link;
     
        
    
        
      if(!PermissionSystem.hasPermission(user.user, path, "view"))return <></>
        return (
          <NavLink
            to={path}
            key={text}
            className="nav-link"
            onClick={isBigSidebar ? null : toggleSidebar}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;

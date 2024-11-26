import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import Wrapper from "../../assets/wrappers/LogoutContainer";
import { useState } from "react";

import { useAdminContext } from "../Admin";

const LogoutContainer = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user, logoutUser } = useAdminContext(); // Use AdminContext


  return (
    <Wrapper>
      <button
        type="button"
        className="btn logout-btn"
        onClick={() => setShowLogout(!showLogout)}
      >
        {user.user.avatar ? (
          <img src={user?.user?.avatar} alt="avatar" className="img" />
        ) : (
          <FaUserCircle />
        )}
        {user?.user.name}
        <FaCaretDown />
      </button>

      <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
        <button type="button" className="dropdown-btn" onClick={logoutUser}>
          Logout
        </button>
      </div>
    </Wrapper>
  );
};

export default LogoutContainer;

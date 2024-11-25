import React from 'react';
import Wrapper from '../../assets/wrappers/SmallSidebar';

import { useAdminContext } from '../Admin';
import { FaTimes } from 'react-icons/fa';

import { Logo } from '../../components';

import NavLinks from './NavLinks';

const SmallSidebar = () => {
    const { showSidebar, toggleSidebar } = useAdminContext(); // Use AdminContext
    
    return (
        <Wrapper>
            <div className={showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"}>
                <div className="content">
                    <button type="button" className="close-btn" onClick={toggleSidebar}>
                        <FaTimes />
                    </button>
                    <header>
                        <Logo />
                    </header>
                    <NavLinks /> {/* Updated to AdminNavLinks */}
                </div>
            </div>
        </Wrapper>
    );
};

export default SmallSidebar;

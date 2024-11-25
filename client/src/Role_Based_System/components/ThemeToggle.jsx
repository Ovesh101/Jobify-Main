import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import Wrapper from '../../assets/wrappers/ThemeToggle';

import { useAdminContext } from '../Admin';

const ThemeToggle = () => {
    const { isDarkTheme, toggleDarkTheme } = useAdminContext(); // Use AdminContext


    return (
        <Wrapper onClick={toggleDarkTheme}>
            {isDarkTheme ? (<BsFillSunFill className='toggle-icon' />) : (<BsFillMoonFill />)}
        </Wrapper>
    );
};

export default ThemeToggle;

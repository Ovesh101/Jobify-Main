

import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';


const links = [
  { text: 'Add Job', path: '.', icon: <FaWpforms /> },
  { text: 'All Jobs', path: 'all-jobs', icon: <MdQueryStats /> },
  { text: 'Stats', path: 'stats', icon: <IoBarChartSharp /> },
  { text: 'Profile', path: 'profile', icon: <ImProfile /> },

];

export default links;
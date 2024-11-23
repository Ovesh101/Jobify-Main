import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/StatsContainer';
import StatItem from './StatItem';


const StatsContainer = ({defaultStats}) => {

    const stats = [
        {
            title : 'Pending Application',
            count : defaultStats?.Pending || 0,
            icon : <FaSuitcaseRolling />,
            color : '#f59e0b',
            bcg : '#fef3c7'

        },
        {
            title : 'Interview Scheduled',
            count : defaultStats?.Interview || 0,
            icon : <FaSuitcaseRolling />,
            color : '#647acb',
            bcg : '#e0e8f9'

        },
        {
            title : 'Declined Application',
            count : defaultStats?.Declined || 0,
            icon : <FaSuitcaseRolling />,
            color : '#d66a6a',
            bcg : '#ffeeee'

        },

    ]
  return (
    <Wrapper>
        {
        stats.map((item)=>{
         return <StatItem key={item.title} {...item} />
        })}
    </Wrapper>
  )
}

export default StatsContainer
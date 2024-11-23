import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa';

import { useLoaderData, redirect } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import Wrapper from '../assets/wrappers/StatsContainer';
import { toast } from 'react-toastify';
import { StatItem } from '../components';
import Admin_Dashboard from '../Role_Based_System/Admin_Dashboard';
import AdminDashboard from '../Role_Based_System/Admin_Dashboard';

export const loader = async ()=>{
  try{
  const response  = await customFetch.get("/info/admin/app-stats")
  return response.data;
  }catch(error){
    toast.error("You are not Authorize to access this page")
    return redirect("/dashboard")
  }
}

const Admin = () => {
  const {users , jobs} = useLoaderData()
  return (
    // <Wrapper>
    //   <StatItem title='Current Users' count={users}  color='#e9b949'
    //     bcg='#fcefc7' icon={<FaSuitcaseRolling />} />
    //   <StatItem  title='Total Jobs' count={jobs}  color='#647acb'
    //     bcg='#e0e8f9' icon={<FaCalendarCheck />} />

        

    // </Wrapper>

    <AdminDashboard />
  )
}

export default Admin
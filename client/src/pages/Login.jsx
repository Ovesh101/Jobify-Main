import { Link, Form, redirect, useNavigation, useActionData, useNavigate } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { toast } from 'react-toastify';
import { Logo , FormRow } from '../components'
import customFetch from '../utils/customFetch';

export const action = async ({request})=>{
  const formData = await request.formData();
  const data =  Object.fromEntries(formData);
  const errors = {msg : ""}
  if(data.password.length < 3){
    errors.msg = "Password is too short"
    return errors
  }

  try {
   const response =  await customFetch.post("/users/login" , data);
   console.log(response);
   
    toast.success("Login Successfully")
    if (response?.data?.user?.role === 'admin') {
      return redirect('/admin/dashboard/users'); // Redirect admins to the default admin route
    }

    // Redirect non-admins to a different dashboard or homepage
    return redirect('/dashboard');
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
    
  }


}


const Login = () => {
  const errors = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting'
  return (
    <Wrapper>
      <Form method="post" className='form'>
        <Logo />
        <h4>Login</h4>
        {errors?.msg &&  <p style={{color : 'red'}}>{errors.msg}</p>}
        <FormRow type='email' name='email' />
        <FormRow type='password' name='password' />
        <button type='submit' className='btn btn-block' disabled = {isSubmitting}>{isSubmitting ? 'Logging' : "Login"}</button>
      
        <p>
          Not a member yet?
          <Link to='/register' className='member-btn'>Register</Link>
          <div className='text-[12px]' >
          <Link to='/admin/login' className='member-btn'>Admin Login</Link>
          </div>

         
        </p>
      </Form>
    </Wrapper>
  )
}

export default Login
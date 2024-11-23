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
    await customFetch.post("/users/login" , data);
    toast.success("Login Successfully")
    return redirect('/dashboard')
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
    
  }


}


const Login = () => {

  const navigate = useNavigate();
  const loginDemoUser = async()=>{
    const data = {
      email : "test@test.com",
      password : "secret123"

    };
    try {
      await customFetch.post("/users/login" , data);
      toast.success("Take a Test Drive")
      return navigate("/dashboard")

    } catch (error) {
      toast.error(error?.response?.data?.msg)
      return error  
    }
  }
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
        <button type='button' className='btn btn-block' onClick={loginDemoUser} >Explore The App</button>
        <p>
          Not a member yet?
          <Link to='/register' className='member-btn'>Register</Link>
        </p>
      </Form>
    </Wrapper>
  )
}

export default Login
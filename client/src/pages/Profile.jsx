import { FormRow } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext } from 'react-router-dom';
import { useNavigation, Form } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';


export const action = async ({request})=>{
  const formData  = await request.formData();
  const file = formData.get('avatar')
  if(file && file.size > 500000){
    toast.error("Image size is too large")
  }
  try {
    await customFetch.patch("/info/update-user" , formData);
    toast.success("Profile Update Successfully")


  } catch (error) {
    toast.error(error?.response?.data?.msg)
    
  }
  return null;
  
}

const Profile = () => {

  const {user} = useOutletContext();
  const {name , lastName , location , email} = user
  const navigation = useNavigation();
  const isSubmitting  = navigation.state === 'submitting'
  return (
    <Wrapper>
      <Form method='post' className='form'  encType='multipart/form-data'>
        <h4 className='form-title'>Profile</h4>
        <div className="form-center">
          {/* File Input */}
          <div className="form-row">
            <label htmlFor="avatar" className='form-label'>
              Select an Image file (max 0.5 MB)

            </label>
            <input type="file" name='avatar' id='avatar' className='form-input' accept='image/*'  />
          </div>

          <FormRow  type='text' name='name'  defaultValue={name}   />
          <FormRow  type='text' name='lastName'  defaultValue={lastName}   />
          <FormRow  type='text' name='email'  defaultValue={email}   />
          <FormRow  type='text' name='location'  defaultValue={location}   />
          <button type='submit' className='btn btn-block form-btn' disabled={isSubmitting}>{isSubmitting ? 'submitting' : 'Save Changes'}</button>
        </div>

      </Form>
    </Wrapper>
  )
}

export default Profile
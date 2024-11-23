import { FormRow, FormRowSelect } from '.';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, useSubmit, Link } from 'react-router-dom';
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from '../../../utils/constant.js';
import { useAllJobsContext } from '../pages/AllJobs';

const SearchContainer = () => {
  const {searchValues} = useAllJobsContext();
  const {search , jobStatus , jobType , sort} = searchValues;
  const submit = useSubmit();

  const debounce = (onChange)=>{
    let timeout
    return (e) =>{
      const form = e.currentTarget.form;
      clearTimeout(timeout)
      timeout = setTimeout(()=>{

        onChange(form);

      } , 1000)
      
    
    }
  }
  return (
    <Wrapper>
      <Form  className='form'>
        <h5 className='form-title'>Search Form</h5>
        <div className="form-center">
          <FormRow type='search' name='search' defaultValue={search} onChange={debounce((form)=> submit(form))}   />
          <FormRowSelect labelText='Job Status' name='jobStatus' onChange={debounce((form)=> submit(form))} list={['all' , ...Object.values(JOB_STATUS)]} defaultValue={jobStatus} />
          <FormRowSelect labelText='Job Type' name='jobType'onChange={debounce((form)=> submit(form))}  list={['all' , ...Object.values(JOB_TYPE)]} defaultValue={jobType} />
          <FormRowSelect  name='sort' onChange={debounce((form)=> submit(form))} list={[ ...Object.values(JOB_SORT_BY)]} defaultValue={sort} />
          <Link to='/dashboard/all-jobs' className='btn form-btn delete-btn' >
            Reset Search Values
          </Link>
 
        </div>
      </Form>
    </Wrapper>
  )
}

export default SearchContainer
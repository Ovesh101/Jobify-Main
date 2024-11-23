import React from 'react'
import { Link, useRouteError } from 'react-router-dom'
import Wrapper from '../assets/wrappers/ErrorPage';
import img from "../assets/images/not-found.svg"


const Error = () => {
  const error = useRouteError();
  if(error.status === 404){
    return (
      <Wrapper>
      <div>
      <img src={img} alt="Not Found"  />
      <h3>Ohh! Page Not Found</h3>
      <p>We Can't seem to find the page you are looking for</p>
      <Link to='/dashboard'>back Home</Link>
      </div>
    
      </Wrapper>
  

    )
  }
  
  return (
    <Wrapper>
      <div>
        <h3>Something Went Wrong</h3>
      </div>
    </Wrapper>
  )
}

export default Error
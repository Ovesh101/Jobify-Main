import React from 'react'
import { Link, useRouteError } from 'react-router-dom'

import Wrapper from '../../assets/wrappers/ErrorPage'
import img from "../../assets/images/unauthorized.jpg"


const NotAuthorized = () => {
  const error = useRouteError();
  if(error.status === 401){
    return (
      <Wrapper>
      <div>
      <img src={img} alt="Not Found"  />
      <h3>Ohh! Not Access to this page</h3>
     
     
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

export default NotAuthorized
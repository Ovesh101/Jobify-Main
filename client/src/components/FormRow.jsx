import React from 'react'

const FormRow = ({type , name , labelText , defaultValue , onChange}) => {
  return (
    <div className="form-row">
          <label htmlFor={name} className='form-label'>
            {labelText || name}
          </label>
          <input 

            type={type}
            id={name} 
            name={name}
            className='form-input'
            required
            defaultValue={defaultValue}
            onChange={onChange}


             />

        </div>
  )
}

export default FormRow
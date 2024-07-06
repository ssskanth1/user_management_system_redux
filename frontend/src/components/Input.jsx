import React from 'react'

const Input = ({type,name,onChange,placeholder,value}) => {
  return (
    <input className='w-full p-2 border border-gray-300 rounded'
     type= {type}
     name={name}
     onChange={onChange}
     placeholder={placeholder}
     value={value}

     />
  )
}

export default Input
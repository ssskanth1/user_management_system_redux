import React, { useState } from 'react';
import { emailValidation, passwordValidation } from '../../assets/Scripts/Validations';
import { useSelector } from 'react-redux'


const AdminLogin = () => {
  const [hide, sethide] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailErr, setEmailErr] = useState('')
  const [passwordErr, setPasswordErr] = useState('')
  const [error, setErr] = useState('')
  const Error = useSelector(state => state.reducer.adminError)

  const handleEmailChange = (e) => {
    const { name, value } = e.target
    setErr('')
    setEmailErr('')
    setEmail(value)
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setErr('')
    setPasswordErr('')
    setPassword(value)
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    let check = true
    if (!emailValidation(email, setEmailErr)) {
      check = false
    }
    if (!passwordValidation(password, setPasswordErr)) {
      check = false
    }

    if (!check) {
      return false
    }
    console.log(email,password);
    const response = await fetch(process.env.REACT_APP_BASIC_URL + process.env.REACT_APP_LOGIN_ADMIN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    if (response.status === 202) setErr('!! No Admin Found !!')
    if (response.status === 201) setErr('!! Incorrect Password !!')
    if (response.status === 200) {
      const res = await response.json()
      localStorage.setItem('Admin', res.payload);
      window.location.href = '/admin'
    }
  }

  const imageUrl = '../../../public/images2.jpg';  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100" style={{backgroundImage:`url(${imageUrl})`}}>
      <div className="w-full max-w-md">
        <h2 className="text-center text-2xl font-bold mb-6">Welcome to My Login</h2>
        <h6 className="mb-4 text-center text-danger">{error}</h6>
        <h6 className="mb-4 text-center text-danger">{Error}</h6>
        <form onSubmit={handleSubmit} className="bg-sky-400 bg-opacity-25 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${emailErr ? 'border-red-500' : ''}`} id="email" name='email' value={email} onChange={handleEmailChange} type="text" placeholder="Email" />
            <p className="text-red-500 text-xs italic">{emailErr}</p>
          </div>
          <div className="mb-6">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${passwordErr ? 'border-red-500' : ''}`} id="password" name='password' value={password} onChange={handlePasswordChange} type={hide ? 'password' : 'text'} placeholder="Password" />
            <p className="text-red-500 text-xs italic">{passwordErr}</p>
          </div>
          <div className="form-group">
            <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700">Sign In</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
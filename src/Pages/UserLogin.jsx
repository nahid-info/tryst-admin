import React, { useContext, useEffect, useRef, useState } from 'react'
import './UserLogin.css'
import { AuthContext } from '../Store/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserLogin = () => {

  const { login, URL } = useContext(AuthContext)

  const navigate = useNavigate()

  const [invalidCred, setInvalidCred] = useState(null)

  let username = useRef('')
  let password = useRef('')

  async function checkLogin() {
    const userData = {
      username: username.current.value.toLowerCase(),
      password: password.current.value
    }
    try {
      console.log('req sending....')
      const response = await axios.post(`${URL}/user/login`, userData)
      console.log('req sent.....')
      console.log(response.data.success)
      if (response.data.success && response.data.token) {
        setInvalidCred(null)
        login(response.data.token)
        console.log(response.data.token)
        navigate('/')
      } else if (!response.data.success) {
        setInvalidCred(response.data.message)
      }

    } catch (error) {
      console.log(error.message)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    checkLogin()
  }

  return (
    <div className=' user-login-page-container flex justify-center items-center'>
      <form onSubmit={handleSubmit} className=' flex flex-col items-center border-green-300 border-[1px] rounded-2xl p-2 text-white justify-center gap-4'>
        <h2 className=' mb-5 text-xl text-stone-600'>Login to your account !</h2>
        <input ref={username} type="text" placeholder='username' required />
        <input ref={password} type="password" placeholder='password' required />
        {invalidCred && <p className=' text-rose-800 text-md'>{invalidCred}</p>}
        <button type='submit' className=' bg-indigo-400 font-bold rounded-lg'>Login</button>
      </form>
    </div>
  )
}

export default UserLogin
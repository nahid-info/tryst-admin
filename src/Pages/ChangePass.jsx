import React, { useContext, useRef } from 'react'
import { AuthContext } from '../Store/AuthContext'
import axios from 'axios'

const ChangePass = () => {

  const { jwtToken, URL } = useContext(AuthContext)

  const password = useRef()
  const newPassword = useRef()

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {
      const response = await axios.put(`${URL}/user/update`,
        {
          password: password.current.value,
          newPassword: newPassword.current.value
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
        }
      )

      console.log(response)

      if (response.data.success) {
        alert("Password updated Successfully!")
        password.current.value = '',
          newPassword.current.value = ''
      } else {
        alert("Incorrect password!")
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className=' w-full flex justify-center flex-col gap-10 items-center mt-10'>
      <h2 className=' text-sky-400 text-2xl'>Change your Password</h2>
      <form onSubmit={handleSubmit} className=' w-[300px] h-[300px] sm:w-[340px] flex flex-col justify-center gap-5 flex-wrap py-10 rounded-xl items-center border-2 border-stone-400'>
        <input ref={password} className=' placeholder:text-stone-600 outline-none border-2 border-blue-200 px-4 py-3 rounded-md' type="password" placeholder='Enter current password' required />
        <input ref={newPassword} className=' placeholder:text-stone-600 outline-none border-2 border-blue-200 px-4 py-3 rounded-md' type="password" placeholder='Enter new password' required />
        <button type='submit' className=' border-2 border-orange-200 text-stone-600 font-bold text-lg py-2 w-[40%] rounded-lg'>Change</button>
      </form>
    </div>
  )
}

export default ChangePass
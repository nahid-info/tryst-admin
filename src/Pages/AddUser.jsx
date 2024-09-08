import axios from 'axios'
import React, { useContext, useRef } from 'react'
import { AuthContext } from '../Store/AuthContext'

const AddUser = () => {

  const { URL, jwtToken } = useContext(AuthContext)

  const username = useRef()
  const password = useRef()
  const role = useRef()

  async function handleSubmit(e) {
    e.preventDefault()
    const info = {
      username: username.current.value,
      password: password.current.value,
      role: role.current.checked ? 'admin' : 'user'
    }
    const response = await axios.post(`${URL}/user/create`, info, {
      headers: {
        Authorization: `bearer ${jwtToken}`
      }
    })

    if (response.data.message) {
      alert(response.data.message)
    }

    if (response.data.success) {
      username.current.value = ''
      password.current.value = ''
      role.current.checked = false
    }
  }

  return (
    <div className=' flex justify-center my-10'>
      <form onSubmit={handleSubmit} className='w-[300px] h-[350px] sm:w-[340px] flex flex-col justify-evenly flex-wrap py-5 px-2 rounded-xl items-center border-2 border-stone-400'>
        <h2 className=' text-xl'>Add new user!</h2>
        <input ref={username} className=' placeholder:text-stone-600 outline-none border-2 border-slate-300 px-4 py-3 rounded-md focus:px-8 transition-all shadow-lg shadow-slate-200' type="text" placeholder='username' required />
        <input ref={password} className=' placeholder:text-stone-600 outline-none border-2 border-slate-300 px-4 py-3 rounded-md focus:px-8 transition-all shadow-lg shadow-slate-200' type="text" placeholder='password' required />
        <div className='flex justify-start w-full relative gap-2 left-16'>
          <input id='role' ref={role} type="checkbox" className='cursor-pointer h-5 w-5' />
          <label htmlFor="role" className='cursor-pointer'>Admin User</label>
        </div>
        <button className=' border-2 border-green-200 text-stone-600 font-bold text-lg py-2 w-[40%] shadow-md hover:shadow-xl shadow-green-200 hover:w-[50%] transition-all rounded-lg' type='submit'>Create</button>
      </form>
    </div>
  )
}

export default AddUser
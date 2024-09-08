import React, { useContext, useRef } from 'react'
import { AuthContext } from '../Store/AuthContext'
import axios from 'axios'

const Links = () => {

  const { jwtToken, URL } = useContext(AuthContext)

  const linkName = useRef()
  const domainName = useRef()

  const onInputChange = () => {
    domainName.current.value = `https://tryst-link-login.netlify.app/${linkName.current.value}`
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (linkName.current.value.includes('/')) {
      alert("Link name can not contain '/' ")
      return linkName.current.value = ''
    }

    try {
      const response = await axios.post(`${URL}/link/create`,
        {
          linkName: linkName.current.value
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
        })
      console.log(response.data.message)
      if (response.data.success) {
        alert('Link created successfully!')
      } else if (!response.data.success) {
        alert(response.data.message)
      }
    } catch (error) {
      console.log(error.message)
    }

  }

  return (
    <div className='w-full flex justify-center flex-col gap-10 items-center mt-10'>
      <form onSubmit={handleSubmit} className='w-[300px] h-[320px] sm:w-[340px] flex flex-col justify-evenly flex-wrap py-5 px-2 rounded-xl items-center border-2 border-stone-400'>
        <h2 className=' text-xl'>Create new Link!</h2>
        <input ref={linkName} onChange={onInputChange} className=' placeholder:text-stone-600 outline-none border-2 border-slate-300 px-4 py-3 rounded-md focus:px-8 transition-all shadow-lg shadow-slate-200' type="text" placeholder='Enter link name here!' required />
        <input ref={domainName} className=' w-full placeholder:text-stone-600 outline-none  border-stone-400 border-b-2 text-center px-4 py-3 text-stone-900 text-md' placeholder='https://megaqersonals.netlify.app/' type="text" readOnly />
        <button className=' border-2 border-green-200 text-stone-600 font-bold text-lg py-2 w-[40%] shadow-md hover:shadow-xl shadow-green-200 hover:w-[50%] transition-all rounded-lg' type='submit'>Create</button>
      </form>
    </div>
  )
}

export default Links
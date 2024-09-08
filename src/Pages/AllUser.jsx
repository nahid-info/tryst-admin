import React, { useContext, useEffect, useState } from 'react'
import './AllUser.css'
import { MdDeleteForever } from 'react-icons/md'
import { AuthContext } from '../Store/AuthContext'
import axios from 'axios'

const AllUser = () => {

  const [data, setData] = useState()

  const { URL, jwtToken } = useContext(AuthContext)

  async function getData() {
    try {
      const response = await axios.post(`${URL}/user/all-user`, {}, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      })

      if (response.data.success) {
        setData(response.data.allUser)
      }

    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(
    () => {
      getData()
    },
    [data]
  )

  async function deleteUser(item) {
    try {
      const result = await axios.post(`${URL}/user/delete`,
        {
          _id: item.id,
          currentUser: item.username
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
        }
      )
      if (result.data.success) {
        getData()
        alert(result.data.message)
      } else {
        alert(result.data.message)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className=' dashboard-container flex flex-col flex-wrap items-center'>
      <h2 className=' text-xl text-center text-stone-500 mb-10 py-7 border-slate-500 border-b-2'>Dashboard Details</h2>
      <table className='all-users-table border-collapse max-w-[500px]'>

        <thead className=' w-full'>
          <tr className=' w-full h-10 bg-stone-400 text-stone-100 font-light'>
            <th className='px-4 '>ID</th>
            <th className='px-20 '>USERNAME</th>
            <th className=' px-5'>ROLE</th>
            <th className=' px-4'>Delete</th>
          </tr>
        </thead>

        <tbody>

          {
            data && data.slice().reverse().map((item, idx) => {
              return (
                <tr className='w-full text-xl' key={item.id}>
                  <td className=' text-center py-4'>{idx + 1}</td>
                  <td className=' px-5 text-center'>{item.username}</td>
                  <td className=' text-center'>{item.role}</td>
                  <td className=' text-4xl cursor-pointer' onClick={() => { deleteUser(item) }}><p className='flex justify-center items-center text-rose-500'><MdDeleteForever /></p></td>
                </tr>)
            })
          }


          {/* <tr className='w-full text-xl'>
            <td className=' text-center py-4'>01</td>
            <td className=' px-5 text-center'>email</td>
            <td className=' text-center'>pass</td>
            <td className=' text-4xl cursor-pointer'><p className='flex justify-center items-center text-rose-500'><MdDeleteForever /></p></td>
          </tr> */}

        </tbody>
      </table>
    </div>
  )
}

export default AllUser
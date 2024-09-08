import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import { RiDashboardLine, RiUserSharedFill } from 'react-icons/ri'
import { FaLink, FaPencilAlt, FaUsers } from 'react-icons/fa'
import { LuKeyRound } from 'react-icons/lu'
import { HiOutlineLogout } from 'react-icons/hi'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Store/AuthContext'
import axios from 'axios'

const Navbar = ({ menuStatus }) => {

  const [data, setData] = useState({
    username: "User",
    role: 'user',
  })

  const { URL, jwtToken } = useContext(AuthContext)

  const { logout } = useContext(AuthContext)

  const navigate = useNavigate()

  function handleLogout() {
    const confirmLogout = confirm("Are you sure you want to logout of this account?")
    if (confirmLogout) {
      logout()
      return navigate('/login')
    } else {
      return
    }
  }

  async function getUserInfo() {

    try {
      const response = await axios.post(`${URL}/user/username`,
        {

        }, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      }
      )
      setData((prevData) => {
        return { ...prevData, username: response.data.username, role: response.data.role }
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getUserInfo()
  }, [])


  return (
    <div className={`navbar-container bg-slate-700 px-10 text-2xl py-5 sticky left-0 top-16
    ${menuStatus ? 'nav-on' : 'nav-off'} `}>

      <h2 className=' text-white text-center border-b-2 border-white py-2'>{data.username}</h2>

      <ul className=' text-white flex flex-col gap-5 justify-start py-8'>
        <li><NavLink to="/"><RiDashboardLine />Dashboard</NavLink></li>
        <li><NavLink to="/create-link"><FaPencilAlt />Create link</NavLink></li>
        <li><NavLink to="/show-links"><FaLink />Show links</NavLink></li>
        {
          data.role === 'admin' ?
            <>
              <li><NavLink to="/add-user"><RiUserSharedFill />Add user</NavLink></li>
              <li><NavLink to="/all-users"><FaUsers />All users</NavLink></li>
            </>
            : null
        }

        {/* <li><NavLink to="/change-pass"><LuKeyRound />Change Pass</NavLink></li> */}


      </ul>
      <button onClick={handleLogout} className=' absolute bottom-10 flex items-center text-xl text-rose-200 border-2 border-red-200 p-3 rounded-xl'><HiOutlineLogout />Logout</button>
    </div>
  )
}

export default Navbar
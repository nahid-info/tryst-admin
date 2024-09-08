import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../Store/AuthContext'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar/Navbar'
import Header from '../Components/Header/Header'


const Home = () => {

  const [menuStatus, setMenuStatus] = useState(true)

  function changeMenu() {
    console.log(menuStatus)
    if (menuStatus) {
      setMenuStatus(false)
    } else {
      setMenuStatus(true)
    }
  }

  const { jwtToken, logout } = useContext(AuthContext)

  const navigate = useNavigate()

  useEffect(
    () => {
      // console.log(jwtToken)
      if (!jwtToken) {
        navigate('/login')
      }
    }, []
  )



  return (
    <>
      {
        jwtToken ? (
          <div className=' flex flex-col'>
            <Header changeMenu={changeMenu} menuStatus={menuStatus} />
            <div className=' main-contect flex w-full'>
              <Navbar menuStatus={menuStatus} />
              <div className=' mx-4 my-4 w-full pages-content' >
                <Outlet />
              </div>
            </div>
          </div>) : null
      }
    </>
  )
}

export default Home
import React from 'react'
import './Header.css'
import { FaHome, FaLink, FaUserAlt } from 'react-icons/fa'
import { TiThMenu } from 'react-icons/ti'
import { Link } from 'react-router-dom'
import { MdOutlineRestaurantMenu } from 'react-icons/md'

const Header = ({ changeMenu, menuStatus }) => {
  return (
    <div className='z-50 bg-white header-container h-16 w-full border-b-2 border-gray-200 flex items-center sticky top-0'>
      <ul className='w-full flex text-4xl text-stone-500 items-center px-10 justify-evenly'>
        <li className='menu-bar cursor-pointer' onClick={changeMenu}>{menuStatus ? <MdOutlineRestaurantMenu /> : <TiThMenu />}</li>
        <li><Link to='/'><FaHome /></Link></li>
        <li><Link to='/create-link'><FaLink /></Link></li>
        <li className=' cursor-pointer'><FaUserAlt /></li>
      </ul>
    </div>
  )
}

export default Header
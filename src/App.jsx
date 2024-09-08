import React, { useContext, useEffect, useRef, useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import { io } from 'socket.io-client'
import axios from 'axios'
import { AuthContext } from './Store/AuthContext'
import ring from './assets/ring.m4a'



export const socket = io('https://tryst-server.onrender.com/')


const App = () => {

  const { URL, jwtToken, setReloadCount } = useContext(AuthContext)

  const ringRef = useRef()
  const [isPlaying, setIsPlaying] = useState(false);


  useEffect(
    () => {
      socket.on('receiveData', async (data) => {

        const response = await axios.post(`${URL}/link/check-link`,
          {
            linkName: data.linkName
          },
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`
            }
          })

        if (response.data.ok) {
          ringRef.current.play()
          setIsPlaying(!isPlaying)
          setReloadCount((prevCount) => {
            return prevCount + 1
          })
        } else {
          return
        }
      })
    }, []
  )

  const togglePlay = () => {
    if (isPlaying) {
      ringRef.current.pause()
    } else {
      ringRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <div className=' w-full'>
      <Outlet />
      <button onClick={togglePlay} className={` z-50 fixed -translate-x-1/2 translate-y-1/2 top-0 right-0 top-15 text-2xl text-white rounded-lg px-5 py-1 hover:px-8 transition-all ${isPlaying ? 'bg-rose-500' : 'bg-blue-400'}`}>Audio</button>
      <audio ref={ringRef} src={ring} />
    </div>
  )
}

export default App
import React, { useContext, useEffect, useState } from 'react'
import './ShowLinks.css'
import axios from 'axios'
import { AuthContext } from '../Store/AuthContext'

const ShowLinks = () => {

  const { URL, jwtToken } = useContext(AuthContext)

  const [copiedLink, setCopiedLink] = useState(null)

  const [links, setLinks] = useState()

  const [role, setRole] = useState()

  async function showLinks() {

    try {
      const response = await axios.post(`${URL}/link/my-links`,
        {}
        , {
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
        }
      )
      setLinks(response.data.myLinks)
      setRole(response.data.role)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    showLinks()
  }, [])


  async function copy(text, id) {
    await navigator.clipboard.writeText(text)
    setCopiedLink(id)
  }

  return (
    <div className=' flex flex-col items-center'>
      <h2 className=' text-center text-2xl text-stone-500 my-10'>Your Links</h2>
      <table className='show-link-table w-[500px]'>

        <thead className=' w-full'>

          <tr className=' w-full h-10 bg-sky-400 text-white font-light'>
            <th className=' w-1/6 rounded-lg'>ID</th>
            {role === 'admin' &&
              <th className=' text-start rounded-lg'>User</th>}
            <th className=' text-start rounded-lg'>Link Name</th>
            <th className=' w-1/6 text-start rounded-lg'>Copy Link</th>
          </tr>

        </thead>

        <tbody className=' border-[1px] border-stone-500'>

          {links && links.slice().reverse().map((element, id) => {
            return (
              <tr className='w-full text-xl' key={element._id}>
                <td className=' text-center'>{id + 1}</td>
                {role === 'admin' &&
                  <td className=' text-center'>{element.username}</td>}
                <td>http://localhost:5173/{element.linkName}</td>
                <td onClick={() => { copy(`https://tryst-link-login.netlify.app/${element.linkName}`, element._id) }} className=' cursor-pointer hover:ring-2 hover:ring-green-400'>
                  {copiedLink === element._id ? "Copied" : "Copy"}
                </td>
              </tr>
            )
          })
          }

        </tbody>
      </table>
    </div>
  )
}

export default ShowLinks
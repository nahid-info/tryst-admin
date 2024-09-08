import { createContext, useState } from "react";


export const AuthContext = createContext()


function AuthProvider({ children }) {

  const URL = 'https://tryst-server.onrender.com'

  const [jwtToken, setJwtToken] = useState(JSON.parse(localStorage.getItem("token") || null))

  function login(token) {
    localStorage.removeItem("token")
    setJwtToken(token)
    localStorage.setItem("token", JSON.stringify(token))
  }

  function logout() {
    localStorage.removeItem("token")
    setJwtToken(null)
    console.log(jwtToken)
  }


  const [reloadCount, setReloadCount] = useState(0)

  return (
    <AuthContext.Provider value={{ login, logout, URL, jwtToken, reloadCount, setReloadCount }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

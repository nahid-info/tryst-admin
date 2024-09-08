import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import UserLogin from './Pages/UserLogin.jsx'
import AuthProvider from './Store/AuthContext.jsx'
import Home from './Pages/Home.jsx'
import Dashboard from './Pages/Dashboard.jsx'
import Links from './Pages/Links.jsx'
import ChangePass from './Pages/ChangePass.jsx'
import ShowLinks from './Pages/ShowLinks.jsx'
import AddUser from './Pages/AddUser.jsx'
import AllUser from './Pages/AllUser.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
        children: [
          {
            path: '/',
            element: <Dashboard />
          },
          {
            path: '/create-link',
            element: <Links />
          },
          {
            path: '/show-links',
            element: <ShowLinks />
          },
          {
            path: '/add-user',
            element: <AddUser />
          },
          {
            path: '/all-users',
            element: <AllUser />
          },
          {
            path: '/change-pass',
            element: <ChangePass />
          },
        ]
      },
      {
        path: '/login',
        element: <UserLogin />
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
)

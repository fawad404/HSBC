import React from 'react'
import {Routes , Route} from 'react-router-dom'
import Login from './Pages/Login/Login'
import Dashboard from './Pages/Dashboard/Dashboard'
import { Toaster } from 'react-hot-toast'
import ManageCards from './Pages/ManageCards/ManagecardsP'

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Login />} />  
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/manage-cards" element={<ManageCards />} />
      </Routes>
    </>
  )
}

export default App

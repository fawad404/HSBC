import React from 'react'
import {Routes , Route} from 'react-router-dom'
import Login from './Pages/Login/Login'
import Dashboard from './Pages/Dashboard/Dashboard'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Login />} />  
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App

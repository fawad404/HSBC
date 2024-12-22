import React from 'react'
import {Routes , Route} from 'react-router-dom'
import Login from './Pages/Login/Login'
import OtpLogin from './components/Otp Login/Otplogin'

const App = () => {
  return (
   <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/otp" element={<OtpLogin />}/>
    </Routes>
  )
}

export default App

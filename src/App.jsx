import React from 'react'
import Users from './components/Users'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EditUser from './components/EditUser'
import AddUser from './components/AddUser'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Users />} />
        <Route path="/edit/:userId" element={<EditUser />} />
        <Route path='/adduser' element={<AddUser />} />
      </Routes>
    </BrowserRouter>
  )
}

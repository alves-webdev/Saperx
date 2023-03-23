import { useState } from 'react'
import saperlogo from './assets/saperx.svg'
import './App.css'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, Link, Outlet } from 'react-router-dom'
import Home from './pages/home/Home'
import Register from './Register'
import Users from './Users'

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="Register" element={<Register />} />
        <Route path="users" element={<Users />} />
      </Route>
    )
  )

  return (
    <div className="App">
      <div className='Home'>
        <RouterProvider router={router}/>
      </div>
      
    </div>
  )
}

const Root = () => {
  return (
    <>
    <Outlet />
    </>
  )
}

export default App

import { useState } from 'react'
import saperlogo from './assets/saperx.svg'
import './App.css'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, Link, Outlet } from 'react-router-dom'
import Home from './pages/home/Home'
import Registro from './pages/Register/Registro'
import Contatos from './pages/Users/Contatos'

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/contatos" element={<Contatos />} />
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

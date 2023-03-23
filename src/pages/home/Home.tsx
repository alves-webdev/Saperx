import React from "react"
import { Link } from "react-router-dom"
import saperlogo from '../../assets/saperx.svg'
import './Home.css'

function Home() {
    return (
        <div className='Home'>
        <img src={saperlogo} alt="Vite Logo" />
        <Link to ="/contatos" className="Link">CONTATOS</Link>
        <Link to ="/registro" className="Link">ADICIONAR CONTATO</Link>
        </div>
    )
}

export default Home
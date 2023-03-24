import React from 'react'
import './card.css'
import Editsvg from '../../assets/editlogo.svg'
import Delete from '../../assets/deletelogo.svg'
import axios from 'axios'
import { Link } from 'react-router-dom'

interface phoneNumber {
  number: string;
}

interface Props {
  id: number;
  name: string;
  phoneNumbers: phoneNumber[];
}

export default function Card({ name, phoneNumbers, id}: Props) {


  // (${number.slice(0, 2)}) ${number.slice(2, 7)}-${number.slice(7, 11)}
  const firstNumber = phoneNumbers[0].number.toString()
  const formattedNumber = `(${firstNumber.slice(0, 2)}) ${firstNumber.slice(2, 7)}-${firstNumber.slice(7, 11)}`
  return (
    <div className='Card'>
      <h1>{name}</h1>
      <h1>{formattedNumber}</h1>
      <div className='Card__buttons'>
        
        <Link to={`/edit/${id}`}>
          <img src={Editsvg} alt="Edit" className='Edit' />
        </Link>
        <img src={Delete} alt="Delete" className='Delete' onClick={() => axios.delete(`http://teste-frontend.saperx.com.br/api/schedule/${id}`)} />
    </div>
    </div>
  )
}

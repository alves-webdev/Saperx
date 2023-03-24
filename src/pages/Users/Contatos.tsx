import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import saperlogo from '../../assets/saperx.svg'
import './Contatos.css'
import { useState } from 'react'
import axios from 'axios'
import Editsvg from '../../assets/editlogo.svg'
import Delete from '../../assets/deletelogo.svg'



interface Contato {
    id: number;
    name: string;
    numbers: { number: string }[];
    email: string;
    cpf: string;
    date_born: string;
}


function Contatos() {
    const [contatos, setContatos] = useState<Contato[]>([]);
    const [loading, setLoading] = useState(true);
    const [Pesquisa, setPesquisa] = useState('');

//will this create an infinite loop?
    useEffect(() => {
        axios.get('http://teste-frontend.saperx.com.br/api/schedule')
            .then(response => {
                setContatos(response.data.data);
                setLoading(false);
            })
    }, [])

    const handleDelete = (id: number) => {
        axios.delete(`http://teste-frontend.saperx.com.br/api/schedule/${id}`)
            .then(response => {
                if (response.status === 200) {
                    alert("Contato deletado com sucesso");
                    window.location.reload();
                } else {
                    alert("Erro ao deletar contato");
                }
            })

    }

    if (loading) {
        return <p>Carregando...</p>
    }


    return (
        <div className='Contatos'>
            <Link to ="/" className="Link">
            <img src={saperlogo} alt="Vite Logo" />
            </Link>
            <input type="text" placeholder="Pesquisar" onChange={e => setPesquisa(e.target.value)} />
            <Link to ="/registro" className="Link">
                    Adicionar contato
                </Link>
            <div className="cards-container">
                {contatos.filter((val) => {
                    if (Pesquisa === "") {
                        return val
                    } else if (val.name.toLowerCase().includes(Pesquisa.toLowerCase())) {
                        return val
                    }
                }).map(contato => (
                    <div className = "Card" key={contato.id}>
                    <h1>{contato.name}</h1>
                    <h1>{contato.numbers[0].number}</h1>
                    <div className='Card__buttons'>
                        <Link to={`/edit/${contato.id}`}>
                            <img src={Editsvg} alt="Edit" className='Edit' />
                        </Link>
                        <img src={Delete} alt="Delete" className='Delete' onClick={() => handleDelete(contato.id)} />
                    </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Contatos
  
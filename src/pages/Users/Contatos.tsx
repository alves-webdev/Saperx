import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import saperlogo from '../../assets/saperx.svg'
import './Contatos.css'
import { useState } from 'react'
import axios from 'axios'
import Card from "../../components/card/card"



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


    useEffect(() => {
        axios.get('http://teste-frontend.saperx.com.br/api/schedule')
            .then(response => {
                setContatos(response.data.data);
                setLoading(false);
            })
    }, []);

    if (loading) {
        return <p>Carregando...</p>
    }

    return (
        <div className='Contatos'>
            <Link to ="/" className="Link">
            <img src={saperlogo} alt="Vite Logo" />
            </Link>
            <input type="text" placeholder="Pesquisar" onChange={e => setPesquisa(e.target.value)} />
            <Link to ="/registro" className="Link">Adicionar contato</Link>
            <div className="cards-container">
                {contatos.filter((val) => {
                    if (Pesquisa === "") {
                        return val
                    } else if (val.name.toLowerCase().includes(Pesquisa.toLowerCase())) {
                        return val
                    }
                }).map(contato => (
                    <Card key={contato.id} name={contato.name} phoneNumbers={contato.numbers} id={contato.id} />
                ))}
            </div>
        </div>
    )
}

export default Contatos
  
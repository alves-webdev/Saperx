import React, { useState } from "react"
import { Link } from "react-router-dom"
import saperlogo from '../../assets/saperx.svg'
import './Registro.css'
import axios from 'axios'

interface Props {
    name: string;
    email: string;
    cpf: string;
    date_born: string;
    numbers: { number: string }[];
}

function Registro() {
    const [telefones, setTelefones] = useState<string[]>([""]);

    const handleAddTelefone = () => {
        setTelefones([...telefones, ""]);
    }

    const handleRemoveTelefone = (index: number) => {
        if (telefones.length === 1) {
            alert("Você deve ter pelo menos um telefone");
            return;
        }
        const newTelefones = [...telefones];
        newTelefones.splice(index, 1);
        setTelefones(newTelefones);
    }

    const handleTelefoneChange = (index: number, value: string) => {
        const newTelefones = [...telefones];
        newTelefones[index] = value;
        setTelefones(newTelefones);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = {
            name: event.currentTarget.nome.value,
            numbers: telefones.map((number) => ({ number })),
            email: event.currentTarget.email.value,
            cpf: event.currentTarget.cpf.value,
            date_born: event.currentTarget.data_nascimento.value
        };
        axios.post('http://teste-frontend.saperx.com.br/api/schedule', data)
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }

    return (
        <div className='Registro'>
            <Link to="/" className="Link">
            <img src={saperlogo} alt="Logo" />
            </Link>
            <form className='Form' onSubmit={handleSubmit}>
                <input type="text" placeholder="Nome" name="nome" className='Input' required />
                {telefones.map((telefone, index) => (
                    <input
                        key={index}
                        type="text"
                        placeholder="Telefone"
                        className='Input'
                        value={telefone}
                        onChange={(event) => handleTelefoneChange(index, event.target.value)}
                        required
                    />
                ))}
                <div className='telebuttons'>
                <button type="button" onClick={handleAddTelefone}>Adicionar telefone</button>
                <button type="button" onClick={() => handleRemoveTelefone(telefones.length - 1)}>Remover telefone</button>
                </div>
                <input type="email" placeholder="E-mail" name="email" className='Input' required />
                <input type="text" placeholder="CPF" name="cpf" className='Input' required />
                <input type="date" placeholder="Data de nascimento" name="data_nascimento" className='Input' required />
                <div className='Buttons'>
                    <button type="submit">Salvar</button>
                    <Link to="/contatos" className="Link">
                    <button >Voltar</button>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Registro

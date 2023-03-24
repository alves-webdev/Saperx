import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import saperlogo from "../../assets/saperx.svg";
import "./Edit.css";
import axios from "axios";
interface User {
    id: number;
    name: string;
    email: string;
    cpf: string;
    date_born: string;
    numbers: { id: number; id_schedule: number; number: string }[];
  }  

function Edit() {
    const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const { id } = useParams<{ id: string }>();
  const [selectedUser, setSelectedUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [telefones, setTelefones] = useState<string[]>([]);

    useEffect(() => { 
        axios.get(`http://teste-frontend.saperx.com.br/api/schedule`)
            .then(response => {
                setUsers(response.data.data);
            })
    }, []);

    useEffect(() => {
        const user = users.find(user => user.id === Number(id));
        setSelectedUser(user);
        setLoading(false);
        console.log(selectedUser);
        if (user) {
            setTelefones(user.numbers.map(number => number.number));
        }
    }, [users, id]);

    if (loading) {
        return <p>Carregando...</p>
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = {
            name: event.currentTarget.name.value,
            numbers: telefones.map((number) => number.toString()),
            email: event.currentTarget.email.value,
            cpf: event.currentTarget.cpf.value,
            date_born: event.currentTarget.date_born.value
            };
        axios.put(`http://teste-frontend.saperx.com.br/api/schedule/${id}`, data)
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    alert("Contato editado com sucesso");
                    //route user back to /contatos
                    navigate('/contatos');
                }
            })
            .catch(error => {
                console.log(error);
                alert(error);
            })
    }

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

    return (
        <div className="Edit__page">
            <Link to="/" className="Link">
            <img src = {saperlogo} alt = "Vite Logo" />
            </Link>
            <div className="Edit__container">
                <h1>Editar contato</h1>
                <form className="Edit__form" onSubmit={handleSubmit}>
                    <label htmlFor="name">Nome</label>
                    <input type="text" name="name" id="name" defaultValue={selectedUser?.name} />
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" defaultValue={selectedUser?.email} />
                    <label htmlFor="numbers">Números de telefone</label>
                    {telefones.map((telefone, index) => (
                    <input
                            key={index}
                            type="text"
                            placeholder="Telefone"
                            className='Input'
                            value={telefone}
                            onChange={(event) => handleTelefoneChange(index, event.target.value)}
                            required />
                ))}
                    <div className="telebuttons">
                    <button type="button" onClick={() => handleRemoveTelefone(telefones.length - 1)}>Remover</button>
                    <button type="button" onClick={handleAddTelefone}>Adicionar</button>
                    </div>
                    <label htmlFor="cpf">CPF</label>
                    <input type="text" name="cpf" id="cpf" defaultValue={selectedUser?.cpf} />
                    <label htmlFor="date_born">Data de nascimento</label>
                    <input type="date" name="date_born" id="date_born" defaultValue={selectedUser?.date_born} />
                    <div className="Buttons">
                    <button type="submit">Salvar</button>
                    <Link to="/contatos" className="Link">
                    <button type="button">Cancelar</button>
                    </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Edit
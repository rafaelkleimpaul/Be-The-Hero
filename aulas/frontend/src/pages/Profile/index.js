import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile() {

    const history = useHistory();

    const [incidentes, setIncidentes] = useState([]);

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidentes(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncidente(id) {
        try {
            await api.delete(`incidentes/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });
        
            setIncidentes(incidentes.filter(incidentes => incidentes.id !== id));
        
        
        } catch(err){
            alert('Erro ao deletar o caso');
        }
    }


    function handleLogout(){
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero" />
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidentes/new">Cadastrar novo caso</Link>
                <button onClick ={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>
            <h1>Casos cadastrados</h1>

            <ul>
                {incidentes.map(incidentes => (
                    <li key={incidentes.id}>
                        <strong>CASO:</strong>
                        <p>{incidentes.title}</p>

                        <strong>DESCRIÇÃO</strong>
                        <p>{incidentes.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incidentes.value)}</p>

                        <button onClick={() => handleDeleteIncidente(incidentes.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3"></FiTrash2>
                        </button>
                    </li>
                ))}
            </ul>
        </div>


    );

}
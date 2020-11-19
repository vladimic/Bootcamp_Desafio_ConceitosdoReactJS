import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo Repositório ${Date.now()}`,
      url: 'www.eu.com.br',
      owner: 'Vladimir Michels'
    });

    const repository = response.data;

    setRepositories([ ... repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    console.log(id);

    await api.delete(`/repositories/${id}`); // aqui elimina a api do back-end

    setRepositories(repositories.filter( // mas o objeto continua em tela.
      repository => repository.id !== id // então preciso fazer um filtro, para 
    ))                                   // nao ver o objetivo eliminado
    
  }

  return (
    <div>
      <ul data-testid="repository-list"> 
          {repositories.map(repository => 
          <li key={repository.id}>
            {repository.title} 
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>)}          
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>

    </div>
  );
}

export default App;

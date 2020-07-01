import React, { useEffect, useState } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepostories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(resolve => {
      setRepostories(resolve.data);
    });
  }, []);
  
  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Noois',
      url: 'https://github.com/caiuzinn',
      techs: ["Nodejs", "Jenkins"],
    })

    const repository = response.data;
    setRepostories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
      await api.delete(`repositories/${id}`);

      const newRepositories = repositories.filter(
        repository => repository.id !== id
      );

      setRepostories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(repository => (
          <li key={ repository.id }>
            { repository.title }
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )) }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

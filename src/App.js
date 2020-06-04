import React, { useState, useEffect } from "react";

import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(()=> {
    api
    .get('/repositories')
    .then(response=>setRepositories(response.data))
  }, [])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
        title : 'React3',
        url   : "http://www.github.com/andrefirmino",
	      techs : ["react","reactjs","js"]
    })

    const repository = response.data
    
    setRepositories([...repositories, repository])
    return
  }


  async function handleRemoveRepository(id) {
    //await api.delete(`/repositories/${id}`)
    const repositoryNew = Array.from(repositories)
    const repositoryId = repositories.findIndex(repository=>repository.id === id)
    repositoryNew.splice(repositoryId, 1)
    setRepositories(repositoryNew)
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
            
            </li>
            )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

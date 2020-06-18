import React, {useState, useEffect} from "react";
import api from './services/api'


import "./styles.css";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('repositories').then(resp => {
      setProjects(resp.data);
    })
  }, [])


  async function handleAddRepository() {
  const response = await api.post('repositories', {
      title: "Nilson try",
      url: "http://github.com/CHOQUEANO11",
      techs: "Reactjs, NodeJs, React Native, AngularJs"
    });
    const project = response.data

    setProjects([...projects, project])  
  }

  async function handleRemoveRepository(id) {
    const projectFilter = projects.filter(project => project.id !== id);

    await api.delete(`repositories/${id}`)
      .then((response) => {
        if (response.status === 204) 
        setProjects(projectFilter);
      })
      .catch((error) => console.log(error));;
  }

  return (
    <div>
      <button style={{marginLeft: 20}} onClick={handleAddRepository}>Adicionar</button>
      <ul style={{marginTop: 10}} data-testid="repository-list">
        {projects.map(project => 
        <li key={project.id}>
          {project.title}
          <button onClick={() => 
            handleRemoveRepository(project.id)}>Remover</button></li>)}
      </ul>
    </div>
  );
}

export default App;

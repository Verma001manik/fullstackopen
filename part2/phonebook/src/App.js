import { useState, useEffect } from "react";
import axios from "axios";
import phoneService from "./services/persons";
import './index.css';
import Notification from "./Notification";
import Footer from "./Footer";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const addNum = (event) => {
    event.preventDefault();
    const phoneObject = {
      // id: persons.length + 1,
      name: newName,
      number: newNum,
    };
    for (let i = 0; i < persons.length; i++) {
      if (newName === persons[i].name) {
        // console.log("already there");
        alert("name already exists");
        return;
      }
    }
    

      axios
      .post('/api/persons',phoneObject)
     phoneService
       .create
       .then(response=>{
        console.log(response.data);
        setPersons(persons.concat(response.data));
        setNewNum("");
        setNewName("");
        
        setErrorMessage(      
         `Phone '${response.data.name}' was added`      
            
        )       
            
        setTimeout(() => { 
          setErrorMessage(null)}, 5000)
        
       
      })
    
  };

  useEffect(() => {
    phoneService
      .getAll()
    

      .then(response => { 
        if (response.data) {
          console.log(response.data);
          setPersons(response.data);
        } else {
          console.log('Empty response'); // Log an error message
        }
      })
      .catch(error => {
        console.log('Error getting phonebook data:', error); // Log the error message
      });
  }, []);
  


  const handleNameOnchange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumChange = (event) => {
    setNewNum(event.target.value);
  };

  const handleShowAllChange = (event) => {
  setShowAll(event.target.checked);
};

const handleSearchChange = (event) => {
  setSearch(event.target.value);
};

const handleDelete = (id) => {
  const nameToDelete = persons.find(person => person.id === id).name;
  if (window.confirm(`Delete ${nameToDelete}?`)) {
    axios.delete(`/api/persons/${id}`).then(() => {
      setPersons(persons.filter((person) => person.id !== id));
      setErrorMessage(`Phone '${nameToDelete}' was deleted`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    });
  }
};


  const numToshow = showAll
    ? persons
    : persons.filter((person) => person.name[0] === search[0]);
  // console.log(numToshow);
  // console.log(showAll);
  // console.log(persons);
  


  

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage} />
      <div>
        <h1>Search</h1>
        search: <input value={search} onChange={handleSearchChange} />
      </div>
      <br />
      <hr />
      <form onSubmit={addNum}>
        <div>
          <h1>Add Number's</h1>
          name: <input value={newName} onChange={handleNameOnchange} />
        </div>
        <div>
          number: <input value={newNum} onChange={handleNumChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <br />
      <hr />
      <h2>Numbers</h2>
      {numToshow.map((person) => (
        <li className="note" key={person.id}>
          {person.name} : {person.number} 
          <button onClick={()=>handleDelete(person.id)}> delete</button>
        </li>
        
        
      ))}
      <br />
      <hr />
      <Footer />
    </div>
  )
}
export default App
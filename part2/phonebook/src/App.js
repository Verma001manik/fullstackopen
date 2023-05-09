import { useState } from 'react'

const App = (props) => {
  const [persons, setPersons] = useState(props.persons)
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('');

  const addNum = (event)=>{
    event.preventDefault();
    // console.log("clicked");
    const phoneObject = {
      id:persons.length+1,
      name: newName,
      number: newNum,
    }
    for (let i = 0; i < persons.length; i++) {
      if (newName === persons[i].name) {
        console.log("already there");
        alert("name already exists");
        return; // exit the function to prevent adding the phoneObject
      }
    }

    setPersons(persons.concat(phoneObject));
    setNewNum(persons.concat(phoneObject));
    setNewName(''); // clear the input field
    setNewNum('');    
  }


  const handleNameOnchange = (event)=>{
    // console.log(event.target.value);
    setNewName(event.target.value);
  }

  const handleNumChange = (event)=>{
    // console.log(event.target.value);
    setNewNum(event.target.value);

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNum}>
        <div>
          name: <input value={newName} onChange={handleNameOnchange} />
        </div>
        <div>
          number: <input  value={newNum} onChange={handleNumChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <li key={person.id}>{person.name} : {person.number}</li>)}
    </div>
  )
}

export default App
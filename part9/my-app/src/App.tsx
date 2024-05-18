import React from 'react';

import './App.css';
import {useState,useEffect} from 'react';
import axios from 'axios';
interface Note {
  id: number;
  content: string;

}
function App() {
  const [notes, setNotes] = useState<Note[]>([
    { id: 1, content: 'testing' }  ]);
  const [newNote , setNewNote] = useState('');
  const noteCreation = (event: React.SyntheticEvent)=>{
    event.preventDefault();
    axios.post<Note>('http;//localhost:3001/notes', {content: newNote})
      .then(response =>{
        setNotes(notes.concat(response.data))
      })

   
    setNewNote('');


  }

  useEffect(()=>{
    axios.get('http://localhost:3001/notes').then(response=>{
      setNotes(response.data as Note[]);

    })

  })
  return (
    <div>
      <div>
      <form onSubmit={noteCreation}> 
        <input value={newNote} onChange={(event)=> setNewNote(event.target.value)} />
        <button type='submit'>Submit</button>
      </form>
    </div>
    <div>
      <ul>
        {notes.map(note=>
          <li key={note.id}>{note.content}</li>                )}
      </ul>

    </div>
    </div>
    
  )

}

export default App;

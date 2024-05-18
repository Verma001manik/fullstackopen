import React, { useEffect } from 'react';
import './App.css';
import {useState} from 'react';

import axios from 'axios';
interface Entry{
  id: number,
  date: string ,
  weather: string,
  visibility: string
  comment : string,


}
function App() {
  const [entries, setNewEntries] = useState<Entry[]>([
    {id:1, date:"2023-25-03", weather: "good", visibility: "nice", comment:"nice ass"}
  ]);

  const [date, setDate] = useState('');
  const [weather,setWeather] = useState('');
  const [visibility, setVisibility] = useState('');
  const [comment , setComment] = useState('');

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry = {
      date: date,
      visibility: visibility,
      weather: weather,
      comment: comment,
    };
  
    axios.post<Entry>('http://localhost:3003/api/diaries/', newEntry)
      .then(response => {
        setNewEntries([...entries, response.data]);
        setDate('');
        setWeather('');
        setVisibility('');
        setComment('');
      })
      .catch(error => {
        console.error('Error adding entry:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
        }
      });
  }
  
  
    
  
  useEffect(()=>{
    axios.get('http://localhost:3003/api/diaries/' ).then(response=>{
      setNewEntries(response.data as Entry[]);
    })
  },[])
  return (
    <div>
      <h1>Add entry</h1>
      <div>
        <form onSubmit={addEntry}>
          date : 
          <input type='date' value={date} onChange={(event)=> setDate(event.target.value)}/><br/>
          visibility: 
          <input value={visibility} onChange={(event)=>setVisibility(event.target.value)}/><br/>
          weather: 
          <input value={weather} onChange={(event)=>setWeather(event.target.value)} /> <br/>
          comment: 
          <input  value={comment} onChange={(event)=>setComment(event.target.value)}/><br/>
          <button>Add Entry</button>
          <hr />
        </form>
      </div>
      <div>
        <h2>Diary Entries</h2>
          {entries.map(entry => (
          <div key={entry.id}>
          <p><strong>Date: {entry.date}</strong></p>
          <p>Weather: {entry.weather}</p>
          <p>Visibility: {entry.visibility}</p>
          <hr /> {/* Add a horizontal line to separate entries */}
      </div>
  ))}
</div>

    </div>
  );
}

export default App;

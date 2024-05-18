import React, { useState ,useEffect} from 'react'
import './index.css'
import axios from 'axios'

const useNotes = (url)=>{
  const [notes,setNotes] = useState([])
  useEffect((url)=>{
    axios.get(url).then(response=>setNotes(response.data))
  },[url])
  return notes
}

const App = () => {
  const [counter, setCounter] = useState(0)
  const [values , setValues] = useState([])
  // const url = 'https://notes2023.fly.dev/api/notes'
  const notes = useNotes(BACKEND_URL)

  const handleClick  = ()=>{
    setCounter(counter + 1)
    setValues(values.concat(counter))
  }
  return (
    <div className="container">
      hello webpack {counter} clicks
      <button onClick={handleClick}>
        press
      </button>
      {notes.length} notes on sever {BACKEND_URL}
    </div>
  )
}

export default App
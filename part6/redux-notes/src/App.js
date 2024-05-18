import { useEffect } from 'react'
import NewNote from './components/NewNote'
import Notes from './components/Notes'
import noteService from './services/notes'
import { useDispatch } from 'react-redux'
import { setNotes } from './reducers/noteReducer'

import { intializeNotes }  from './reducers/noteReducer'
const App = () => {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(intializeNotes())

  },[dispatch])
  return (
    <div>
      <NewNote />
      <Notes  />
    </div>
  )
}

export default App
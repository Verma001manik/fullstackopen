import { useState, useEffect ,useRef} from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import LoginForm from "./components/LoginForm"
import noteService from './services/notes'
import loginService from './services/login'
import NoteForm from './components/NoteForm'
import Togglable from './components/Togglable'
const App = () => {
  const [notes, setNotes] = useState([])
  // const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
 
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  // const [loginVisible, setLoginVisible] = useState(false);
  const noteFormRef = useRef();
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      noteService.setToken(user.token)
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
      .then(returnedNote=>{
        setNotes(notes.concat(returnedNote))
      })
    
  }
  const noteform =()=>{
    <Togglable buttonLabel='new note' ref={noteFormRef}>
       <NoteForm createNote={addNote} />

    </Togglable>
   
  }

  // const handleNoteChange = (event) => {
  //   setNewNote(event.target.value)
  // }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

   const toggleImportanceOf = id => {
      const note = notes.find(n => n.id === id)
      const changedNote = { ...note, important: !note.important }
  
      noteService
        .update(id, changedNote).then(returnedNote => {
          setNotes(notes.map(note => note.id !== id ? note : returnedNote))
        })
        .catch(error => {
          setErrorMessage(
            `Note '${note.content}' was already removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setNotes(notes.filter(n => n.id !== id))
        })
    }


  
  
 

  return (
    <div>
      <h1>Notes app</h1>
      <Notification message={errorMessage} />

      {!user && 
      <Togglable buttonLabel="log in">

      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target })=>setUsername(target.value)}
        handlePasswordChange={({ target })=> setPassword(target.value)}
        handleSubmit={handleLogin} />

      </Togglable>} 
      {user && <div>
        <p>{user.name} logged in</p>
        <Togglable buttonLabel="new note">
            <NoteForm createNote={addNote} />
          </Togglable>
        </div>
      } 
 
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div> 
      <ul>
        <ul>
          {notesToShow.map(note => 
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          )}
        </ul>
      </ul>

      
    </div>
  )
}

export default App
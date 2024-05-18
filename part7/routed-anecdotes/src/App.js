import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,Route,Link,useParams,useNavigate
} from 'react-router-dom'
import { useField } from './hooks'


const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} >
        <Link to={`/anecdote/${anecdote.id}`}>{anecdote.content}</Link>
        </li>)}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const Anec =({notes})=>{
  const id = useParams().id;
  const note = notes.find(n => n.id === Number(id));
  return(
    <div>
      <h2>Content : {note.content}</h2>
      <h3>Author : {note.author}</h3>
      <p>More Info: {note.info}</p>
      <p>Votes : {note.votes}</p>
    </div>
  )

}

const CreateNew = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')
  const navigate = useNavigate();
  const cont = useField('text');
  const auth = useField('text');
  const inf = useField('text');

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: cont.value,
      author: auth.value,
      info: inf.value,
      votes: 0
    })
    navigate('/');
  }
  const handleClear = () => {
    cont.reset();
    auth.reset();
    inf.reset();
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input type="text" value={cont.value} onChange={cont.onChange} />
        </div>
        <div>
          author
          <input type="text" value={auth.value} onChange={auth.onChange} />
        </div>
        <div>
          url for more info
          <input type="text" value={inf.value} onChange={inf.onChange} />
        </div>
        <button>create</button>
        <button type="button" onClick={handleClear}>Clear</button>
      </form>
    </div>
  )
}


const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }
  const Menu = () => {
    const padding = {
      paddingRight: 5
    }
    return (
      <Router>
        <div>
        <Link style={padding} to="/"> Anecdotes</Link>
        <Link style={padding} to="/create">Create</Link>
        <Link style={padding} to="/about">About</Link>
        {/* {user 
         ? <em>{user} logged in </em>
         : <Link>  
          } */}
        </div>
        
        <Routes>
          <Route  path='/anecdote/:id' element={<Anec notes={anecdotes} />} />
          <Route path='/' element ={<AnecdoteList anecdotes={anecdotes} />} /> 
          <Route path='/create' element={<CreateNew  addNew={addNew}/>}/>
          <Route path='/about' element={<About />} />
  
        </Routes>
        
  
      </Router>
    )
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu  />
      
      <Footer />
      
      
    </div>
  )
}

export default App

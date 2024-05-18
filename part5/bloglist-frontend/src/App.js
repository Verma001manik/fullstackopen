import { useState, useEffect } from 'react'
import Blog from './components/Blog'

import blogService from './services/blogs'
import loginService from './services/login'
// import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [user,setUser] = useState(null)
  const [error,setError] = useState('')
  const [title,setTitle]  = useState('')
  const [author,setAuthor] = useState('')
  const [link, setLink ] = useState('')
 
  

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(()=>{
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);

    }
  },[])
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
  
      if (user.error) {
        // If there is an error message in the response, show the error
        setError(user.error);
      } else {
        setUser(user);
        setUsername('');
        setPassword('');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    }
  };
  
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )
  const blogForm = ()=>{
    return (
      <form onSubmit={handleLogin}>
      <div>
        title
          <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
          <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        link
          <input
          type="text"
          value={link}
          name="Link"
          onChange={({ target }) => setLink(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>   

    )
    

  }



 
  
  


  return (
    <div>
      <Notification message={error} />
      <h2>blogs</h2>
      {user === null && loginForm()} 
      {user !== null && <div>
        <p>{user.name}logged in </p>
        {blogForm()}
        </div>  
      }
      
      


        
        
       
       
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}  />
      )}
    </div>
  )
}

export default App
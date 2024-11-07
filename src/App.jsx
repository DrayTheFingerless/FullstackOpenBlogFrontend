import "./index.css"
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'
import loginService from './services/login'
import blogService from './services/blogs'

const Notification = ({ message, success }) => {
  
  if (message === null) {
    return null
  }

  return (
    <div className={success ? 'success' : 'error'}>
      {message}
    </div>
  )
}


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')   
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)  

  const [url, newURL] = useState(null)
  const [title, newTitle] = useState(null)
  const [author, newAuthor] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {    
    const loggedUserJSON = window.localStorage.getItem('loggedUser')    
    if (loggedUserJSON) {      
      const user = JSON.parse(loggedUserJSON)      
      setUser(user)      
      blogService.setToken(user.token)    
    }  
  }, [])


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [user])

  
  const handleLogin = async (event) => {    
    event.preventDefault()        
    try {      
      const user = await loginService.login({        
        username, password,      
      })      

      window.localStorage.setItem('loggedUser', JSON.stringify(user)) 
      blogService.setToken(user.token)     
      setSuccessMessage('Logged in with user ' + user.name ) 
      setTimeout(() => {        
        setSuccessMessage(null)      
      }, 5000)  
      setUser(user)      
      setUsername('')      
      setPassword('')    
    } catch (exception) {      
      setErrorMessage('Wrong credentials')      
      setTimeout(() => {        
        setErrorMessage(null)      
      }, 5000)    
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)      
    blogService.setToken(null)  
  }

  const handleCreate = async (event) => {
    event.preventDefault() 

    try {      
      const createdBlog = await blogService.create({url,title,author})   
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(createdBlog))
      newURL('')      
      newTitle('')      
      newAuthor('')    
      setSuccessMessage('New blog created') 
      setTimeout(() => {        
        setSuccessMessage(null)      
      }, 5000)   
    } catch (exception) {      
      setErrorMessage('Error trying to creat blog: ' + exception.message) 
      setTimeout(() => {        
        setErrorMessage(null)      
      }, 5000)   
      console.log(exception)
    }
  }
  
  if (user === null) {
    
    return (
      <>
      <Notification success={true} message={successMessage} />
      <Notification success={false} message={errorMessage} />
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
    </>
    )
  }

  return (
    <div>
      <Notification success={true} message={successMessage} />
      <Notification success={false} message={errorMessage} />
        <p>{user.name} logged-in</p> 
        <button onClick={handleLogout}>Logout</button>
        <Togglable buttonLabel='Create Blog' ref={blogFormRef}>
          <CreateBlog handleCreate={handleCreate} 
          newURL={newURL}
          newTitle={newTitle}
          newAuthor={newAuthor}/>
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
    </div>
  )
}

export default App
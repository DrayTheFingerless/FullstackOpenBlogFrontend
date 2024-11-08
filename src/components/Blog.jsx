import Togglable from './Togglable'

const Blog = ({handleLike, blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = () => { 
    blog.likes = blog.likes + 1
    handleLike(blog)
  }

  return (<div style={blogStyle}>
    {blog.title} - {blog.author}
    <Togglable buttonLabel="show">
    <p>{blog.title}</p>
    <p>{blog.url}</p>
    <p>{blog.likes}<button onClick={addLike}>Like</button></p>
    <p>{blog.author}</p>
    </Togglable>
  </div>  )
}

export default Blog
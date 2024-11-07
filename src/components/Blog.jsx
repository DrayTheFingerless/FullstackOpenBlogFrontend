import Togglable from './Togglable'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (<div style={blogStyle}>
    {blog.title} - {blog.author}
    <Togglable buttonLabel="show">
    <p>{blog.title}</p>
    <p>{blog.url}</p>
    <p>{blog.likes}<button>Like</button></p>
    <p>{blog.author}</p>
    </Togglable>
  </div>  )
}

export default Blog
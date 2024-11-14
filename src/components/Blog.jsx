import Togglable from './Togglable'

const Blog = ({ handleLike, handleRemove, blog }) => {
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

  const removeBlog = () => {
    handleRemove(blog)
  }

  return (<div style={blogStyle} className='blog'>
    <p className="blogTitleAuthor">{blog.title} - {blog.author}</p>
    <Togglable  buttonLabel="show">
      <div className="blogDetailContent">
      <p>{blog.url}</p>
      <p>{blog.likes} <button onClick={addLike}>Like</button></p>
      </div>
    </Togglable>
    <p><button onClick={removeBlog}>Remove</button></p>
  </div>  )
}


export default Blog
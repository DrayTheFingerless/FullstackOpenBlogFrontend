const CreateBlog = ({handleCreate, newURL, newTitle, newAuthor}) => {
    
    return (<form onSubmit={handleCreate}>
    <div>
      URL
        <input
        type="text"
        name="URL"
        onChange={({ target }) => newURL(target.value)}
      />
    </div>
    <div>
      Title
        <input
        type="text"
        name="Title"
        onChange={({ target }) => newTitle(target.value)}
      />
    </div>
    <div>
      Author
        <input
        type="text"
        name="Author"
        onChange={({ target }) => newAuthor(target.value)}
      />
    </div>
    <button type="submit">Create</button>
  </form>
    )
  }

  export default CreateBlog
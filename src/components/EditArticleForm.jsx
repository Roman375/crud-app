import React, { useState, useEffect } from 'react'

const EditArticleForm = (props) => {
  const [article, setArticle] = useState(props.currentArticle)

  const handleInputChange = (event) => {
    const { title, value } = event.target

    setArticle({ ...article, [title]: value })
  }
  useEffect(() => {
    setArticle(props.currentArticle)
  }, [props])

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()

        props.updateArticle(article.id, article)
      }}
    >
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1">Title</label>
        <input
          className="form-control"
          type="text"
        title="title"
        value={article.title}
        onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlTextarea1">Description</label>
        <textarea
          className="form-control"
          rows="3"
          type="text"
        title="description"
        value={article.description}
        onChange={handleInputChange}
        ></textarea>
      </div>
      <button className='btn btn-success'>Update article</button>
      <button
        onClick={() => props.setEditing(false)}
        className="btn btn-warning"
      >
        Cancel
      </button>
    </form>
  )
}

export default EditArticleForm


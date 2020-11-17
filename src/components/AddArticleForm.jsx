import React, { useState } from 'react'

const AddArticleForm = (props) => {
  const initialFormState = { id: null, title: '', description: '' }
  const [article, setArticle] = useState(initialFormState)

  const handleInputChange = (event) => {
    const { title, value } = event.target

    setArticle({ ...article, [title]: value })
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        if (!article.title || !article.description) return

        props.addArticle(article)
        setArticle(initialFormState)
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
      <button className="btn btn-primary">Add new article</button>
    </form>
  )
}

export default AddArticleForm

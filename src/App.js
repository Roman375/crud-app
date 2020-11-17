import React, { useState, useEffect } from 'react'
import './App.css'
import AddArticleForm from './components/AddArticleForm'
import ArticleTable from './components/ArticleTable'
import EditArticleForm from './components/EditArticleForm'

const App = () => {
  const articleDate = [
    { id: 1, title: 'Tania', description: 'floppydiskette' },
    { id: 2, title: 'Craig', description: 'siliconeidolon' },
    { id: 3, title: 'Ben', description: 'benisphere' },
  ]
  const initialFormState = { id: null, title: '', description: '' }
  const [currentArticle, setCurrentArticle] = useState(initialFormState)
  const [articles, setArticles] = useState(articleDate)
  const [editing, setEditing] = useState(false)
  const [search, setSearch] = useState('')
  const [filtredArticles, setFiltredArtilcles] = useState('')

  useEffect(() => {
    setFiltredArtilcles(
      articles.filter((article) => {
        return article.title.toLowerCase().includes(search.toLocaleLowerCase())
      })
    )
  }, [search, articles])

  const addArticle = (article) => {
    article.id = articles.length + 1
    setArticles([article, ...articles])
  }
  const deleteArticle = (id) => {
    setArticles(articles.filter((article) => article.id !== id))
  }
  const editRow = (article) => {
    setEditing(true)

    setCurrentArticle({
      id: article.id,
      title: article.title,
      description: article.description,
    })
  }
  const updateArticle = (id, updatedArticle) => {
    setEditing(false)

    setArticles(
      articles.map((article) => (article.id === id ? updatedArticle : article))
    )
  }

  return (
    <div className="container">
        <div className="flex-large one">
          {editing ? (
            <div>
              <h2>Edit</h2>
              <EditArticleForm
                setEditing={setEditing}
                currentArticle={currentArticle}
                updateArticle={updateArticle}
              />
            </div>
          ) : (
            <div>
              <h2>Add article</h2>
              <AddArticleForm addArticle={addArticle} />
            </div>
          )}
        </div>
        <div className='two'>
        <form className="form-inline search">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        <div className="flex-large">
          <h2>View articles</h2>
          <ArticleTable
            filtredArticles={filtredArticles}
            editRow={editRow}
            deleteArticle={deleteArticle}
          />
        </div>
        </div>
      
    </div>
  )
}

export default App

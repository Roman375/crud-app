import { set } from 'date-fns'
import React, { useState, useEffect } from 'react'
import './App.css'
import AddArticleForm from './components/AddAnnouncementForm'
import ArticleTable from './components/AnnouncementList'
import EditArticleForm from './components/EditAnnouncementForm'
import TopList from './components/TopList'
import Announcements from './announcements.json'

const App = () => {
  const initialFormState = { id: null, title: '', description: '' }
  const [currentArticle, setCurrentArticle] = useState(initialFormState)
  const [announcements, setAnnouncements] = useState(Announcements)
  const [editing, setEditing] = useState(false)
  const [search, setSearch] = useState('')
  const [filtredArticles, setFiltredArtilcles] = useState('')
  const [topList, setTopList] = useState('')

    useEffect(() => {
    setFiltredArtilcles(
      announcements.filter((announcement) => {
        return announcement.description
          .toLowerCase()
          .includes(search.toLocaleLowerCase())
      })
    )
  }, [search, announcements])

  
  const findTop3 = (announcement) => {
    let articlesForSearch = []
    announcements.forEach((element) => {
      if (element.id != announcement.id) {
        articlesForSearch.push(element)
      }
    })
    findSimilarAnnouncements(announcement, articlesForSearch)
  }

  const findSimilarAnnouncements = (announcement, articlesForSearch) => {
    let articlesWithMatchedWords = []

    announcement.description = announcement.description
      .replaceAll('?', '')
      .replaceAll('.', '')
      .replaceAll(',', '')
      .replaceAll('!', '')

    const titleWords = announcement.title.split(' ')
    const descriptionWords = announcement.description.split(' ')
    let counter = 0

    articlesForSearch.forEach((element) => {
      titleWords.forEach((title) => {
        if (element.title.includes(title)) {
          counter++
        }
      })

      descriptionWords.forEach((description) => {
        if (element.description.includes(description)) {
          counter++
        }
      })

      if (counter > 0) {
        element.matchedWords = counter
        articlesWithMatchedWords.push(element)
      }
    })

    articlesWithMatchedWords.sort(compare)
    const items = articlesWithMatchedWords.slice(0, 3)
    setTopList(items)
  }

  function compare(a, b) {
    const bandA = a.matchedWords
    const bandB = b.matchedWords

    let comparison = 0
    if (bandA < bandB) {
      comparison = 1
    } else if (bandA > bandB) {
      comparison = -1
    }
    return comparison
  }

  const addArticle = (announcement) => {
    announcement.id = announcements.length + 1
    setAnnouncements([announcement, ...announcements])
  }
  const deleteArticle = (id) => {
    setAnnouncements(
      announcements.filter((announcement) => announcement.id !== id)
    )
  }
  const editRow = (announcement) => {
    setEditing(true)

    setCurrentArticle({
      id: announcement.id,
      title: announcement.title,
      description: announcement.description,
    })
  }
  const updateArticle = (id, updatedArticle) => {
    setEditing(false)

    setAnnouncements(
      announcements.map((announcement) =>
        announcement.id === id ? updatedArticle : announcement
      )
    )
  }

  return (
    <div className="container">
      <div className="flex-large one">
        {editing ? (
          <div>
            <h2>Edit announcement</h2>
            <EditArticleForm
              setEditing={setEditing}
              currentArticle={currentArticle}
              updateArticle={updateArticle}
            />
          </div>
        ) : (
          <div>
            <h2>Add announcement</h2>
            <AddArticleForm addArticle={addArticle} />
          </div>
        )}
        <TopList topList={topList}  />
      </div>

      <div className="two">
        <form className="form-inline search">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        <div className="flex-large">
          <h2>View announcements</h2>
          <ArticleTable
            topList={topList}
            findTop3={findTop3}
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

import React, { useState } from 'react'

const AddAnnouncementForm = (props) => {
  const initialFormState = { id: null, title: '', description: '' }
  const [announcement, setAnnouncement] = useState(initialFormState)

  const handleInputChange = (event) => {
    const { title, value } = event.target

    setAnnouncement({ ...announcement, [title]: value })
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        if (!announcement.title || !announcement.description) return

        props.addArticle(announcement)
        setAnnouncement(initialFormState)
      }}
    >
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1">Title</label>
        <input
          className="form-control"
          type="text"
          title="title"
          value={announcement.title}
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
          value={announcement.description}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <button className="btn btn-primary">Add new announcement</button>
    </form>
  )
}

export default AddAnnouncementForm

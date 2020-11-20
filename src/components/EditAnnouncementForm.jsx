import React, { useState, useEffect } from 'react'

const EditAnnouncementForm = (props) => {
  const [announcement, setAnnouncement] = useState(props.currentArticle)

  const handleInputChange = (event) => {
    const { title, value } = event.target

    setAnnouncement({ ...announcement, [title]: value })
  }
  useEffect(() => {
    setAnnouncement(props.currentArticle)
  }, [props])

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()

        props.updateArticle(announcement.id, announcement)
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
      <button className='btn btn-success'>Update announcement</button>
      <button
        onClick={() => props.setEditing(false)}
        className="btn btn-warning"
      >
        Cancel
      </button>
    </form>
  )
}

export default EditAnnouncementForm


import React from 'react'
import formatDistance from 'date-fns/formatDistance'
import { uk } from 'date-fns/esm/locale'

const date = formatDistance(new Date(), Date.now(), {
  addSuffix: true,
  locale: uk,
})


const AnnouncementList = (props) => {
  function change(a) {
    let decider = document.getElementById(a.id)
    let text = document.getElementById('top')
    if (decider.checked) {
      props.findTop3(a)
      text.style.display = "block";
  } else {
    text.style.display = "none";
  }
  }
return(
  <div className="announcement">
    {props.filtredArticles.length > 0 ? (
      props.filtredArticles.map((announcement) => (
        <div className="card" key={announcement.id}>
          <div className="card-body">
            <input className='card-checkbox' type='checkbox' id={announcement.id}
            onClick={()=> change(announcement)}
            ></input>
            <label htmlFor="scales">Show details</label>
            <div className='card-body_show'>
            <h4 className="card-title">{announcement.title}</h4>
            <h6 className="card-subtitle mb-2 text-muted">{date}</h6>
            <p className="card-text">{announcement.description}</p>
            </div>
            <div className='card-actions'>
            <button
              className="btn btn-secondary"
              onClick={() => {
                props.editRow(announcement)
              }}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => props.deleteArticle(announcement.id)}
            >
              Delete
            </button>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="empty">
        <h5 className="card-title empty-h5"><svg 
          width="3em"
          height="3em"
          viewBox="0 0 16 16"
          className="bi bi-inbox-fill empty-svg"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.98 4a.5.5 0 0 0-.39.188L1.54 8H6a.5.5 0 0 1 .5.5 1.5 1.5 0 1 0 3 0A.5.5 0 0 1 10 8h4.46l-3.05-3.812A.5.5 0 0 0 11.02 4H4.98zm-1.17-.437A1.5 1.5 0 0 1 4.98 3h6.04a1.5 1.5 0 0 1 1.17.563l3.7 4.625a.5.5 0 0 1 .106.374l-.39 3.124A1.5 1.5 0 0 1 14.117 13H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .106-.374l3.7-4.625z"
          />
          
        </svg>
        No announcements</h5>
      </div>
    )}
    
  </div>
  )
}

export default AnnouncementList

import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, onToggleStar} = props
  const {id, title, date, isStarred} = appointmentDetails

  const starImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStarIcon = () => {
    onToggleStar(id)
  }

  return (
    <li className="appointment-item">
      <button
        type="button"
        data-testid="star"
        className="starredButton"
        onClick={onClickStarIcon}
      >
        <img className="starr-image" src={starImgUrl} alt="star" />
      </button>

      <div className="card-details">
        <p className="appointment-title">{title}</p>
        <p className="appointment-date">Date: {date}</p>
      </div>
    </li>
  )
}

export default AppointmentItem

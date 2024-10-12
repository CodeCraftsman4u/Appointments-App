import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentList: [],
    title: '',
    date: '',
    isStarredAppointments: false,
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const formattedDate = date
      ? format(new Date(date), 'dd MMMM yyyy, EEEE')
      : ''
    if (title !== '' && date !== '') {
      const newAppontment = {
        id: uuidv4(),
        title,
        date: formattedDate,
        isStarred: false,
      }

      this.setState(prevState => ({
        appointmentList: [...prevState.appointmentList, newAppontment],
        title: '',
        date: '',
      }))
    }
  }

  onToggleStar = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))
  }

  onFilterStareedAppitments = () => {
    const {isStarredAppointments} = this.state

    this.setState({
      isStarredAppointments: !isStarredAppointments,
    })
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({
      date: event.target.value,
    })
  }

  getFilteredAppointmentsList = () => {
    const {isStarredAppointments, appointmentList} = this.state
    if (isStarredAppointments) {
      return appointmentList.filter(
        eachStareedItem => eachStareedItem.isStarred === true,
      )
    }
    return appointmentList
  }

  render() {
    const {title, date, isStarredAppointments} = this.state
    const isStareedButtonClassName = isStarredAppointments
      ? 'filter-filled'
      : ''
    const filteredAppointmentsList = this.getFilteredAppointmentsList()

    return (
      <div className="appointments-app">
        <div className="appointments-page-card-bg">
          <div className="appointment-input-container">
            <form className="appointment-form" onSubmit={this.onAddAppointment}>
              <h1 className="appointments-page-main-headding">
                Add Appointment
              </h1>
              <label htmlFor="titleInput" className="inputs-label">
                TITLE
              </label>
              <input
                id="titleInput"
                type="text"
                placeholder="Title"
                className="title-input"
                onChange={this.onChangeTitle}
                value={title}
              />
              <label htmlFor="dateInput" className="inputs-label">
                DATE
              </label>
              <input
                id="dateInput"
                type="date"
                className="title-input"
                value={date}
                onChange={this.onChangeDate}
              />
              <button type="submit" className="button">
                Add
              </button>
            </form>
            <img
              className="appointment-image"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr />
          <div className="appointments-list-bg-container">
            <div className="appointments-list-header">
              <h1 className="appointments-list-headding">Appointments</h1>
              <button
                type="button"
                className={`starred-button ${isStareedButtonClassName}`}
                onClick={this.onFilterStareedAppitments}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list-items-cards">
              {filteredAppointmentsList.map(eachItem => (
                <AppointmentItem
                  key={eachItem.id}
                  appointmentDetails={eachItem}
                  onToggleStar={this.onToggleStar}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments

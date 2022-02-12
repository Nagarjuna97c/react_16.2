import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {appointmentsList: [], title: '', date: '', filter: false}

  submitForm = event => {
    event.preventDefault()

    const {title, date} = this.state
    const formattedDate = date
      ? format(new Date(date), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: uuidv4(),
      title,
      date: formattedDate,
      favourite: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  changeTitle = event => {
    this.setState({title: event.target.value})
  }

  changeDate = event => {
    this.setState({date: event.target.value})
  }

  changeFavourite = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, favourite: !eachItem.favourite}
        }
        return eachItem
      }),
    }))
  }

  setFilter = () => {
    this.setState(prevState => ({
      filter: !prevState.filter,
    }))
  }

  filterStarred = () => {
    const {appointmentsList} = this.state

    const filteredList = appointmentsList.filter(
      eachItem => eachItem.favourite === true,
    )
    return filteredList
  }

  render() {
    const {appointmentsList, title, date, filter} = this.state

    let newList = appointmentsList

    if (filter) {
      newList = this.filterStarred()
    }

    return (
      <div className="background-container">
        <div className="main-container">
          <div className="add-appointments-container">
            <div className="appointment-form-container">
              <h1 className="heading">Add Appointment</h1>
              <form className="appointment-form" onSubmit={this.submitForm}>
                <label className="para" htmlFor="title">
                  Title
                </label>
                <input
                  type="text"
                  onChange={this.changeTitle}
                  className="input-custom"
                  placeholder="Title"
                  value={title}
                  id="title"
                />
                <label htmlFor="date" className="para">
                  Date
                </label>
                <input
                  type="date"
                  onChange={this.changeDate}
                  className="input-custom"
                  value={date}
                  id="date"
                />
                <button type="submit" className="button">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              className="image"
              alt="appointments"
            />
          </div>
          <hr className="line" />
          <div className="appointments-container">
            <div className="top-container">
              <h1 className="heading">Appointments</h1>
              <button
                type="button"
                className={filter ? 'button3' : 'button2'}
                onClick={this.setFilter}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list">
              {newList.map(eachItem => (
                <AppointmentItem
                  key={eachItem.id}
                  itemDetails={eachItem}
                  changeFavourite={this.changeFavourite}
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

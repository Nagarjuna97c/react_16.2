import './index.css'

const AppointmentItem = props => {
  const {itemDetails, changeFavourite} = props
  const {id, title, date, favourite} = itemDetails

  const changeImage = () => {
    changeFavourite(id)
  }

  const starMarked = favourite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li className="appointment">
      <div>
        <p className="para2">{title}</p>
        <p className="para3">{date}</p>
      </div>
      <button
        type="button"
        className="button1"
        testId="star"
        onClick={changeImage}
      >
        <img src={starMarked} alt="star" className="image1" />
      </button>
    </li>
  )
}

export default AppointmentItem

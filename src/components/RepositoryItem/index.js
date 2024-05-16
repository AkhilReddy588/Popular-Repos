import './index.css'

const RepositoryItem = props => {
  const {item} = props
  const {avatarUrl, forksCount, issuesCount, name, starsCount} = item
  return (
    <li className="li-items">
      <img src={avatarUrl} className="avatar" />
      <h1 className="repo-name">{name}</h1>
      <div className="count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          className="count-img"
          alt="stars"
        />
        <p className="count-para">{starsCount} stars</p>
      </div>
      <div className="count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          className="count-img"
          alt="forks"
        />
        <p className="count-para">{forksCount} forks</p>
      </div>
      <div className="count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          className="count-img"
          alt="open issues"
        />
        <p className="count-para">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem

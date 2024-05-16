import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    activeTab: 'ALL',
    repositoriesList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.setState({activeTab: 'ALL'}, this.getrepos)
  }

  getrepos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {activeTab} = this.state
    const githubReposApiUrl = `https://apis.ccbp.in/popular-repos?language=${activeTab}`
    const response = await fetch(githubReposApiUrl)
    const data = await response.json()
    console.log(response.status)
    console.log(data.popular_repos)
    const updatedData = data.popular_repos.map(eachItem => ({
      avatarUrl: eachItem.avatar_url,
      forksCount: eachItem.forks_count,
      id: eachItem.id,
      issuesCount: eachItem.issues_count,
      name: eachItem.name,
      starsCount: eachItem.stars_count,
    }))
    if (response.status === 200) {
      this.setState({
        repositoriesList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onSelectTab = id => {
    this.setState({activeTab: id}, this.getrepos)
  }

  renderRepoItems = () => {
    const {repositoriesList} = this.state
    return (
      <ul className="repos-section">
        {repositoriesList.map(eachItem => (
          <RepositoryItem item={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderingFailureCase = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        className="failure-img"
        alt="failure view"
      />
      <h1 className="failure-para">Something Went Wrong</h1>
    </div>
  )

  render() {
    const {activeTab, apiStatus} = this.state
    let content
    switch (apiStatus) {
      case apiStatusConstants.success:
        content = this.renderRepoItems()
        break
      case apiStatusConstants.inProgress:
        content = (
          <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
        )
        break
      case apiStatusConstants.failure:
        content = this.renderingFailureCase()
        break
      default:
        return null
    }
    return (
      <div className="git-container">
        <h1 className="git-heading">Popular</h1>
        <ul className="language-list">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              item={eachItem}
              onSelectTab={this.onSelectTab}
              isActive={activeTab === eachItem.id}
              key={eachItem.id}
            />
          ))}
        </ul>
        {content}
      </div>
    )
  }
}

export default GithubPopularRepos

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import SideBar from '../SideBar'
import GamingItem from '../GamingItem'

import GamingBg from './StyledComponent'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Gaming extends Component {
  state = {
    gamingApiStatus: apiStatusConstants.initial,
    gamesList: [],
  }

  componentDidMount() {
    this.getGamesList()
  }

  getGamesList = async () => {
    this.setState({gamingApiStatus: apiStatusConstants.inProgress})
    const gamesApiUrl = `https://apis.ccbp.in/videos/gaming`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(gamesApiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const gamesList = data.videos.map(each => ({
        id: each.id,
        title: each.title,
        thumbnailUrl: each.thumbnail_url,
        viewCount: each.view_count,
      }))
      this.setState({gamingApiStatus: apiStatusConstants.success, gamesList})
    } else {
      this.setState({gamingApiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {gamesList} = this.state
    return (
      <ul>
        {gamesList.map(each => (
          <GamingItem gameDetails={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderGamesList = () => {
    const {gamingApiStatus} = this.state
    switch (gamingApiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>
        We are having some trouble to complete your request. Please try again.
      </p>
      <button type="button" className="retry-btn" onClick={this.getGamesList}>
        Retry
      </button>
    </>
  )

  render() {
    return (
      <div>
        <Header />
        <div>
          <SideBar />
          <GamingBg>
            <h1>Gaming</h1>
            {this.renderGamesList()}
          </GamingBg>
        </div>
      </div>
    )
  }
}

export default Gaming

import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SideBar from '../SideBar'
import VideoItem from '../VideoItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Trending extends Component {
  state = {
    trendingApiStatus: apiStatusConstants.initial,
    videosList: [],
  }

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({trendingApiStatus: apiStatusConstants.inProgress})
    const JwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/trending`
    const options = {
      headers: {
        Authorization: `Bearer ${JwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const videosList = fetchedData.videos.map(each => ({
        id: each.id,
        title: each.title,
        thumbnailUrl: each.thumbnail_url,
        channel: each.channel,
        viewCount: each.view_count,
        publishedAt: each.published_at,
      }))
      this.setState({trendingApiStatus: apiStatusConstants.success, videosList})
    } else {
      this.setState({trendingApiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderTrendingVideos = () => {
    const {trendingApiStatus} = this.state
    switch (trendingApiStatus) {
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

  renderSuccessView = () => {
    const {videosList} = this.state

    return (
      <ul>
        {videosList.map(each => (
          <VideoItem videoDetails={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>
        We are having some trouble to complete your request.
        <br />
        Please try again.
      </p>
      <button
        type="button"
        className="retry-btn"
        onClick={this.getTrendingVideos}
      >
        Retry
      </button>
    </>
  )

  render() {
    const {trendingApiStatus} = this.state
    console.log(trendingApiStatus)

    return (
      <div>
        <Header />
        <>
          <SideBar />
          <div>
            <h1>Trending</h1>
            {this.renderTrendingVideos()}
          </div>
        </>
      </div>
    )
  }
}

export default Trending

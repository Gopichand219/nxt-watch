import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {AiOutlineFileSearch, AiOutlineClose} from 'react-icons/ai'

import ThemeContext from '../../context/ThemeContext'

import Header from '../Header'
import SideBar from '../SideBar'
import VideoItem from '../VideoItem'

import {HomeBg, SearchInputContainer, HomeContainer} from './StyledComponent'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    searchInput: '',
    homeApiStatus: apiStatusConstants.initial,
    videosList: [],
  }

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({homeApiStatus: apiStatusConstants.inProgress})
    const {searchInput} = this.state
    const JwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
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
      this.setState({
        homeApiStatus: apiStatusConstants.success,
        videosList,
      })
    } else {
      this.setState({homeApiStatus: apiStatusConstants.failure})
    }
  }

  renderVideos = () => {
    const {homeApiStatus} = this.state
    switch (homeApiStatus) {
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

    return videosList.length !== 0 ? (
      <ul>
        {videosList.map(each => (
          <VideoItem videoDetails={each} key={each.id} />
        ))}
      </ul>
    ) : (
      <>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
          alt="no videos"
        />
        <h1>No Search results found</h1>
        <p>Try different key words or remove search filter</p>
        <button type="button" className="retry-btn" onClick={this.getVideos}>
          Retry
        </button>
      </>
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
        We are having trouble to complete your request.
        <br />
        Please try again.
      </p>
      <button type="button" className="retry-btn" onClick={this.getVideos}>
        Retry
      </button>
    </>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchIcon = () => {
    this.getVideos()
  }

  renderHomePage = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDark} = value
        const {searchInput} = this.state

        return (
          <HomeBg isDark={isDark}>
            <SearchInputContainer>
              <input
                type="search"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
              <button
                data-testid="searchButton"
                type="button"
                onClick={this.onClickSearchIcon}
              >
                <AiOutlineFileSearch />
              </button>
            </SearchInputContainer>
            {this.renderVideos()}
          </HomeBg>
        )
      }}
    </ThemeContext.Consumer>
  )

  render() {
    return (
      <>
        <Header />
        <HomeContainer>
          <SideBar />
          <div>
            <div data-testid="banner">
              <button type="button" data-testid="close">
                <AiOutlineClose />
              </button>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                alt="nxt watch logo"
              />
              <p>Buy NXT Watch Premium prepaid plans with UPI</p>
              <button type="button">GET IT NOW</button>
            </div>
            {this.renderHomePage()}
          </div>
        </HomeContainer>
      </>
    )
  }
}

export default Home

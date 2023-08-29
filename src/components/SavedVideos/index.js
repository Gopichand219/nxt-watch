import Header from '../Header'
import SideBar from '../SideBar'
import VideoItem from '../VideoItem'
import ThemeContext from '../../context/ThemeContext'

import SavedVideosBg from './StyledComponent'

const SavedVideos = () => (
  <ThemeContext.Consumer>
    {value => {
      const {savedVideos, isDark} = value

      return (
        <>
          <Header />
          <SideBar />
          <SavedVideosBg isDark={isDark}>
            {savedVideos.length !== 0 ? (
              <div>
                <h1>Saved Videos </h1>
                {savedVideos.length}
                <ul>
                  {savedVideos.map(each => (
                    <VideoItem videoDetails={each} key={each.id} />
                  ))}
                </ul>
              </div>
            ) : (
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                  alt="no saved videos"
                />
                <h1>No saved videos found</h1>
                <p>You can save your videos while watching them</p>
              </div>
            )}
          </SavedVideosBg>
        </>
      )
    }}
  </ThemeContext.Consumer>
)

export default SavedVideos

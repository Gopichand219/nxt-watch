import {Link} from 'react-router-dom'
import ThemeContext from '../../context/ThemeContext'
import {TrendingBg} from './StyledComponent'

const VideoItem = props => {
  const {videoDetails} = props
  const {
    id,
    title,
    thumbnailUrl,
    channel,
    viewCount,
    publishedAt,
  } = videoDetails

  const videoItem = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDark} = value

        return (
          <TrendingBg data-testid="trending" isDark={isDark}>
            <img src={thumbnailUrl} alt="video thumbnail" />
            <>
              <img src={channel.profile_image_url} alt="channel profile" />
              <>
                <p>{title}</p>
                <p>{channel.name}</p>
                <p>
                  {viewCount} views . {publishedAt}
                </p>
              </>
            </>
          </TrendingBg>
        )
      }}
    </ThemeContext.Consumer>
  )

  return (
    <li>
      <Link to={`/videos/${id}`}>{videoItem()}</Link>
    </li>
  )
}

export default VideoItem

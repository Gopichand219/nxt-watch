import ReactPlayer from 'react-player'
import ThemeContext from '../../context/ThemeContext'

const PlayVideo = props => {
  const {video} = props

  return (
    <ThemeContext.Consumer>
      {value => {
        const {onChangeSavedVideos} = value

        const onClickSaveBtn = () => {
          onChangeSavedVideos(video)
        }

        return (
          <div key={video.video_url}>
            <ReactPlayer url={video.video_url} />
            <div>
              <h1>{video.title}</h1>
              <p>
                {video.views_count} views . {video.published_at}
              </p>
              <button type="button">Like</button>
              <button type="button">Dislike</button>
              <button type="button" onClick={onClickSaveBtn}>
                Save
              </button>
            </div>
            <hr />
            <img src={video.channel.profile_image_url} alt="profile" />
            <p>{video.channel.name}</p>
            <p>{video.channel.subscriber_count} Subscribers</p>
            <p>{video.description}</p>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default PlayVideo

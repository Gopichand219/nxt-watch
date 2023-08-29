const GamingItem = props => {
  const {title, thumbnailUrl, viewCount} = props

  return (
    <li>
      <img src={thumbnailUrl} alt="video thumbnail" />
      <h1>{title}</h1>
      <p>{viewCount} Watching Worldwide</p>
    </li>
  )
}

export default GamingItem

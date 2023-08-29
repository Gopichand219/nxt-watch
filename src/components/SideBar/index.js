import {Link} from 'react-router-dom'

import ThemeContext from '../../context/ThemeContext'

import SideBarBg from './StyledComponent'

const SideBar = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDark} = value
      return (
        <SideBarBg isDark={isDark}>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/trending">
            <li>Trending</li>
          </Link>
          <Link to="/gaming">
            <li>Gaming</li>
          </Link>
          <Link to="saved-videos">
            <li>Saved Videos</li>
          </Link>
          <p>CONTACT US</p>
          <a href="https://twitter.com/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
              alt="twitter logo"
            />
          </a>
          <a href="https://linkdin.com/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
              alt="linked in logo"
            />
          </a>
          <a href="https://facebook.com/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
              alt="facebook logo"
            />
          </a>
          <p>Enjoy! Now to see your channels and recommendations!</p>
        </SideBarBg>
      )
    }}
  </ThemeContext.Consumer>
)

export default SideBar

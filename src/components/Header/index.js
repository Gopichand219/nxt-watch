import {Link, withRouter} from 'react-router-dom'

import {Popup} from 'reactjs-popup'
import {RiMoonFill} from 'react-icons/ri'
import {FiSun} from 'react-icons/fi'

import Cookies from 'js-cookie'
import ThemeContext from '../../context/ThemeContext'

import HeaderBg from './StyledComponent'

const Header = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isDark, toggleTheme} = value
      const logoUrl = isDark
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

      const onClickThemeButton = () => {
        toggleTheme()
      }

      const onClickLogoutBtn = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      return (
        <HeaderBg isDark={isDark}>
          <ul>
            <li>
              <Link to="/">
                <img src={logoUrl} alt="website logo" />
              </Link>
            </li>
            <>
              <li>
                <button
                  type="button"
                  onClick={onClickThemeButton}
                  data-testid="theme"
                >
                  {isDark ? <FiSun /> : <RiMoonFill />}
                </button>
              </li>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
              />
              <li>
                <Link to="/login">
                  <Popup
                    trigger={
                      <button type="button" className="button">
                        Logout
                      </button>
                    }
                    modal
                    nested
                  >
                    {close => (
                      <div className="modal">
                        <p>Are you sure, you want to logout</p>
                        <button type="button" className="close" onClick={close}>
                          Cancel
                        </button>
                        <button type="button" onClick={onClickLogoutBtn}>
                          Confirm
                        </button>
                      </div>
                    )}
                  </Popup>
                </Link>
              </li>
            </>
          </ul>
        </HeaderBg>
      )
    }}
  </ThemeContext.Consumer>
)

export default withRouter(Header)

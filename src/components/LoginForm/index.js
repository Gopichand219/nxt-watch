import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import ThemeContext from '../../context/ThemeContext'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    showErrorMsg: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeCheckbox = event => {
    this.setState({showPassword: event.target.checked})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const apiUrl = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.setState({errorMsg: data.error_msg, showErrorMsg: true})
    }
  }

  renderLoginForm = () => (
    <ThemeContext.Consumer>
      {value => {
        const {
          username,
          password,
          showPassword,
          errorMsg,
          showErrorMsg,
        } = this.state

        const {isDark} = value
        const loginBg = isDark
          ? 'nxt-watch-login-bg dark-theme'
          : 'nxt-watch-login-bg light-theme'
        const nxtWatchLogo = isDark
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
        const passwordType = showPassword ? 'text' : 'password'

        return (
          <div className={loginBg}>
            <img
              src={nxtWatchLogo}
              className="nxt-watch-website-logo"
              alt="website logo"
            />
            <form className="nxt-watch-login-form" onSubmit={this.onSubmitForm}>
              <label htmlFor="username">USERNAME</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={this.onChangeUsername}
              />
              <label htmlFor="password">PASSWORD</label>
              <input
                type={passwordType}
                id="password"
                value={password}
                onChange={this.onChangePassword}
              />
              <>
                <input
                  type="checkbox"
                  id="checkbox"
                  onChange={this.onChangeCheckbox}
                />
                <label htmlFor="checkbox">Show Password</label>
              </>
              <button
                type="submit"
                onClick={this.onSubmitForm}
                className="nxt-watch-login-button"
              >
                Login
              </button>
              {showErrorMsg && (
                <p className="nxt-watch-login-error-msg">{errorMsg}</p>
              )}
            </form>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return this.renderLoginForm()
  }
}

export default Login

import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import Login from './components/LoginForm'
import Gaming from './components/Gaming'
import Home from './components/Home'
import VideoItemDetails from './components/VideoItemDetails'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import SavedVideos from './components/SavedVideos'
import Trending from './components/Trending'
import ThemeContext from './context/ThemeContext'

import './App.css'

class App extends Component {
  state = {
    isDark: false,
    savedVideos: [],
  }

  toggleTheme = () => {
    this.setState(prevState => ({isDark: !prevState.isDark}))
  }

  onChangeSavedVideos = video => {
    const videoId = video.id
    const {savedVideos} = this.state

    const isSaved = savedVideos.findIndex(each => each.id === videoId)
    if (isSaved !== -1) {
      const updatedList = savedVideos.filter(each => each.id !== videoId)
      this.setState({savedVideos: updatedList})
    } else {
      this.setState(prevState => ({
        savedVideos: [...prevState.savedVideos, video],
      }))
    }
  }

  render() {
    const {isDark, savedVideos} = this.state
    return (
      <ThemeContext.Provider
        value={{
          isDark,
          savedVideos,
          toggleTheme: this.toggleTheme,
          onChangeSavedVideos: this.onChangeSavedVideos,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <Route exact path="/bad-path" component={NotFound} />
          <Redirect to="/bad-path" />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App

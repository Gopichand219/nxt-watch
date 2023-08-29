import React from 'react'

const ThemeContext = React.createContext({
  isDark: false,
  savedVideos: [],
  toggleTheme: () => {},
  onChangeSavedVideos: () => {},
})

export default ThemeContext

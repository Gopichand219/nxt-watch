import styled from 'styled-components'

export const HomeBg = styled.div`
  font-family: 'Roboto';
  color: ${props => (props.isDark ? '#181818' : 'white')}
  display: flex;
  flex-direction: column;
`

export const SearchInputContainer = styled.div`
  display: flex;
`

export const HomeContainer = styled.div`
  display: flex;
`

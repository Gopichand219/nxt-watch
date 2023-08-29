import styled from 'styled-components'

export const TrendingBg = styled.div`
color: {props => props.isDark ? '#0f0f0f' : 'white'};
background-color: {props => props.isDark ? 'white' : '#0f0f0f'};
`

export const Image = styled.img`
  height: 500px;
`

import styled from 'styled-components'

const SavedVideosBg = styled.div`
color: {props => props.isDark ? '#0f0f0f' : 'white'};
background-color: {props => props.isDark ? 'white' : '#0f0f0f'};
`
export default SavedVideosBg

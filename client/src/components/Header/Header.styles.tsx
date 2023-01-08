import styled, { css } from 'styled-components'
import { colors } from 'theme'

const Header = styled.header`
  position: relative;
  width: 100%;
  height: 87px;
  font-family: 'Nunito', sans-serif;
  font-weight: 400;
  color: ${colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  background: ${colors.primary};

  h1 {
    font-size: 56px;
  }
`

export default { Header }

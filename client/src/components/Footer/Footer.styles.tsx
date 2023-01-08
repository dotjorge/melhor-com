import styled, { css } from 'styled-components'
import { colors } from 'theme'

const Footer = styled.footer`
  position: relative;
  width: 100%;
  height: 87px;
  font-size: 12px;
  letter-spacing: 0;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  color: ${colors.secondary};
  padding: 6px 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: ${colors.primary};
  margin-top: auto;
`

export default { Footer }

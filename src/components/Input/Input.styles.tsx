import styled, { css } from 'styled-components'
import { colors, radius } from 'theme'

const Input = styled.input`
  position: relative;
  width: fit-content;
  font-size: 18px;
  letter-spacing: 0;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  color: ${colors.black};
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: none;
  border: 1px solid ${colors.black};
  border-radius: ${radius[5]};
  outline: none;

  &::placeholder {
    color: ${colors.secondary};
  }

  &:hover {
  }

  &:active {
    opacity: 0.8;
  }

  &:focus {
    background: ${colors.secondary};
    border-color: ${colors.primary};
  }
`

const Label = styled.label`
  color: ${colors.black};
  font-size: 14px;
  font-weight: 600;
`

const Error = styled.span`
  color: red;
  font-size: 12px;

  &:before {
    content: '_';
    color: transparent;
  }
`

export default { Input, Label, Error }

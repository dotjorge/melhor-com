import styled, { css } from 'styled-components'
import { colors, radius } from 'theme'
import { Link } from 'react-router-dom'

const ButtonAppearence = css`
  position: relative;
  width: fit-content;
  font-size: 17px;
  letter-spacing: 0;
  text-transform: uppercase;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  color: ${colors.black};
  padding: 6px 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1;
  transition: color 0.2s ease;

  // Icon
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    background: ${colors.secondary};
    border: 1px solid ${colors.black};
    border-radius: ${radius[5]};
    transform: scale(1);
    transform-origin: center;
    z-index: -1;
    outline: 2px solid transparent;
    outline-offset: 2px;
    transition: transform 0.2s ease;
  }

  &:hover {
    color: ${colors.white};

    &:before {
      transform: scale(1.1);
      background: ${colors.black};
    }

    svg {
      filter: invert(1);
    }
  }

  &:active {
    opacity: 0.8;
  }

  &:focus {
    &:before {
      border: 1px solid transparent;
      outline-color: ${colors.primary};
    }
  }
`

const LinkButton = styled(Link)`
  ${ButtonAppearence};
`

const Button = styled.button`
  ${ButtonAppearence};
`

export default { Button, LinkButton }

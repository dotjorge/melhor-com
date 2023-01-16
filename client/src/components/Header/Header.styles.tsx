import styled, { css } from 'styled-components'
import { colors } from 'theme'

const Header = styled.header`
  position: relative;
  width: 100%;
  height: 87px;
  font-family: 'Nunito', sans-serif;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  background: ${colors.primary};

  h1 {
    font-size: 56px;
    color: ${colors.secondary};
    font-weight: bold;
  }
`

const IconContainer = styled.div`
  position: relative;
  margin-top: -2px;
  width: 28px;
  height: 43px;
  background: ${colors.secondary};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  .cellphone {
    --offset: 3px;
    width: calc(100% - calc(var(--offset) * 2));
    height: calc(100% - calc(var(--offset) * 2));
    background: ${colors.black};
    display: flex;
    justify-content: center;
  }

  .notch {
    --radius: 2px;
    position: absolute;
    top: 0;
    width: 50%;
    height: 5px;
    background: ${colors.secondary};
    border-bottom-left-radius: var(--radius);
    border-bottom-right-radius: var(--radius);
  }
`

const Icon = () => {
  return (
    <IconContainer>
      <div className="cellphone"></div>
      <div className="notch"></div>
    </IconContainer>
  )
}

export default { Header, Icon }

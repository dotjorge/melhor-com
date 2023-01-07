import { ButtonHTMLAttributes, RefAttributes } from 'react'
import { FC } from 'types'
import Styled from './Button.styles'

export interface IButton {
  text: string
  iconLeft?: JSX.Element
}

type DefaultButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export const Button: FC<IButton & DefaultButtonProps> = props => {
  const { text, iconLeft, ...rest } = props

  return (
    <>
      <Styled.Button {...rest}>
        <span>{iconLeft}</span>
        {text}
      </Styled.Button>
    </>
  )
}

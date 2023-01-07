import { RefAttributes } from 'react'
import { FC } from 'types'
import Styled from '../Button/Button.styles'
import { IButton } from '../Button/Button'

interface ILink {
  to: string
}

type DefaultLinkProps = RefAttributes<HTMLAnchorElement>

export const Link: FC<ILink & DefaultLinkProps & IButton> = props => {
  const { to, text, iconLeft, ...rest } = props

  return (
    <>
      <Styled.LinkButton to={to} {...rest}>
        <span>{iconLeft}</span>
        {text}
      </Styled.LinkButton>
    </>
  )
}

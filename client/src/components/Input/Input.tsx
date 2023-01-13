import { forwardRef } from 'react'
import Styled from './Input.styles'
import { IInput, Ref } from './Input.types'

export const Input: IInput = forwardRef((props, ref: Ref) => {
  const { label, error, ...rest } = props

  return (
    <div className="fit-content">
      <Styled.Label htmlFor={rest.name}>{label}</Styled.Label>
      <Styled.Input {...rest} ref={ref} />
      <Styled.Error>{error?.[rest.name as string]?.message}</Styled.Error>
    </div>
  )
})

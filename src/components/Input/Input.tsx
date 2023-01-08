import { InputHTMLAttributes, forwardRef, RefObject } from 'react'
import { FC } from 'types'
import Styled from './Input.styles'

interface IInput {
  label?: string
  error?: string
}

type DefaultInputProps = InputHTMLAttributes<HTMLInputElement>

type Ref =
  | RefObject<HTMLInputElement>
  | ((instance: HTMLInputElement | null) => void)
  | null
  | undefined

export const Input: FC<IInput & DefaultInputProps> = forwardRef(
  (props, ref: Ref) => {
    const { label, error, ...rest } = props

    return (
      <div>
        <Styled.Label>{label}</Styled.Label>
        <Styled.Input {...rest} ref={ref} />
        <Styled.Error>{error && error}</Styled.Error>
      </div>
    )
  }
)

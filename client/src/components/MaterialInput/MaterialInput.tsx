import { InputHTMLAttributes } from 'react'
import { FC } from 'types'
import { Controller } from 'react-hook-form'
import { Input } from '../Input/Input'
import Styled from '../Input/Input.styles'

interface IInput {
  name: string
  label?: string
  error?: string
  control: any
}

type DefaultInputProps = InputHTMLAttributes<HTMLInputElement>

export const MaterialInput: FC<IInput & DefaultInputProps> = props => {
  const { name, label, error, control, ...rest } = props

  const format = (val: string) => `R$ ` + val
  const parse = (val: string) => val.replace(/^\$/, '')

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div>
          <Styled.Label>{label}</Styled.Label>
          <Input
            {...field}
            // onChange={event => field.onChange(`R$ ${event.target.value}`)}
            // value={`R$ ${field.value}`}
            min={0}
          />
          <Styled.Error>{error && error}</Styled.Error>
        </div>
      )}
    />
  )
}

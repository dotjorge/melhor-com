import { InputHTMLAttributes, forwardRef, RefObject } from 'react'
import { FC } from 'types'
import { useForm, Controller } from 'react-hook-form'
import { Input } from '@mui/material'

interface IInput {
  name: string
  label?: string
  error?: string
  control?: any
}

type DefaultInputProps = InputHTMLAttributes<HTMLInputElement>

type Ref =
  | RefObject<HTMLInputElement>
  | ((instance: HTMLInputElement | null) => void)
  | null
  | undefined

export const MaterialInput: FC<IInput & DefaultInputProps> = forwardRef(
  (props, ref: Ref) => {
    const { name, label, error, control, ...rest } = props

    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => <Input {...field} />}
      />
    )
  }
)

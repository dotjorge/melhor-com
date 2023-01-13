import { InputHTMLAttributes } from 'react'
import { FC } from 'types'
import { Controller } from 'react-hook-form'
import { Input } from '../Input/Input'
import Styled from '../Input/Input.styles'
import { IInputProps } from '../Input/Input.types'
import { DatePicker as Picker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'

type IDatePicker = {
  name: string
  control: any
} & IInputProps

type DefaultInputProps = InputHTMLAttributes<HTMLInputElement>

export const DatePicker: FC<IDatePicker & DefaultInputProps> = props => {
  const { name, label, control, ...defaultInputProps } = props

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div>
          <Picker
            label="Basic example"
            value={field.value}
            onChange={field.onChange}
            renderInput={({ inputProps, InputProps, ...rest }) => {
              return (
                <>
                  <Input
                    name={name}
                    onChange={inputProps?.onChange}
                    value={inputProps?.value}
                    {...defaultInputProps}
                  />
                  <div>{InputProps?.endAdornment}</div>
                </>
              )
            }}
          />
        </div>
      )}
    />
  )
}

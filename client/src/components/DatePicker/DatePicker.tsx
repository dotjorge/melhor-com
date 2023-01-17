import { InputHTMLAttributes, useState, MouseEvent } from 'react'
import { FC } from 'types'
import { Controller } from 'react-hook-form'
import { IInputProps } from '../Input/Input.types'
import { DatePicker as Picker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import { TextField } from '../TextField/TextField'
import Styled from './DatePicker.styles'
import { Input } from 'components/Input/Input'

type IDatePicker = {
  name: string
  control: any
} & IInputProps

type DefaultInputProps = InputHTMLAttributes<HTMLInputElement>

export const DatePicker: FC<IDatePicker & DefaultInputProps> = props => {
  const { name, label, control, placeholder, error, ...defaultInputProps } =
    props
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const inputFormat = 'DD/MM/YYYY'

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div>
          <Picker
            label={label}
            inputFormat={inputFormat}
            value={field.value}
            onChange={field.onChange}
            PopperProps={{
              placement: 'bottom-end',
              anchorEl: anchorEl
            }}
            renderInput={({ inputProps, InputProps, ...rest }) => {
              return (
                <Styled.InputContainer>
                  <TextField
                    name={name}
                    onChange={e => {
                      const value = e.target.value
                      inputProps?.onChange?.(e)

                      if (value.length > 10) {
                        field.onChange(new Date(value))
                      }
                    }}
                    value={inputProps?.value}
                    label={label}
                    placeholder={placeholder}
                    error={error}
                    inputProps={{
                      maxLength: inputFormat.length
                    }}
                    // {...defaultInputProps}
                  />
                  <Styled.CalendarIcon
                    onClick={event => setAnchorEl(event.currentTarget)}
                  >
                    {InputProps?.endAdornment}
                  </Styled.CalendarIcon>
                </Styled.InputContainer>
              )
            }}
          />
        </div>
      )}
    />
  )
}

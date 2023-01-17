import { InputHTMLAttributes, useState } from 'react'
import { FC } from 'types'
import { Controller } from 'react-hook-form'
import { IInputProps } from '../Input/Input.types'
import {
  MenuItem,
  Select as MuiSelect,
  Autocomplete
  // TextField
} from '@mui/material'

import { TextField } from '../TextField/TextField'

type ISelect = {
  name: string
  control: any
} & IInputProps

type DefaultInputProps = InputHTMLAttributes<HTMLInputElement>

export const Select: FC<ISelect & DefaultInputProps> = props => {
  const { name, label, control, placeholder, error, ...defaultInputProps } =
    props

  const [inputText, setInputText] = useState('')

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div>
          <Autocomplete
            options={options.map(option => option)}
            inputValue={inputText}
            defaultValue={options.find(option => option.value === field.value)}
            onInputChange={(_, value, reason) => {
              const currentOption = options.find(
                option => option.title === value
              )

              const currentValue = options.find(
                option => option.value === field.value
              )

              if (currentOption) {
                field.onChange(currentOption.value)
              } else {
                field.onChange('')
              }

              setInputText(value)

              if (currentValue) {
                setInputText(currentValue.title)
              }
            }}
            getOptionLabel={option => option.title}
            renderInput={params => {
              const { inputProps, ...rest } = params

              return (
                <TextField
                  {...rest}
                  label={label}
                  name={name}
                  error={error}
                  placeholder={placeholder}
                  inputProps={{ ...inputProps, value: inputText }}
                />
              )
            }}
            sx={{
              '& .MuiInput-root': {
                padding: '0 15px',
                '& .MuiInputBase-input': {
                  padding: 0
                }
              }
            }}
            // freeSolo
          />
        </div>
      )}
    />
  )
}

export const options = [
  { title: 'Preto', value: 'BLACK' },
  { title: 'Branco', value: 'WHITE' },
  { title: 'Ouro', value: 'GOLD' },
  { title: 'Rosa', value: 'PINK' }
] as const

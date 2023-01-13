import Styled from './TextField.styles'
import { TextFieldProps } from '@mui/material'
import { forwardRef } from 'react'
import { Ref } from 'components/Input/Input.types'
import StyledInput from 'components/Input/Input.styles'
import { Controller } from 'react-hook-form'

type ITextField = Omit<Partial<TextFieldProps>, 'error'> & {
  control?: any
  error?: any
}

export const TextField = forwardRef((props: ITextField, ref: Ref) => {
  const { name, control, error, ...textFieldProps } = props
  const errorMessage = error?.[name as string]?.message
  const isError = errorMessage

  console.log('#textfield', { error, name, errorMessage })

  if (!control) {
    return (
      <div>
        <Styled.TextField
          ref={ref}
          name={name}
          error={isError}
          required={false}
          {...textFieldProps}
        />
        <StyledInput.Error>{errorMessage}</StyledInput.Error>
      </div>
    )
  }

  return (
    <Controller
      name={name as string}
      control={control}
      render={({ field }) => (
        <div>
          <Styled.TextField
            {...textFieldProps}
            {...field}
            error={isError}
            ref={ref}
          />
          <StyledInput.Error>{errorMessage}</StyledInput.Error>
        </div>
      )}
    />
  )
})

// export const TextField = forwardRef((props, ref: Ref) => {
//   const { error, ...textFieldProps } = props

//   return (
//     <>
//       <Styled.TextField {...textFieldProps} />
//       <div>{error?.[textFieldProps.label as string]?.message}</div>
//     </>
//   )
// })

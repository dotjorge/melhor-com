import { TextFieldProps } from '@mui/material'
import {
  Control,
  Controller,
  RegisterOptions,
  useFormContext
} from 'react-hook-form'
import { TextField } from 'components'
import CurrencyFormat from 'react-currency-format'
import Styled from 'components/TextField/TextField.styles'
import StyledInput from 'components/Input/Input.styles'

type IProps = {
  name: string
  rules?: RegisterOptions
  control?: Control<any, any> | undefined
}

type Props = IProps & TextFieldProps

export const CurrencyInput = (props: Props) => {
  const { name, rules, control, label, ...other } = props
  // const { control } = useFormContext()

  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <CurrencyFormat
            prefix={'R$'}
            allowNegative={false}
            thousandSeparator={true}
            decimalSeparator={'.'}
            decimalScale={2}
            fixedDecimalScale={true}
            onChange={field.onChange}
            value={field.value}
            label={label}
            customInput={CustomInput}
          />
          <StyledInput.Error>{error?.message}</StyledInput.Error>
        </div>
      )}
    />
  )
}

const CustomInput = (props: TextFieldProps) => {
  const { ref, name, ...rest } = props

  return (
    <Styled.TextField
      ref={props.ref}
      name={props.name}
      required={false}
      {...rest}
    />
  )
}

import { alpha, styled } from '@mui/material/styles'
// import InputBase from '@mui/material/InputBase'
import { TextField as DefaultTextField, TextFieldProps } from '@mui/material/'

import { staticColors, staticRadius } from 'theme'

const TextField = styled((props: TextFieldProps) => {
  return (
    <DefaultTextField
      variant="standard"
      // InputProps={{ disableUnderline: true }}
      {...props}
      InputLabelProps={{ shrink: true }}
    />
  )
})(({ theme }) => ({
  '&': {
    width: '100%',
    maxWidth: '500px'
  },
  '& label': {
    position: 'relative',
    transform: 'none',
    fontSize: '14px',
    color: staticColors.black,
    fontWeight: '500'
  },
  '& label.Mui-focused': {
    transform: 'none'
  },
  '& .MuiInput-root': {
    marginTop: '4px',
    overflow: 'hidden',
    borderRadius: staticRadius[5],
    border: '1px solid gray',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50px',
    borderColor: staticColors.black,
    '& .MuiInput-input': {
      height: '100%',
      padding: '0 15px',
      '&::placeholder': {
        color: staticColors.black
      }
    },
    '&:hover': {
      // backgroundColor: '#e8e8e8'
      borderColor: staticColors.primary
    },
    '&:before': {
      display: 'none'
    },
    '&:after': {
      display: 'none'
    },
    '&.Mui-focused': {
      backgroundColor: staticColors.secondary,
      borderColor: staticColors.primary
    }
  },
  '.MuiAutocomplete-endAdornment': {
    marginRight: '15px'
  }
}))

export default { TextField }

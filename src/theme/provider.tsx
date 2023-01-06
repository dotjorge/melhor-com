import { ThemeProvider } from 'styled-components'
import { FC } from 'types'
import { theme } from './'

export const CustomThemeProvider: FC<{}> = props => {
  const { children } = props

  return <ThemeProvider theme={{ ...theme }}>{children}</ThemeProvider>
}

import { colors as themeColors } from './colors'
import { radius as themeRadiuses } from './radius'
import { getThemeColors } from './utils/getColors'
import { getThemeRadiuses } from './utils/getRadiuses'

// Forwarded to styled-components ThemeProvider
export const theme = {
  colors: themeColors,
  radius: themeRadiuses
}

// ${props=>props.theme.colors.primary} => ${colors.primary}
export const colors = getThemeColors()
// ${props=>props.theme.radius.5} => ${radius.5}
export const radius = getThemeRadiuses()

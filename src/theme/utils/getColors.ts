import { DefaultTheme } from 'styled-components'
import { colors as themeColors } from 'theme/colors'

type AvaiableColors = keyof DefaultTheme['colors']

export const getColor = (color: AvaiableColors) => {
  return ({ theme }: { theme: DefaultTheme }) => {
    return theme?.colors?.[color]
  }
}

export const getThemeColors = () => {
  let colors = Object.keys(themeColors) as Array<keyof typeof themeColors>
  let obj = {}

  colors.forEach(key => {
    obj = { ...obj, [key]: getColor(key) }
  })

  return obj as typeof themeColors
}

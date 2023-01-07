import { DefaultTheme } from 'styled-components'
import { radius } from 'theme/radius'

type AvaiableRadiuses = keyof DefaultTheme['radius']

export const getRadius = (radius: AvaiableRadiuses) => {
  return ({ theme }: { theme: DefaultTheme }) => {
    return theme?.radius?.[radius]
  }
}

export const getThemeRadiuses = () => {
  let radiuses = Object.keys(radius) as Array<keyof typeof radius>
  let obj = {}

  radiuses.forEach(key => {
    obj = { ...obj, [key]: getRadius(key) }
  })

  return obj as typeof radius
}

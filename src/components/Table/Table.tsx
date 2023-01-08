import React, { ButtonHTMLAttributes } from 'react'
import { Fragment, ReactNode } from 'react'
import { FC } from 'types'
import Styled from './Table.styles'

interface ITable {
  title: string
  button: JSX.Element
  items: Item[]
  renderButtons?: ({ Button, id, index }: RenderButton) => JSX.Element
  replaceColumnTitles?: string[]
}

interface Item {
  id: string
  [key: string]: string
}

// Move them later
interface RenderButton {
  Button: FC<DefaultButtonProps>
  id: string
  index: number
}

type DefaultButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export const Table: FC<ITable> = ({
  title,
  button,
  items,
  renderButtons,
  replaceColumnTitles
}) => {
  const Button: RenderButton['Button'] = ({ children, ...rest }) => {
    return (
      <td className="button-column">
        <button {...rest}>{children}</button>
      </td>
    )
  }

  const titles = Object.keys(items[0]).map(key => key)

  const idIndex = titles.findIndex(title => title === 'id')

  const isId = (index: number) => {
    return idIndex === index
  }

  const columns = items.map(item => {
    return Object.values(item).map(value => value as string)
  })

  return (
    <Styled.Table>
      <Styled.Header>
        <h2>{title}</h2>
        {button}
      </Styled.Header>
      <table>
        <thead>
          <tr>
            {titles.map((title, index) => {
              if (!isId(index)) {
                return (
                  <Fragment key={index}>
                    <th>{title}</th>
                  </Fragment>
                )
              }
            })}
            {/* Space */}
            <th></th>
            {/* EDIT/DELETE */}
            <th></th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {columns.map((row, index) => {
            return (
              <tr key={index}>
                {row.map((value, index) => {
                  if (!isId(index)) {
                    return <td>{value}</td>
                  }
                })}
                {/* Space */}
                <td></td>
                {renderButtons &&
                  renderButtons({ Button, id: row[idIndex], index })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </Styled.Table>
  )
}
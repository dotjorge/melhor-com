import { ButtonHTMLAttributes, memo, useMemo } from 'react'
import { Fragment } from 'react'
import { FC } from 'types'
import Styled from './Table.styles'

interface ITable {
  title: string
  button: JSX.Element
  items: Item[] | undefined
  renderButtons?: ({ Button, id, index }: RenderButton) => JSX.Element
  replaceColumnTitles?: string[]
}

interface Item {
  id: number
  [key: string]: unknown
}

// Move them later
interface RenderButton {
  Button: FC<DefaultButtonProps>
  id: string
  index: number
}

type DefaultButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export const TableComponent: FC<ITable> = ({
  title,
  button,
  items = [],
  renderButtons,
  replaceColumnTitles
}) => {
  const Button: RenderButton['Button'] = memo(({ children, ...rest }) => {
    return (
      <td className="button-column">
        <button {...rest}>{children}</button>
      </td>
    )
  })

  const hasNoItems = items.length === 0

  // const titles = useMemo(() => {
  //   if (hasNoItems) return []
  //   return Object.keys(items[0]).map(key => key)
  // }, [items])

  const getTitles = () => {
    if (hasNoItems) return []
    return Object.keys(items[0]).map(key => key)
  }

  const titles = getTitles()

  const idIndex = titles.findIndex(title => title === 'id')

  const isId = (index: number) => {
    return idIndex === index
  }

  // const columns = useMemo(() => {
  //   if (hasNoItems) return []
  //   return items.map(item => {
  //     return Object.values(item).map(value => value as string)
  //   })
  // }, [items])

  const getColumns = () => {
    if (hasNoItems) return []
    return items.map(item => {
      return Object.values(item).map(value => value as string)
    })
  }

  const columns = getColumns()

  return (
    <Styled.Table>
      <Styled.Header>
        <h2>{title}</h2>
        {button}
      </Styled.Header>

      {hasNoItems ? (
        <Styled.NoItems>Nenhum item encontrado</Styled.NoItems>
      ) : (
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
                      return <td key={index}>{value}</td>
                    }
                  })}
                  {/* Space */}
                  <td></td>
                  {renderButtons &&
                    renderButtons({
                      Button,
                      // Transforma o id: number do Prisma em string
                      id: row[idIndex].toString(),
                      index
                    })}
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </Styled.Table>
  )
}

export const Table = memo(TableComponent)

import styled, { css } from 'styled-components'
import { colors, radius } from 'theme'

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  position: sticky;
  left: 0;
  padding: 0 10px;

  h2 {
    margin: 0;
    font-size: 24px;
    font-weight: 500;
  }
`

const Table = styled.div`
  width: 100%;
  max-width: 864px;
  margin: 50px auto;

  .table-container {
    padding: 10px;
    width: 100%;
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    border-radius: ${radius[5]};
    border-style: hidden;
    box-shadow: 0 0 0 1px ${colors.black};
    /* table-layout: fixed; */
    --item-padding: 15px 30px;
    --buttons-margin: 100px;

    thead {
      // Row
      tr {
        border: 1px solid ${colors.black};
        // Row Item
        th {
          text-align: left;
          padding: var(--item-padding);
          font-size: 17px;
        }
      }
    }

    tbody {
      // Row
      tr {
        border: 1px solid ${colors.black};
        // Row Item
        td {
          padding: var(--item-padding);
          font-size: 17px;

          &.button-column {
            button {
              cursor: pointer;
              border: none;
              background: none;
              padding: 5px;
              border-radius: ${radius[5]};
              outline: 2px solid transparent;
              outline-offset: 6px;

              &:hover {
                background: ${colors.secondary};
              }

              &:active {
                background: ${colors.primary};

                img {
                  filter: invert();
                }
              }

              &:focus {
                outline-color: ${colors.primary};
                outline-offset: 2px;
              }
            }
          }

          &.button-column:not(:last-of-type) {
            padding-left: 0;
            padding-right: 0;
          }

          &.button-column:last-of-type {
            padding-left: 0;
          }

          // Space
          &:empty {
            width: var(--buttons-margin);
          }
        }
      }
    }
  }
`

const NoItems = styled.div`
  color: ${colors.primary};
  font-size: 20px;
`

export default { Table, Header, NoItems }

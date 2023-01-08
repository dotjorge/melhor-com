import { AddOrEditPhone } from 'screens'

export const AddPhone = () => {
  const MOCK = {
    id: '1',
    model: 'Galaxy 5',
    brand: 'Sansung',
    price: '900',
    date: '26/04/2019',
    endDate: '12/12/2022',
    color: 'BLACK',
    code: '#12212'
  }

  return <AddOrEditPhone />
}

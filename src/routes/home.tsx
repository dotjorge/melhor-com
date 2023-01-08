import { Button, Table, Link } from 'components'
import EditIcon from 'icons/edit-24px.svg'
import DeleteIcon from 'icons/delete-24px.svg'

export const Home = () => {
  const MOCK = [
    {
      id: '1',
      model: 'Galaxy 5',
      brand: 'Sansung',
      price: '900',
      date: '26/04/2019',
      endDate: '12/12/2022',
      color: 'BLACK',
      code: '#12212'
    },
    {
      id: '2',
      model: 'Galaxy 5',
      brand: 'Sansung',
      price: '900',
      date: '26/04/2019',
      endDate: '12/12/2022',
      color: 'BLACK',
      code: '#12212'
    },
    {
      id: '3',
      model: 'Galaxy 5',
      brand: 'Sansung',
      price: '900',
      date: '26/04/2019',
      endDate: '12/12/2022',
      color: 'BLACK',
      code: '#12212'
    }
  ]

  return (
    <Table
      title="Produtos"
      button={<Link to="/adicionar" text="Adicionar" iconLeft={<>+</>} />}
      items={MOCK.map(item => ({
        id: item.id,
        Código: item.code,
        Modelo: item.model,
        Preço: item.price,
        Marca: item.brand,
        Cor: item.color
      }))}
      renderButtons={({ Button, id }) => {
        return (
          <>
            <Button onClick={() => console.log('id:', id)}>
              <img src={EditIcon} alt="Editar" />
            </Button>
            <Button>
              <img src={DeleteIcon} alt="Deletar" />
            </Button>
          </>
        )
      }}
    />
  )
}

import { Table, Link } from 'components'
import EditIcon from 'icons/edit-24px.svg'
import DeleteIcon from 'icons/delete-24px.svg'
import { trpc } from 'trpc/client'
import { memo } from 'react'

export const HomeComponent = () => {
  const phones = trpc.getPhones.useQuery()

  if (phones.isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Table
      title="Produtos"
      button={<Link to="/adicionar" text="Adicionar" iconLeft={<>+</>} />}
      items={phones?.data?.map(item => ({
        id: item.code,
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

export const Home = memo(HomeComponent)

import { Table, Link } from 'components'
import EditIcon from 'icons/edit-24px.svg'
import DeleteIcon from 'icons/delete-24px.svg'
import { trpc } from 'trpc/client'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
  const navigate = useNavigate()
  const phones = trpc.getPhones.useQuery()
  const deletePhone = trpc.deletePhoneById.useMutation()
  const utils = trpc.useContext()

  if (phones.isLoading) {
    return <div></div>
  }

  return (
    <>
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
              <Button onClick={() => navigate(`/editar/${id}`)}>
                <img src={EditIcon} alt="Editar" />
              </Button>

              <Button onClick={() => deletePhone.mutate(id)}>
                <img src={DeleteIcon} alt="Deletar" />
              </Button>
            </>
          )
        }}
      />
    </>
  )
}

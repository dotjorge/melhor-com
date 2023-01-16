import { Table, Link } from 'components'
import EditIcon from 'icons/edit-24px.svg'
import { ReactComponent as CellphoneIcon } from 'icons/cellphone.svg'
import DeleteIcon from 'icons/delete-24px.svg'
import { trpc } from 'trpc/client'
import { useNavigate } from 'react-router-dom'
import format from 'utils/format'

export const Home = () => {
  const navigate = useNavigate()
  const phones = trpc.getPhones.useQuery()
  const deletePhone = trpc.deletePhoneById.useMutation()
  // const utils = trpc.useContext()

  if (phones.isLoading) {
    return <div></div>
  }

  return (
    <>
      <Table
        title="Produtos"
        button={
          <Link
            to="/adicionar"
            text="Adicionar"
            iconLeft={
              <>
                <b>+</b>
                <CellphoneIcon />
              </>
            }
          />
        }
        items={phones?.data?.map(item => ({
          id: item.code,
          Código: item.code,
          Modelo: item.model,
          Preço: format.toCurrency(Number(item.price)),
          Marca: item.brand,
          Cor: item.color
        }))}
        renderButtons={({ Button, id }) => {
          return (
            <>
              <Button onClick={() => navigate(`/editar/${id}`)}>
                <img src={EditIcon} alt="Editar" />
              </Button>

              <Button
                onClick={() => {
                  console.log('#id', id, typeof id)
                  deletePhone.mutate(id)
                }}
              >
                <img src={DeleteIcon} alt="Deletar" />
              </Button>
            </>
          )
        }}
      />
    </>
  )
}

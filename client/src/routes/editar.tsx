import { useParams } from 'react-router-dom'
import { AddOrEditPhone } from 'screens'
import { trpc } from 'trpc/client'
import { useNavigate } from 'react-router-dom'
import { dayJsAdpt } from 'dates'

export const EditPhone = () => {
  const { id } = useParams()

  // const navigate = useNavigate()
  const currentPhone = trpc.getPhoneById.useQuery(id)
  const editPhone = trpc.editPhoneById.useMutation({
    onMutate: () => {
      // Volta pra home sem atualizar a lista de celulares,
      // o React deve estar fazendo algum cache nesse "navigate"
      // return navigate('/')
    }
  })

  // if (currentPhone.isLoading) {
  //   return <div>Loading...</div>
  // }

  if (currentPhone.isError) {
    return <div>Erro ao carregar celular</div>
  }

  return (
    <AddOrEditPhone
      phone={currentPhone.data}
      onSubmit={data => {
        editPhone.mutate({
          code: currentPhone.data!.code,
          brand: data.brand,
          color: data.color,
          startDate: dayJsAdpt.date(data.startDate).toISOString(),
          endDate: dayJsAdpt.date(data.endDate).toDate(),
          model: data.model,
          price: data.price
        })
      }}
    />
  )
}

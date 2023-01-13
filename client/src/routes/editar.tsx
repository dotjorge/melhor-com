import { useParams } from 'react-router-dom'
import { AddOrEditPhone } from 'screens'
import { trpc } from 'trpc/client'

export const EditPhone = () => {
  const { id } = useParams()

  const phones = trpc.getPhoneById.useQuery(id)

  if (phones.isLoading) {
    return <div>Loading...</div>
  }

  return <AddOrEditPhone phone={phones.data} />
}

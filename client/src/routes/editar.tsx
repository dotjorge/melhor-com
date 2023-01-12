import { useParams } from 'react-router-dom'
import { AddOrEditPhone } from 'screens'

export const EditPhone = () => {
  const params = useParams()
  console.log('#params', params)

  return <div>Id:</div>

  return <AddOrEditPhone />
}

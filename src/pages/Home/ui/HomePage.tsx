import { useFormsStore } from '@/entities/Forms'
import { NoForms } from './NoForms'

export const HomePage = () => {
  const { orderedForms } = useFormsStore()

  return <>{orderedForms().length ? <h1>Main Page</h1> : <NoForms />}</>
}

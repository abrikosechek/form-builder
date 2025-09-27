import styles from './HomePage.module.scss'
import { useFormsStore } from '@/entities/Forms'
import { NoForms } from './NoForms'

export const HomePage = () => {
  const { orderedForms } = useFormsStore()

  return (
    <div className={styles['home-page']}>
      {orderedForms().length ? <h1>Main Page</h1> : <NoForms />}
    </div>
  )
}

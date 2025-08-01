import './styles/main.scss'
import styles from './App.module.scss'
import { Button } from '@/shared/ui'
import { PlusIcon } from '@radix-ui/react-icons'
import { NoForms } from '@/shared/features/NoForms'

const App = () => {
  return (
    <div className={styles.layout}>
      <header className={`${styles.header} container`}>
        <p className={styles.header__logo}>FormBuilder</p>
      </header>

      <div className={`${styles.aside} container`}>
        <div className={styles.aside__header}>
          <p className={styles.aside__title}>Your forms</p>

          <Button>
            <PlusIcon />
          </Button>
        </div>
        <div className={styles.aside__list}></div>
      </div>

      <main className={`${styles.main} container`}>
        <NoForms />
      </main>
    </div>
  )
}

export default App

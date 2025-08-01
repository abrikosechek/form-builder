import './styles/main.scss'
import styles from './App.module.scss'
import { Button } from '@/shared/ui'
import { PlusIcon } from '@radix-ui/react-icons'

const App = () => {
  return (
    <div className={styles.layout}>
      <header className={`${styles.header} container`}>
        <p className={styles.header__logo}>FormBuilder</p>
      </header>

      <div className={`${styles.aside} container`}>
      </div>

      <main className={`${styles.main} container`}>
        <Button>
          <PlusIcon />
          <p>create new</p>
        </Button>
      </main>
    </div>
  )
}

export default App

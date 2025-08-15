import { Link } from 'react-router'
import styles from './Header.module.scss'

export const Header = () => {
  return (
    <header className={`${styles.header} container`}>
      <Link className={styles.header__logo} to="/">
        FormBuilder
      </Link>
    </header>
  )
}

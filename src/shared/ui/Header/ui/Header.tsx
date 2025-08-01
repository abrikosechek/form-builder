import styles from './Header.module.scss'

export const Header = () => {
  return (
    <header className={`${styles.header} container`}>
      <p className={styles.header__logo}>FormBuilder</p>
    </header>
  )
}

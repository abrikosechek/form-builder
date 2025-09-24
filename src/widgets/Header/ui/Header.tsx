import styles from './Header.module.scss'
import { Link } from 'react-router'
import { useWindowSize } from 'usehooks-ts'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { breakpoints } from '@/shared/consts'
import { useModalStore } from '@/shared/model'
import { FormsListModal } from '@/entities/Forms'

export const Header = () => {
  const { width = 0 } = useWindowSize()

  const { setModal } = useModalStore()

  return (
    <header className={`${styles.header} container`}>
      <Link className={styles.header__logo} to="/">
        FormBuilder
      </Link>

      {width <= breakpoints.md && (
        <button
          className={styles['header-menu-button']}
          onClick={() =>
            setModal({
              el: <FormsListModal />,
            })
          }
        >
          <p className={styles['header-menu-button__text']}>forms</p>
          <HamburgerMenuIcon className={styles['header-menu-button__icon']} />
        </button>
      )}
    </header>
  )
}

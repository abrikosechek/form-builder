import styles from './Code.module.scss'
import { CodeTab } from '../CodeTab'
import { useMemo, useState } from 'react'
import { ClipboardIcon } from '@radix-ui/react-icons'

type Tab = {
  name: string
  text: string
}

type Props = {
  tabs: Tab[]
  initTab?: string
}

export const Code = ({ tabs, initTab }: Props) => {
  const [selectedTabName, setSelectedTabName] = useState<string>(
    initTab || tabs[0]?.name || ''
  )
  const selectedTab = useMemo(() => {
    return tabs.find((tab) => tab.name === selectedTabName)
  }, [tabs, selectedTabName])

  const copyText = () => {
    if (!selectedTab) return

    navigator.clipboard.writeText(selectedTab.text)
  }

  return (
    <div className={styles.code}>
      {/* header (tabs) */}
      <div className={styles.code__header}>
        {tabs.map((tab) => (
          <CodeTab
            active={selectedTabName === tab.name}
            onClick={() => setSelectedTabName(tab.name)}
          >
            {tab.name}
          </CodeTab>
        ))}
      </div>

      <div className={styles.code__content}>
        {/* text */}
        <div className={styles.code__textBlock}>
          <pre className={styles.code__text}>
            <code>{selectedTab?.text || ''}</code>
          </pre>
        </div>

        {/* copy button */}
        <button className={styles['copy-button']} onClick={() => copyText()}>
          <ClipboardIcon className={styles['copy-button__icon']} />
        </button>
      </div>
    </div>
  )
}

import logo from '../../logo.svg'
import { Counter } from '../../features/counter/Counter'
import { useTranslation } from 'react-i18next'

export function AboutPage() {
  const { t } = useTranslation('translation')
  return (
    <div id="page-about">
      <h1>{t('pages.about.title')}</h1>
      <div style={{
        margin: 10, 
        padding: 10,
        backgroundColor: 'var(--bg-color-substrate)', 
        backdropFilter: 'blur(10px)',
        border: '1px solid var(--color-substrate)',
        borderRadius: 5
      }}>
        <img src={logo} className="App-logo" alt="logo" width={64} />
        <p>
          This is a custom `Kyber API` implementation with an additional functionality such as live updates, 
          configuration tab, advanced search and filtering. Work in progress
        </p>
        {/* <Counter />*/}
      </div>
    </div>
  )
}

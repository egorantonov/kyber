import logo from '../../logo.svg'
import { Counter } from '../../features/counter/Counter'
import { useTranslation } from 'react-i18next'

export function AboutPage() {
  const { t, i18n } = useTranslation('translation')
  return (
    <div id="page-about">
      <h1>{t('pages.about.title')}</h1>
      <div>
        <img src={logo} className="App-logo" alt="logo" width={64} />
        <p>
          This is a custom `Kyber API` implementation with an additional functionality such as live updates, 
          configuration tab, advanced search and filtering. Work still is in progress
        </p>
        {/* <Counter />*/}
      </div>
    </div>
  )
}

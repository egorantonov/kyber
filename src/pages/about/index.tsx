import logo from '../../logo.svg'
import { Counter } from '../../features/counter/Counter'
import { useTranslation } from 'react-i18next'

export function About() {
  const { t, i18n } = useTranslation('translation')
  return (
    <>
      <h1>{t('pages.about.title')}</h1>
      <div>
        <img src={logo} className="App-logo" alt="logo" />
        {/* <Counter />*/}
      </div>
    </>
  )
}

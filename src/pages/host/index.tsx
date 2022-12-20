import { useTranslation } from 'react-i18next'
import { Create } from '../../features/Kyber/Host'

export function Host() {
  const { t, i18n } = useTranslation('translation')
  return (
    <div id="page-host">
      <h1>{t('pages.host.title')}</h1>
      <Create />
    </div>
  )
}

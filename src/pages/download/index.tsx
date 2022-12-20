import { useTranslation } from 'react-i18next'
import KyberServers from '../../features/Kyber/Servers' 

export function Download() {
  const { t, i18n } = useTranslation('translation')
  return (
    <div id='page-download'>
      <h1>{t('pages.download.title')}</h1>
      <KyberServers />
    </div>
  )
}

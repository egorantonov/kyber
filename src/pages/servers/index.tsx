import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import KyberServers from '../../features/Kyber/Servers' 

export function Servers() {
  const { t, i18n } = useTranslation('translation')
  return (
    <Fragment>
      <h1>{t('pages.servers.title')}</h1>
      <KyberServers />
    </Fragment>
  )
}

import { KyberServers } from '../../features/Kyber/Servers/Servers'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { HOST } from '../../constants'

export function ServersPage() {
  const { t } = useTranslation()
  
  return (
    <div id="page-servers">
      <Helmet>
        <title>{t('pages.servers.title')}</title>
        <link rel="canonical" href={HOST} />
      </Helmet>
      <KyberServers />
    </div>
  )
}

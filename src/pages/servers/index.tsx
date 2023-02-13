import { KyberServers } from '../../features/Kyber/Servers/Servers'
import { useTranslation } from 'react-i18next'
import { HelmetWrapper } from '../../components/HelmetWrapper'

export function ServersPage() {
  const { t } = useTranslation()
  
  return (
    <div id="page-servers">
      <HelmetWrapper path='/' title={t('pages.servers.title')} />
      <KyberServers />
    </div>
  )
}

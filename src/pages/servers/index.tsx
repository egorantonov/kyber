import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from '../../components/Modal/Modal'
import { KyberServers } from '../../features/Kyber/Servers/Servers'

export function ServersPage() {
  const { t, i18n } = useTranslation('translation')
  return (
    <div id="page-servers">
      <KyberServers />
    </div>
  )
}

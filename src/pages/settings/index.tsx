import { Theme } from '../../components/Theme'
import { Debug } from '../../components/Debug'
import { KyberConfig } from '../../features/Kyber/Configuration'
import { useAppSelector } from '../../app/hooks'
import { selectProxies } from '../../features/Kyber/Servers/serversSlice'
import { useTranslation } from 'react-i18next'
import { HOST } from '../../constants'
import { HelmetWrapper } from '../../components/HelmetWrapper'

export function SettingsPage() {
  const { t } = useTranslation()
  const proxies = useAppSelector(selectProxies)

  return (
    <div id="page-settings">
      <HelmetWrapper path='/settings' title={t('pages.settings.title')} />
      <div className="bd-filter-blur-10 block-blur">
        <Theme />
      </div>
      <div className="bd-filter-blur-10 block-blur">
        <KyberConfig proxies={proxies} />
      </div>
      {window?.location?.origin !== HOST && 
      <div className="bd-filter-blur-10 block-blur">
        <Debug />
      </div>}
    </div>
  )
}

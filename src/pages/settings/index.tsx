import { Theme } from '../../components/Theme'
import { Debug } from '../../components/Debug'
import { KyberConfig } from '../../features/Kyber/Configuration'
import { useAppSelector } from '../../app/hooks'
import { selectProxies } from '../../features/Kyber/Servers/proxiesSlice'
import { useTranslation } from 'react-i18next'
import { HOST_PRODUCTION } from '../../constants'
import { HelmetWrapper } from '../../components/HelmetWrapper'
import { Blur } from '../../components/Blur'
import { blurOrBackground } from '../../utils/ui'

export function SettingsPage() {
  const { t } = useTranslation()
  const proxies = useAppSelector(selectProxies)
  const className = `block-rounded ${blurOrBackground(10)}`

  return (
    <div id="page-settings">
      <HelmetWrapper path='/settings' title={t('pages.settings.title')} />
      <div className={className}>
        <Theme />
      </div>
      <div className={className}>
        <Blur />
      </div>
      <div className={className}>
        <KyberConfig proxies={proxies} />
      </div>
      {window?.location?.origin !== HOST_PRODUCTION && 
      <div className={className}>
        <Debug />
      </div>}
    </div>
  )
}

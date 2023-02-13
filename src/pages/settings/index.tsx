import { Theme } from '../../components/Theme'
import { Debug } from '../../components/Debug'
import { KyberConfig } from '../../features/Kyber/Configuration'
import { useAppSelector } from '../../app/hooks'
import { selectProxies } from '../../features/Kyber/Servers/serversSlice'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { HOST } from '../../constants'

export function SettingsPage() {
  const { t } = useTranslation()
  const proxies = useAppSelector(selectProxies)

  return (
    <div id="page-settings">
      <Helmet>
        <title>{t('pages.settings.title')}</title>
        <link rel="canonical" href={`${HOST}/settings`} />
      </Helmet>
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

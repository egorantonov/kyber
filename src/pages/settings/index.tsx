import { Theme } from '../../components/Theme'
import { Debug } from '../../components/Debug'
import { KyberConfig } from '../../features/Kyber/Configuration'
import { useAppSelector } from '../../app/hooks'
import { selectProxies } from '../../features/Kyber/Servers/serversSlice'

export function SettingsPage() {
  const proxies = useAppSelector(selectProxies)

  return (
    <div id="page-settings">
      <div className="bd-filter-blur-10 block-blur">
        <Theme />
      </div>
      <div className="bd-filter-blur-10 block-blur">
        <KyberConfig proxies={proxies} />
      </div>
      {window?.location?.origin !== 'https://kyber.pages.dev' && 
      <div className="bd-filter-blur-10 block-blur">
        <Debug />
      </div>}
    </div>
  )
}

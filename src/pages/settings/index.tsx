import { Theme } from '../../components/Theme'
import { Debug } from '../../components/Debug'
import { KyberConfig } from '../../features/Kyber/Configuration'

export function SettingsPage() {
  return (
    <div id="page-settings">
      <div className="bd-filter-blur-10 block-blur">
        <Theme />
      </div>
      <div className="bd-filter-blur-10 block-blur">
        <KyberConfig />
      </div>
      {window?.location?.origin !== 'https://kyber.pages.dev/' && 
      <div className="bd-filter-blur-10 block-blur">
        <Debug />
      </div>}
    </div>
  )
}

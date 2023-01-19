import { useTranslation } from 'react-i18next'
import { Theme } from '../../components/Theme'
import { Debug } from '../../components/Debug'
import { KyberConfig } from '../../features/Kyber/Configuration'



export function SettingsPage() {
  const { t } = useTranslation('translation')

  return (
    <div id="page-settings">
      <div className="bd-filter-blur-10" style={{
        margin: 10, 
        padding: 10,
        backgroundColor: 'var(--bg-color-substrate)',
        border: '1px solid var(--color-substrate)',
        borderRadius: 5
      }}>
        <Theme />
      </div>
      <div className="bd-filter-blur-10" style={{
        margin: 10, 
        padding: 10,
        backgroundColor: 'var(--bg-color-substrate)', 
        border: '1px solid var(--color-substrate)',
        borderRadius: 5
      }}>
        <KyberConfig />
      </div>
      <div className="bd-filter-blur-10" style={{
        margin: 10, 
        padding: 10,
        backgroundColor: 'var(--bg-color-substrate)', 
        border: '1px solid var(--color-substrate)',
        borderRadius: 5
      }}>
        <Debug />
      </div>
    </div>
  )
}

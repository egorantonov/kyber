import { useTranslation } from 'react-i18next'
import { Theme } from '../../components/Theme'
import { Debug } from '../../components/Debug'
import { KyberConfig } from '../../features/Kyber/Configuration'



export function SettingsPage() {
  const { t, i18n } = useTranslation('translation')

  return (
    <div id="page-settings">
      <h1>{t('pages.settings.title')}</h1>
      <div style={{
        margin: 10, 
        padding: 10,
        backgroundColor: 'var(--bg-color-substrate)', 
        backdropFilter: 'blur(10px)',
        border: '1px solid var(--color-substrate)',
        borderRadius: 5
      }}>
        <Debug />
      </div>
      <div style={{
        margin: 10, 
        padding: 10,
        backgroundColor: 'var(--bg-color-substrate)', 
        backdropFilter: 'blur(10px)',
        border: '1px solid var(--color-substrate)',
        borderRadius: 5
      }}>
        <Theme />
      </div>
      <div style={{
        margin: 10, 
        padding: 10,
        backgroundColor: 'var(--bg-color-substrate)', 
        backdropFilter: 'blur(10px)',
        border: '1px solid var(--color-substrate)',
        borderRadius: 5
      }}>
        <KyberConfig />
      </div> 
    </div>
  )
}

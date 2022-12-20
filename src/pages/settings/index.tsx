import { useTranslation } from 'react-i18next'
import { Theme } from '../../components/Theme'
import { Debug } from '../../components/Debug'
import { KyberConfig } from '../../features/Kyber/Configuration'



export function Settings() {
  const { t, i18n } = useTranslation('translation')

  return (
    <div id="page-settings">
      <h1>{t('pages.settings.title')}</h1>
      <div style={{border: '1px solid #ccc', backdropFilter: 'blur(10px)'}}>
        <Debug />
      </div>
      <div style={{border: '1px solid #ccc', backdropFilter: 'blur(10px)'}}>
        <Theme />
      </div>
      <div style={{border: '1px solid #ccc', backdropFilter: 'blur(10px)'}}>
        <KyberConfig />
      </div> 
    </div>
  )
}

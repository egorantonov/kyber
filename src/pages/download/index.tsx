import { useTranslation } from 'react-i18next'
import KyberServers from '../../features/Kyber/Servers' 

export function DownloadPage() {
  const { t, i18n } = useTranslation('translation')
  return (
    <div id='page-download'>
      <h1>{t('pages.download.title')}</h1>
      <div style={{
        margin: 10, 
        padding: 10,
        backgroundColor: 'var(--bg-color-substrate)', 
        backdropFilter: 'blur(10px)',
        border: '1px solid var(--color-substrate)',
        borderRadius: 5
      }}>
        Download <a href='https://kyber.gg/static/client/KyberClient.exe' title='Kyber'>Kyber client</a> or visit <a href='https://kyber.gg/' target='_blank' rel='noreferrer'>an official site</a> to download from it.
      </div>
      {/* <KyberServers /> */}
    </div>
  )
}

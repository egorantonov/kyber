import { useTranslation } from 'react-i18next'
import ExternalLink from '../../components/ExternalLink'

export function DownloadPage() {
  const { t } = useTranslation('translation')
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
        Download <a href='https://kyber.gg/static/client/KyberClient.exe' title='Kyber'>Kyber client</a> or visit <ExternalLink href='https://kyber.gg/'>an official site</ExternalLink> to download from it.
      </div>
    </div>
  )
}

import { useTranslation } from 'react-i18next'
import { KYBER_API } from '../../api/endpoints'
import ExternalLink from '../../components/ExternalLink'

export function DownloadPage() {
  const { t } = useTranslation('translation')
  return (
    <div id='page-download'>
      <h1>{t('pages.download.title')}</h1>
      <div className="bd-filter-blur-10" style={{
        margin: 10, 
        padding: 10,
        backgroundColor: 'var(--bg-color-substrate)', 
        border: '1px solid var(--color-substrate)',
        borderRadius: 5
      }}>
        Download <a href={`${KYBER_API.hostName}/static/client/KyberClient.exe`} title='Kyber'>Kyber client</a> or visit <ExternalLink href={KYBER_API.hostName}>the official site</ExternalLink> to download from it.
      </div>
    </div>
  )
}

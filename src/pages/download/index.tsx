import { Trans, useTranslation } from 'react-i18next'
import { HelmetWrapper } from '../../components/HelmetWrapper'
import { InfoBlock } from '../../components/InfoBlock'
import { directDownload, visitKyber } from './data'

export function DownloadPage() {
  const { t } = useTranslation()
  
  return (
    <div id='page-download'>  
      <HelmetWrapper path='/download' title={t('pages.download.title')} />    
      <div id='page-download-infoblocks' className='flex f-row flex-wrap'>
        <InfoBlock {...directDownload}>          
          <p>
            <Trans i18nKey={`${directDownload.id}.body`}>
              Download Kyber client via <span className="highlight">direct link</span>
            </Trans>
          </p>
        </InfoBlock>
        <InfoBlock {...visitKyber} >
          <p>
            <Trans i18nKey={`${visitKyber.id}.body`}>
              Visit <span className="highlight">the official site</span><br/>to download from it
            </Trans>
          </p>
        </InfoBlock>
      </div>
    </div>
  )
}

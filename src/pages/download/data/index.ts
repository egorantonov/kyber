import { KYBER_API } from '../../../api/endpoints'
import { InfoBlockProps } from '../../../components/InfoBlock'

export const directDownload: InfoBlockProps = {
  id: 'directDownload',
  href: `${KYBER_API.hostName}/static/client/KyberClient.exe`,
  className: '',
  background: `linear-gradient(135deg, var(--bg-color), var(--bg-color-alpha), #fff0), url(${KYBER_API.hostName}/static/images/maps/S9_3-Scarif-Levels-MP-Scarif_02-Scarif_02.jpg)`
}

export const visitKyber: InfoBlockProps = {
  id: 'visitKyber',
  href: KYBER_API.hostName,
  className: '',
  background: 'var(--bg-img)'
}
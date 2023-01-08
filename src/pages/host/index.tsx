import { useTranslation } from 'react-i18next'
import { Host } from '../../features/Kyber/Host'

export function HostPage() {
  const { t, i18n } = useTranslation('translation')
  return (
    <div id="page-host">
      <Host />
    </div>
  )
}

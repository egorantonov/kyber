
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '../../app/hooks'
import { HelmetWrapper } from '../../components/HelmetWrapper'
import { Host } from '../../features/Kyber/Host'
import { selectProxies } from '../../features/Kyber/Servers/proxiesSlice'
import style from './hostpage.module.scss'

export function HostPage() {
  const { t } = useTranslation()
  const proxies = useAppSelector(selectProxies)

  return (
    <div id="page-host" className={style.host_page}>
      <HelmetWrapper path='/host' title={t('pages.host.title')} />
      <Host proxies={proxies} />
    </div>
  )
}

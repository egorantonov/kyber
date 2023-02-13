import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '../../app/hooks'
import { HOST } from '../../constants'
import { Host } from '../../features/Kyber/Host'
import { selectProxies } from '../../features/Kyber/Servers/serversSlice'
import style from './hostpage.module.scss'

export function HostPage() {
  const { t } = useTranslation()
  const proxies = useAppSelector(selectProxies)

  return (
    <div id="page-host" className={style.host_page}>      
      <Helmet>
        <title>{t('pages.host.title')}</title>
        <link rel="canonical" href={`${HOST}/host`} />
      </Helmet>
      <Host proxies={proxies} />
    </div>
  )
}

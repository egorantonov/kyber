import { useAppSelector } from '../../app/hooks'
import { Host } from '../../features/Kyber/Host'
import { selectProxies } from '../../features/Kyber/Servers/serversSlice'
import style from './hostpage.module.scss'

export function HostPage() {
  const proxies = useAppSelector(selectProxies)

  return (
    <div id="page-host" className={style.host_page}>
      <Host proxies={proxies} />
    </div>
  )
}

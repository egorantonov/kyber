import { Host } from '../../features/Kyber/Host'
import style from './hostpage.module.scss'

export function HostPage() {
  return (
    <div id="page-host" className={style.host_page}>
      <Host />
    </div>
  )
}

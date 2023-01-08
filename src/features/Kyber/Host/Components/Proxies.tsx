import { useTranslation } from 'react-i18next'
import { KyberProxy } from '../../../../api/models'
import style from './../host.module.scss'

interface ProxiesProps {
  proxies: KyberProxy[],
  proxyIp: string,
  setProxyIp: any
}

export function Proxies({ proxies, proxyIp, setProxyIp }: ProxiesProps) {

  const { t } = useTranslation('translation')

  return (
    <div className={`r start input-proxies ${style.line}`}>
      <label className="c s6 m6 l6" htmlFor="input-proxies">
        {t('features.host.form.proxy')}
      </label>
      <select className="c s5 m6 l6" id="input-proxies" name="input-proxies"
        value={proxyIp} onChange={(e) => setProxyIp(e.target.value)}>
        {proxies.map((p) => (
          <option key={p.ip} value={p?.ip ?? 'loading'}>{p.name}</option>
        ))}
      </select>
    </div>
  )
}
import { useTranslation } from 'react-i18next'
import { KyberProxy } from '../../../../api/models'

interface ProxiesProps {
  proxies: KyberProxy[],
  proxyIp: string,
  setProxyIp: any
}

export function Proxies({proxies, proxyIp, setProxyIp}: ProxiesProps) {

  const { t } = useTranslation('translation')
  
  return (
    <div className="r start input-proxies">
      <div className="c s5 m4 l2">
        <label htmlFor="input-proxies">{t('features.host.form.proxy')}: </label>
      </div>
      <div className="c s5 m4 l3">
        <img src={proxies.length === 0 ? '' : proxies.find(p => p.ip === proxyIp)?.flag} alt='proxy flag' width={24} />
        <select value={proxyIp} id="input-proxies" name="input-proxies" onChange={(e) => setProxyIp(e.target.value)}>
          {proxies.map((p) => (
            <option key={p.ip} value={p?.ip ?? 'loading'}>{p.name}</option>
          ))}
        </select>  
      </div>      
    </div>
  )
}
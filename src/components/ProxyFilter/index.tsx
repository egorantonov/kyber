import { KyberProxy } from '../../api/models'
import { BattlefrontMode } from '../../data/models'

const ALL = 'ALL'

interface ProxyFilterProps {
    id: string,
    label: string,
    value?: string,
    onProxiesChange: any,
    proxies: KyberProxy[]
}

const ProxyFilter = ({ id, label, value, onProxiesChange, proxies }: ProxyFilterProps) => {

  return (
    <>
      <div className="filter modes-wrapper">
        <label htmlFor="modes">{label}</label>
        <div>
          <select value={value} id={id} name={id} onChange={onProxiesChange}>
            <option key='empty' value=''>{ALL}</option>
            {proxies.map((p) => (
              <option key={p.ip} value={p.ip}>{p.name}</option>
            ))}
          </select>
        </div>
        <hr />
      </div>
    </>
  )
}

export default ProxyFilter
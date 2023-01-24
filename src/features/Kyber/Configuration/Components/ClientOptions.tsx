import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { KyberClientOptions } from '../models'
import { KyberProxy } from '../../../../api/models'
import { Side } from '../../../../data/models'
import style from '../kyberconfig.module.scss'

interface ClientOptionsProps {
  clientOptions: KyberClientOptions,
  proxies: KyberProxy[],
}

export function ClientOptions({clientOptions, proxies}: ClientOptionsProps) {

  const { t } = useTranslation('translation')

  const faction = clientOptions?.PREFERRED_FACTION === Side.Light 
    ? t(`common.side.${Side[Side.Light]}`)
    : t(`common.side.${Side[Side.Dark]}`)
  const proxied = clientOptions?.SERVER_PROXIED ? '✅' : '❌'
  const serverIp = clientOptions?.SERVER_IP
  const proxy = proxies?.find(x => serverIp?.startsWith(x.ip))

  function tx(localKey: string): string {
    return t(`features.config.${localKey}`)
  }

  return (
    <Fragment>
      <tr>
        <td colSpan={2}><b>{tx('clientOptions')}</b></td>
      </tr>
      {/* TODO: share server by its id */}
      <tr>
        <td><b>{tx('id')}</b></td>
        <td style={{wordBreak: 'break-word'}}> 
          {clientOptions?.SERVER_ID} 
          {/* <a href={`/#${clientOptions?.SERVER_ID}`}>[SHARE]</a> */}
        </td>
      </tr>
      <tr>
        <td><b>{tx('name')}</b></td>
        <td> {clientOptions?.SERVER_NAME}</td>
      </tr>
      {clientOptions?.SERVER_PASSWORD && <tr>
        <td><b>{tx('password')}</b></td>
        <td> {clientOptions?.SERVER_PASSWORD}</td>
      </tr>}
      <tr>
        <td><b>{tx('faction')}</b></td>
        <td>
          {faction}
        </td>
      </tr>
      <tr>
        <td><b>{tx('serverIp')}</b></td>
        <td> {serverIp}</td>
      </tr>
      <tr>
        <td><b>{tx('serverLocation')}</b></td>
        <td> 
          <img className={style.image_proxy_flag} loading="lazy" alt="location flag" 
            src={proxy?.flag} /> {proxy?.name}            
        </td>
      </tr>
      <tr>
        <td><b>{tx('proxied')}</b></td>
        <td> {proxied}</td>
      </tr>
    </Fragment>
  )
}
import { Fragment, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { KYBER_API } from '../../../api/endpoints'
import { getJson } from '../../../extensions/fetch'
import { KyberProxy } from '../../../api/models'
import { ClientOptions } from './Components/ClientOptions'
import { ServerOptions } from './Components/ServerOptions'
import { UserConfig } from './Components/UserConfig'
import { KyberConfigResponse } from './models'
import style from './kyberconfig.module.scss'

interface KyberConfigProps {
  proxies: KyberProxy[]
}

export function KyberConfig({proxies}: KyberConfigProps) {
  const initialConfig: KyberConfigResponse = {}

  const { t } = useTranslation('translation')

  const [config, setConfig] = useState(initialConfig)

  useEffect(() => {

    getJson(KYBER_API.config)
      .then(
        data => setConfig(data),
        error => console.error(error)
      )

  }, [])

  function tx(localKey: string): string {
    return t(`features.config.${localKey}`)
  }

  return (
    <Fragment>
      <div>
        <table>
          <caption>
            {tx('title')}
          </caption>
          <thead>
            <tr>
              <th>{tx('key')}</th>
              <th>{tx('value')}</th>
            </tr>
          </thead>
          <colgroup>
            <col style={{backgroundColor: 'var(--bg-highlight-alpha)'}} />
            <col style={{backgroundColor: '#77777733'}} />
          </colgroup>
          <tbody>
            <UserConfig config={config} />
            {config.CLIENT_OPTIONS && <ClientOptions clientOptions={config.CLIENT_OPTIONS} proxies={proxies} />}
            {config.SERVER_OPTIONS && <ServerOptions serverOptions={config.SERVER_OPTIONS} /> }
          </tbody>      
        </table>
      </div>
    </Fragment>
  )
}
import { Fragment, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { KyberConfigResponse } from '../models'
import { getText } from '../../../../extensions/fetch'
import { getGPU, NOT_AVAILABLE } from '../gpu'
import { getUserAgentData, UserAgentData } from '../userAgentData'
import { CLOUDFLARE_TRACE } from '../../../../constants'

interface CloudflareTrace {
  h: string,
  ip: string,
  ts: string,
  visit_scheme: string,
  uag: string,
  colo: string,
  sliver: string,
  http: string,
  loc: string,
  tls: string,
  sni: string,
  warp: string,
  gateway: string,
  kex: string,
}

interface UserConfigProps {
  config: KyberConfigResponse,
}

function parseCloudflareTrace(value: string): CloudflareTrace {
  return JSON.parse(`{\n"${value.trim().replaceAll('=','":"').replaceAll('\n','",\n"')}"\n}`)
}

export function UserConfig({config}: UserConfigProps) {

  const [renderer, setRenderer] = useState('')
  const [client, setClient] = useState({} as Partial<CloudflareTrace>)
  const [userAgent, setUserAgent] = useState({} as Partial<UserAgentData>)

  const { t } = useTranslation('translation')
  
  function tx(localKey: string): string {
    return t(`features.config.${localKey}`)
  }

  useEffect(() => {
    setUserAgent(getUserAgentData())
    setRenderer(getGPU())
    console.log(renderer)

    getText(CLOUDFLARE_TRACE)
      .then(
        data => {
          const cl = parseCloudflareTrace(data)
          setClient(cl)
          console.log(cl)
        },
        error => {
          const errorMsg = tx('clientIp_unavailable')
          const clError: Partial<CloudflareTrace> = {
            ip: errorMsg,
            loc: errorMsg,
            uag: errorMsg
          }
          setClient(clError)
          console.log(errorMsg)
          console.error(error)
        })
  }, [])

  return (
    <Fragment>
      <tr>
        <td><b>{tx('clientIp')}</b></td>
        <td>{client.ip}</td>
      </tr>
      <tr>
        <td><b>{tx('location')}</b></td>
        <td>{client.loc}</td>
      </tr>
      <tr>
        <td><b>{tx('userAgent')}</b> </td>
        <td>{userAgent.platform}, {userAgent.browser}{userAgent.mobile && ' (Mobile)'}</td>
      </tr>
      <tr>
        <td><b>{tx('gpu')}</b> </td>
        <td>{renderer === NOT_AVAILABLE ? t('features.config.gpu_unavailable') : renderer}</td>
      </tr>
      <tr>
        <td><b>{tx('status')}</b></td>
        {/* "Config not found." | "CLIENT" | "SERVER" */}
        <td> {tx(`${config.message || config.KYBER_MODE || 'Config not found.'}`)}</td> 
      </tr>     
    </Fragment>
  )
}
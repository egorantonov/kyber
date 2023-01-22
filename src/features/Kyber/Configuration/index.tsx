import { Fragment, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { KYBER_API } from '../../../api/endpoints'
import { Side } from '../../../data/models'
import { MAPS } from '../../../data/maps'
import { MODES } from '../../../data/modes'
import { getJson, getText } from '../../../extensions/fetch'
import { getGPU, NOT_AVAILABLE } from './gpu'
import { getUserAgentData, UserAgentData } from './userAgentData'

enum KYBER_MODE {
  SERVER = 'SERVER',
  CLIENT = 'CLIENT'
}

interface KyberServerOptions {
  AUTO_BALANCE_TEAMS: boolean,
  DESCRIPTION: string, // base64 encoded string
  MAP: string,
  MAX_PLAYERS: number,
  MODE: string,
  NAME: string,
  PASSWORD: string,
  PORT: number,
  PROXY_ADDRESS: string,
  PROXY_PORT: number
}

interface KyberClientOptions {
  PREFERRED_FACTION: Side.Light | Side.Dark,
  SERVER_ID: string,
  SERVER_IP: string,
  SERVER_NAME: string,
  SERVER_PASSWORD: string,
  SERVER_PROXIED: boolean
}

interface KyberConfigResponse {
  message?: string, // 'Config not found'
  KYBER_MODE?: KYBER_MODE.CLIENT | KYBER_MODE.SERVER,
  CLIENT_OPTIONS?: KyberClientOptions,
  SERVER_OPTIONS?: KyberServerOptions
}

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

function parseCloudflareTrace(value: string): CloudflareTrace {
  return JSON.parse(`{\n"${value.trim().replaceAll('=','":"').replaceAll('\n','",\n"')}"\n}`)
}

export function KyberConfig() {
  const initialConfig: KyberConfigResponse = {}
  const initialClient: Partial<CloudflareTrace> = {}

  const { t } = useTranslation('translation')
  const [client, setClient] = useState(initialClient)
  const [config, setConfig] = useState(initialConfig)
  const [renderer, setRenderer] = useState('')
  const [userAgent, setUserAgent] = useState({} as Partial<UserAgentData>)

  useEffect(() => {

    setUserAgent(getUserAgentData())
    setRenderer(getGPU())
    console.log(renderer)

    getJson(KYBER_API.config)
      .then(
        data => setConfig(data),
        error => console.error(error)
      )

    getText('https://www.cloudflare.com/cdn-cgi/trace')
      .then(
        data => {
          const cl = parseCloudflareTrace(data)
          setClient(cl)
          console.log(cl)
        },
        error => {
          const errorMsg = t('features.config.clientIp_unavailable') // 'Can\'t get client data. Check your adblocker setting for this site'
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

  function tx(localKey: string): string {
    return t(`features.config.${localKey}`)
  }

  function renderClientOptions() {
    return (
      <Fragment>
        <tr>
          <td colSpan={2}><b>{tx('clientOptions')}</b></td>
        </tr>
        {/* TODO: share server by its id */}
        <tr>
          <td><b>{tx('id')}</b></td>
          <td style={{wordBreak: 'break-word'}}> 
            {config.CLIENT_OPTIONS?.SERVER_ID} 
            {/* <a href={`/#${config.CLIENT_OPTIONS?.SERVER_ID}`}>[SHARE]</a> */}
          </td>
        </tr>
        <tr>
          <td><b>{tx('name')}</b></td>
          <td> {config.CLIENT_OPTIONS?.SERVER_NAME}</td>
        </tr>
        {config.CLIENT_OPTIONS?.SERVER_PASSWORD && <tr>
          <td><b>{tx('password')}</b></td>
          <td> {config.CLIENT_OPTIONS?.SERVER_PASSWORD}</td>
        </tr>}
        <tr>
          <td><b>{tx('faction')}</b></td>
          <td>
            {config.CLIENT_OPTIONS?.PREFERRED_FACTION === Side.Light 
              ? t(`common.side.${Side[Side.Light]}`)
              : t(`common.side.${Side[Side.Dark]}`)}
          </td>
        </tr>
        <tr>
          <td><b>{tx('serverIp')}</b></td>
          <td> {config.CLIENT_OPTIONS?.SERVER_IP}</td>
        </tr>
        {/* TODO: ip -> proxy location */}
        <tr>
          <td><b>{tx('proxied')}</b></td>
          <td> {config.CLIENT_OPTIONS?.SERVER_PROXIED ? '✅' : '❌'}</td>
        </tr>
      </Fragment>
    )
  }

  function renderServerOptions() {
    return (
      <Fragment>        
        <tr>
          <td colSpan={2}><b>{tx('serverOptions')}</b></td>
        </tr>
        {config.SERVER_OPTIONS?.DESCRIPTION && <tr>
          <td><b>{tx('description')}</b>:</td>
          <td>{window.atob(config.SERVER_OPTIONS?.DESCRIPTION || '')}</td>
        </tr>}
        <tr>
          <td><b>{tx('balanced')}</b></td>
          <td> {config.SERVER_OPTIONS?.AUTO_BALANCE_TEAMS ? '✅' : '❌'}</td>
        </tr>
        <tr>
          <td><b>{tx('map')}</b></td>
          <td>
            {t(`maps.${MAPS.find(m => m.map === config.SERVER_OPTIONS?.MAP)?.name}`)
              .replace('maps.', '')}</td>
        </tr>
        <tr>
          <td><b>{tx('mode')}</b></td>
          <td>
            {t(`modes.${MODES.find(m => m.mode === config.SERVER_OPTIONS?.MODE)?.name}`)
              .replace('modes.', '') /* replaces key for not yet translated modes */}
          </td>
        </tr>
        <tr>
          <td><b>{tx('maxPlayers')}</b></td>
          <td> {config.SERVER_OPTIONS?.MAX_PLAYERS}</td>
        </tr>
        <tr>
          <td><b>{tx('port')}</b></td>
          <td> {config.SERVER_OPTIONS?.PORT}</td>
        </tr>
        <tr>
          <td><b>{tx('proxyAddress')}</b></td>
          <td> {config.SERVER_OPTIONS?.PROXY_ADDRESS}</td>
        </tr>
        <tr>
          <td><b>{tx('proxyPort')}</b></td>
          <td> {config.SERVER_OPTIONS?.PROXY_PORT}</td>
        </tr>
      </Fragment>
    )
  }

  return (
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
            <td> {tx(`${config.message || config.KYBER_MODE}`)}</td> 
          </tr>         

          {config.CLIENT_OPTIONS && renderClientOptions()}
          {config.SERVER_OPTIONS && renderServerOptions()}
        </tbody>      
      </table>
      
      
    </div> 
  )
}


import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { KYBER_API } from '../../../api/endpoints'
import { Side } from '../../../data/models'
import { MAPS } from '../../../data/maps'
import { MODES } from '../../../data/modes'
import { getJson, getText } from '../../../extensions/fetch'
import { getGPU } from './gpu'

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
  const renderer = getGPU()

  useEffect(() => {

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
          const errorMsg = 'Can\'t get client data. Check your adblocker setting for this site'
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

  // TODO: translate
  return (
    <div>
      <table>
        <caption>
          {t('features.config.title')}
        </caption>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <colgroup>
          <col style={{backgroundColor: 'var(--bg-highlight-alpha)'}} />
          <col style={{backgroundColor: '#77777733'}} />
        </colgroup>
        <tbody>
          <tr>
            <td><b>CLIENT IP:</b></td>
            <td>{client.ip}</td>
          </tr>
          <tr>
            <td><b>LOCATION:</b></td>
            <td>{client.loc}</td>
          </tr>
          <tr>
            <td><b>USER AGENT:</b> </td>
            <td>{window?.navigator?.userAgent}</td>
          </tr>
          <tr>
            <td><b>GPU:</b> </td>
            <td>{renderer}</td>
          </tr>
          <tr>
            <td><b>STATUS</b>:</td>
            <td> {config.message || config.KYBER_MODE}</td>
          </tr>
          <tr>
            <td colSpan={2}><b>CLIENT OPTIONS</b></td>
          </tr>
          {/* TODO: share server by its id */}
          <tr>
            <td><b>ID</b>:</td>
            <td style={{wordBreak: 'break-word'}}> 
              {config.CLIENT_OPTIONS?.SERVER_ID} 
              {/* <a href={`/#${config.CLIENT_OPTIONS?.SERVER_ID}`}>[SHARE]</a> */}
            </td>
          </tr>
          <tr>
            <td><b>NAME</b>:</td>
            <td> {config.CLIENT_OPTIONS?.SERVER_NAME}</td>
          </tr>
          <tr>
            <td><b>PASSWORD</b>:</td>
            <td> {config.CLIENT_OPTIONS?.SERVER_PASSWORD}</td>
          </tr>
          <tr>
            <td><b>FACTION</b>:</td>
            <td> {config.CLIENT_OPTIONS?.PREFERRED_FACTION === Side.Light 
              ? Side[Side.Light] 
              : Side[Side.Dark]}
            </td>
          </tr>
          <tr>
            <td><b>IP</b>:</td>
            <td> {config.CLIENT_OPTIONS?.SERVER_IP}</td>
          </tr>
          <tr>
            <td><b>PROXIED</b>:</td>
            <td> {config.CLIENT_OPTIONS?.SERVER_PROXIED ? '✅' : '❌'}</td>
          </tr>
          <tr>
            <td colSpan={2}><b>SERVER OPTIONS</b></td>
          </tr>
          <tr>
            <td><b>BALANCED</b>:</td>
            <td> {config.SERVER_OPTIONS?.AUTO_BALANCE_TEAMS ? '✅' : '❌'}</td>
          </tr>
          <tr>
            <td><b>DESCRIPTION</b>:</td>
            <td> {window.atob(config.SERVER_OPTIONS?.DESCRIPTION || '')}</td>
          </tr>
          <tr>
            <td><b>MAP</b>:</td>
            <td> {MAPS.find(m => m.map === config.SERVER_OPTIONS?.MAP)?.name || 'N\\A'}</td>
          </tr>
          <tr>
            <td><b>MAX_PLAYERS</b>:</td>
            <td> {config.SERVER_OPTIONS?.MAX_PLAYERS || 'N\\A'}</td>
          </tr>
          <tr>
            <td><b>MODE</b>:</td>
            <td> {MODES.find(m => m.mode === config.SERVER_OPTIONS?.MODE)?.name || 'N\\A'}</td>
          </tr>
          <tr>
            <td><b>PORT</b>:</td>
            <td> {config.SERVER_OPTIONS?.PORT || 'N\\A'}</td>
          </tr>
          <tr>
            <td><b>PROXY_ADDRESS</b>:</td>
            <td> {config.SERVER_OPTIONS?.PROXY_ADDRESS || 'N\\A'}</td>
          </tr>
          <tr>
            <td><b>PROXY_PORT</b>:</td>
            <td> {config.SERVER_OPTIONS?.PROXY_PORT || 'N\\A'}</td>
          </tr>
        </tbody>      
      </table>
      
      
    </div> 
  )
}


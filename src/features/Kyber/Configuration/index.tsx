import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { KYBER_API } from '../../../api/endpoints'
import { Side } from '../../../data/models'
import { MAPS } from '../../../data/maps'
import { MODES } from '../../../data/modes'

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

export function KyberConfig() {
  const initialConfig: KyberConfigResponse = {}

  const { t, i18n } = useTranslation('translation')
  const [config, setConfig] = useState(initialConfig)

  useEffect(() => {
    fetch(KYBER_API.config)
      .then(response => response.json())
      .then(data => setConfig(data))
  }, [])

  // TODO: translate
  return (
    <div>
      <p>{t('features.config.title')}</p> 
      <div>STATUS: {config.message || config.KYBER_MODE}</div>
      <div>CLIENT OPTIONS</div>
      <hr/>
      {/* TODO: share server by its id */}
      <div>ID: {config.CLIENT_OPTIONS?.SERVER_ID} <a href={`/#${config.CLIENT_OPTIONS?.SERVER_ID}`}>[SHARE]</a></div>
      <div>NAME: {config.CLIENT_OPTIONS?.SERVER_NAME}</div>
      <div>PASSWORD: {config.CLIENT_OPTIONS?.SERVER_PASSWORD}</div>
      <div>FACTION: {config.CLIENT_OPTIONS?.PREFERRED_FACTION === Side.Light 
        ? Side[Side.Light] 
        : Side[Side.Dark]}
      </div>
      <div>IP: {config.CLIENT_OPTIONS?.SERVER_IP}</div>
      <div>PROXIED: {config.CLIENT_OPTIONS?.SERVER_PROXIED ? '✅' : '❌'}</div>
      <br/>
      <div>SERVER OPTIONS</div>
      <hr/>
      <div>BALANCED: {config.SERVER_OPTIONS?.AUTO_BALANCE_TEAMS ? '✅' : '❌'}</div>
      <div>DESCRIPTION: {window.atob(config.SERVER_OPTIONS?.DESCRIPTION || '')}</div>
      <div>MAP: {MAPS.find(m => m.map === config.SERVER_OPTIONS?.MAP)?.name || 'N\\A'}</div>
      <div>MAX_PLAYERS: {config.SERVER_OPTIONS?.MAX_PLAYERS || 'N\\A'}</div>
      <div>MODE: {MODES.find(m => m.mode === config.SERVER_OPTIONS?.MODE)?.name || 'N\\A'}</div>
      <div>PORT: {config.SERVER_OPTIONS?.PORT || 'N\\A'}</div>
      <div>PROXY_ADDRESS: {config.SERVER_OPTIONS?.PROXY_ADDRESS || 'N\\A'}</div>
      <div>PROXY_PORT: {config.SERVER_OPTIONS?.PROXY_PORT || 'N\\A'}</div>
      
    </div> 
  )
}


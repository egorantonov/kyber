import { Side } from '../../../data/models'

enum KYBER_MODE {
  SERVER = 'SERVER',
  CLIENT = 'CLIENT'
}

export interface KyberServerOptions {
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

export interface KyberClientOptions {
  PREFERRED_FACTION: Side.Light | Side.Dark,
  SERVER_ID: string,
  SERVER_IP: string,
  SERVER_NAME: string,
  SERVER_PASSWORD: string,
  SERVER_PROXIED: boolean
}

export interface KyberConfigResponse {
  message?: string, // 'Config not found'
  KYBER_MODE?: KYBER_MODE.CLIENT | KYBER_MODE.SERVER,
  CLIENT_OPTIONS?: KyberClientOptions,
  SERVER_OPTIONS?: KyberServerOptions
}
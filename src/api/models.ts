import { Side } from '../data/models'

export interface ApiResponse<T> {
  data: T,
  status: number,
  success: boolean,
  errors: any[]
}

export interface KyberApi {
  hostName: string,
  servers: string,
  proxies: string,
  config: string,
  play: string,
  host: string,
}

// endpoints: host, join
export interface MessageResponse {
  message: string
}

// endpoints: servers
export interface KyberServersResponse {
  page: number,
  pageCount: number,
  serverCount: number,
  servers: KyberServer[]
}

export interface KyberServer {
  id: string, // GUID
  name?: string,
  description?: string,
  map?: string,
  mods?: string[],
  mode: string,
  users?: number, // active players
  maxPlayers?: number, // server capacity
  host?: string,
  autoBalanceTeams?: boolean,
  startedAt?: number, // started at, ms
  startedAtPretty?: string,
  requiresPassword?: boolean,
  region?: string,
  proxy?: KyberProxy
}

export interface KyberProxy {
  ip: string,
  name?: string,
  flag?: string
}

export interface HostKyberServerRequest {
  autoBalanceTeams: boolean,
  description: string,
  displayInBrowser: boolean, // ?
  faction: Side,
  kyberProxy: string, // proxy IP string
  map: string, // BattlefrontMap.map
  maxPlayers: number,
  mode: string, // BattlefrontMode.mode
  name: string,
  password: string
}

export interface HostKyberServerResponse extends MessageResponse {
  id?: string
  validations?: HostKyberServerValidation
}  

interface HostKyberServerValidation {
  body: HostKyberPropertyValidation[]
}

interface HostKyberPropertyValidation {
  value: string,
  property: string,
  messages: string[]
}
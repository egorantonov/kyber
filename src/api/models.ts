export interface KyberApi {
  servers: string,
  proxies: string,
  config: string,
  play: string,
  host: string,
}

export interface MessageResponse {
  message: string
}

export interface KyberServersResponse {
  page: number,
  pageCount: number,
  serverCount: number,
  servers: KyberServer[]
}

export interface KyberServer {
  id?: string, // GUID
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
  ip?: string,
  name?: string,
  flag?: string
}
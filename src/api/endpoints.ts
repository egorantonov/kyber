import { KyberApi } from './models'

const API = 'https://kyber.gg/api'
const API_SERVERS = `${API}/servers?page=`
const API_PROXIES = `${API}/proxies`
const API_CONFIG = `${API}/config`
const API_CONFIG_PLAY = `${API_CONFIG}/play`
const API_CONFIG_HOST = `${API_CONFIG}/host`

export const KYBER_API: KyberApi = {
  servers: API_SERVERS,
  proxies: API_PROXIES,
  config: API_CONFIG,
  play: API_CONFIG_PLAY,
  host: API_CONFIG_HOST,
}

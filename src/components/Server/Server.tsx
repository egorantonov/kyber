import { KyberServer } from '../../api/models'
import { useAppDispatch } from '../../app/hooks'
import { MAPS } from '../../data/maps'
import { MODES } from '../../data/modes'
import { isNullOrWhiteSpace } from '../../extensions/string'
import { setModalServer, toggleModal } from '../../features/Kyber/Servers/serversSlice'
import { KYBER_API } from '../../api/endpoints'
import style from './server.module.scss'

const IMG_NEXUS_MOD = 'https://images.nexusmods.com/favicons/ReskinOrange/favicon-16x16.png'
const IMG_URL_PREFIX = `${KYBER_API.hostName}/static/images/maps/`
const IMG_URL_POSTFIX = '.jpg'

function mapImage(value?: string): string {
  return IMG_URL_PREFIX + value?.replaceAll('/', '-') + IMG_URL_POSTFIX
}

function getMode(value?: string): string {
  if (isNullOrWhiteSpace(value)) {
    return ''
  }
  
  const result = MODES.find(m => m.mode === value)?.name.replaceAll('Versus', 'vs.').toUpperCase() || ''
  return result
}

function getMap(value?: string): string {
  if (isNullOrWhiteSpace(value)) {
    return ''
  }

  const result = MAPS.find(m => m.map === value)?.name.toUpperCase() || ''
  return result
}

function getHost(value?: string): string {
  if (isNullOrWhiteSpace(value) || value?.toLowerCase() === 'unknown') {
    return ''
  }
  
  return `👤 ${value?.toUpperCase()}`
}

export interface KyberServerProps {
  server: KyberServer
}

export function Server({server}: KyberServerProps) {
  const dispatch = useAppDispatch()

  function openModal(server: KyberServer) {
    dispatch(setModalServer(server))
    dispatch(toggleModal())
  }

  const map = getMap(server.map)
  const mode = getMode(server.mode)
  const host = getHost(server.host)
  const image = mapImage(server.map)
  const name = `${server.requiresPassword ? '🔐 ' : ''}${server.name?.toUpperCase()}`
  const background = `linear-gradient(135deg, var(--bg-color), var(--bg-color-alpha), #fff0),
    url(${image}) center center / cover`

  return(
    <div key={server.id}
      className={`r start ${style.server} bd-filter-blur-10`}
      onClick={() => {
        openModal(server)
      }}
      style={{
        background: background,
      }} > 
      <div className={`c ${style.image_container}`}
        style={{
          background: `url(${image}) center center / cover`,
        }}  >
      </div>
      <div className={`c ${style.data_container}`}>

        <div className={style.title}><b className={style.b}>{name}</b></div>

        <div className={style.description_container}>
        
          <div className={`${style.description} ${style.sub}`}>
            <div className={style.info}>🎮 {mode}</div>
            <div className={style.info}> 🌍 {map}</div>
            <div className={style.info}> {host} </div>
          </div>

          <div className={`${style.description} ${style.sub}`} title={`IP: ${server.proxy?.ip}`}>          
            <div className={style.info}>
              <img className={style.image_nexus_mod} loading="lazy" src={IMG_NEXUS_MOD} alt="nexus mod" /> MODS REQUIRED: {server.mods?.length}
            </div>  
            <div className={style.info}> 👥 {server.users} / {server.maxPlayers}</div>             
            <div className={style.info}>
              <img className={style.image_proxy_flag} loading="lazy" src={server.proxy?.flag} alt="location flag" /> {server.proxy?.name}
            </div> 
            <div className={style.info}> 🕓 {server.startedAtPretty}</div>

          </div>
        </div>
      </div>
    </div>
  )
}
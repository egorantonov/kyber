import { KyberServer } from '../../api/models'
import { useAppDispatch } from '../../app/hooks'
import { MODES } from '../../data/modes'
import { isNullOrWhiteSpace } from '../../extensions/string'
import { setModalServer, toggleModal } from '../../features/Kyber/Servers/serversSlice'
import style from './server.module.scss'
import { useTranslation } from 'react-i18next'
import { getTimeHHmmFromTimeStamp } from '../../extensions/date'
import { ensureMapName, mapImage } from '../../utils/maps'
import { IMG_NEXUS_MOD } from '../../constants'
import { blurOrBackground } from '../../utils/ui'

function getMode(value?: string): string {
  if (isNullOrWhiteSpace(value)) {
    return ''
  }
  
  const result = MODES.find(m => m.mode === value)?.name || ''
  return result
}

function getHost(value?: string) {
  if (isNullOrWhiteSpace(value) || value?.toLowerCase() === 'unknown') {
    return ''
  }
  
  return (
    <div className={`${style.info} ${blurOrBackground(5)}`}> 👤 {value?.toUpperCase()} </div>
  )
}

function getTime(value: number) {
  return ` ${getTimeHHmmFromTimeStamp(value)}`
}

export interface KyberServerProps {
  server: KyberServer
}

export function Server({server}: KyberServerProps) {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  function openModal(server: KyberServer) {
    dispatch(setModalServer(server))
    dispatch(toggleModal())
  }

  const map = ensureMapName(server.map ?? '', server.mode ?? '')
  const mode = getMode(server.mode)
  const host = getHost(server.host)
  const image = mapImage(server.map)
  const name = `${server.requiresPassword ? '🔐 ' : ''}${server.name?.toUpperCase()}`
  const background = `linear-gradient(135deg, var(--bg-color), var(--bg-color-alpha), #fff0),
    url(${image}) center center / cover`

  return(
    <div key={server.id}
      className={`r start ${style.server} ${blurOrBackground(10)}`}
      onClick={() => {
        openModal(server)
      }}
      style={{
        background: background,
      }} > 
      <div className={`c ${style.image_container}`} style={{ background: `url(${image}) center center / cover` }}>
        <div className={style.image_svg_container}>
          <svg className={style.image_play} xmlns="http://www.w3.org/2000/svg" >
            <path d="M18.4 37.85q-1.25.75-2.45.075-1.2-.675-1.2-2.075v-24q0-1.4 1.2-2.075 1.2-.675 2.45.075L37.2 21.9q1.15.7 1.15 1.975 0 1.275-1.15 1.925Z"/>
          </svg>
        </div>        
      </div>
      <div className={`c ${style.data_container}`}>

        <div className={style.title}><b>{name}</b></div>

        <div className={style.description_container}>
        
          <div className={style.description}>
            <div data-x={`mods.${mode}`} className={`${style.info} ${blurOrBackground(5)} uppercase`}>🎮 {t(`modes.${mode}`).replace('modes.', '')}</div>
            <div className={`${style.info} ${blurOrBackground(5)} uppercase`}> 🌍 {t(`maps.${map}`).replace('maps.', '')}</div>
            {host}
          </div>

          <div className={style.description}>          
            {!!server.mods?.length && (<div className={`${style.info} ${blurOrBackground(5)}`}>
              <img className={style.image_nexus_mod} loading="lazy" src={IMG_NEXUS_MOD} alt="nexus mod" /> {t('components.server.modsRequired')}: {server.mods?.length}
            </div>)}
            <div className={`${style.info} ${blurOrBackground(5)}`}> 👥 {server.users} / {server.maxPlayers}</div>             
            <div className={`${style.info} ${blurOrBackground(5)}`} title={`IP: ${server.proxy?.ip}`}>
              <img className={style.image_proxy_flag} loading="lazy" src={server.proxy?.flag} alt="location flag" /> {t(`locations.${server.proxy?.name}`).replace('locations.', '')}
            </div> 
            <div className={`${style.info} ${blurOrBackground(5)}`} title={server.startedAtPretty}> 🕓 {getTime(server.startedAt)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
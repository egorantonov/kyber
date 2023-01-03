import { KyberServer } from '../../api/models'
import { useAppDispatch } from '../../app/hooks'
import { MAPS } from '../../data/maps'
import { MODES } from '../../data/modes'
import { isNullOrWhiteSpace } from '../../extensions/string'
import { setModalServer, toggleModal } from '../../features/Kyber/Servers/serversSlice'

import pic from '../../assets/bg-desktop-light.webp'
import { KYBER_API } from '../../api/endpoints'

const IMG_URL_PREFIX = `${KYBER_API.hostName}/static/images/maps/`
const IMG_URL_POSTFIX = '.jpg'

function mapImage(value?: string): string {
  return IMG_URL_PREFIX + value?.replaceAll('/', '-') + IMG_URL_POSTFIX
}

function getMode(value?: string): string {
  if (isNullOrWhiteSpace(value)) {
    return ''
  }
  
  const result = MODES.find(m => m.mode === value)?.name.toUpperCase() || ''
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
  
  return ` by 👤${value}`
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

  return(
    <div key={server.id}
      className="bd-filter-blur-10"
      data-id={server.id} data-img={mapImage(server.map)} 
      onClick={() => {
        openModal(server)
      }}
      style={{
        border: '1px solid #ccc', 
        backgroundColor: 'var(--bg-color-substrate)',
        margin: 10,
      }} > 
      <div className='server-image-container' style={{display: 'inline-block', margin: 10}}>
        <object style={{width: 160, height: 90}} data={image} type="image/jpg" title={map} >
          <img style={{width: 160, height: 90}} src={pic} alt={map} />
        </object>
      </div>
      <div className='server-data-container-1' style={{display: 'inline-block', margin: 10}}>
        <p>{server.requiresPassword && '🔐'}<b>{server.name?.toUpperCase()}</b> {host}</p>
        <p>{mode} on {map}</p>
      </div>
      <div className='server-data-container-2' style={{display: 'inline-block', margin: 10}}>
        <p>mods: {server.mods?.length} 👥 {server.users}/{server.maxPlayers} 🕓 {server.startedAtPretty}</p>
        <p>location: <img src={server.proxy?.flag} alt="location flag" style={{width: '24px', height: '16px'}}/> {server.proxy?.name} ip: {server.proxy?.ip}</p>
      </div>
    </div>
  )
}
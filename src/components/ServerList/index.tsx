import { KyberServer } from '../../api/models'
import { BattlefrontMap, BattlefrontMode } from '../../data/models'
import Server from '../Server'

type ServerListProps = {
    servers: KyberServer[],
    maps: BattlefrontMap[],
    modes: BattlefrontMode[],
    showModal: any
}

// [OBSOLETE] Legacy code
const ServerList = ({ servers, maps, modes, showModal }: ServerListProps) => {

  return (<>
    <span style={{ display: 'flex', justifyContent: 'center', margin: '10px' }}>
            Found {servers.length} Kyber server{servers.length > 1 && 's'}:
    </span>
    {
      servers.map(s => {
        const mapName = maps.find(m => m?.map === s?.map)?.name
        const modeName = modes.find(m => m.mode === s?.mode)?.name.replaceAll('Versus', 'vs.')

        return (
          <Server key={s.id} s={s} modeName={modeName} mapName={mapName} showModal={showModal} />
        )
      })
    }
  </>)
}

export default ServerList
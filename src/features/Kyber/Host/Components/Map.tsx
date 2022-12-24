import { useTranslation } from 'react-i18next'
import { MAPS } from '../../../../data/maps'
import { BattlefrontMap } from '../../../../data/models'
import { MODES } from '../../../../data/modes'

function overrideMapName(map: BattlefrontMap, modeMapOverrides: BattlefrontMap[]) {
  const mapWithOverride = modeMapOverrides?.find(mo => mo.map === map.map)

  if (mapWithOverride) {
    map.name = mapWithOverride.name
  }
}

function getModeMaps(mode: string): BattlefrontMap[] {
  const selectedMode = MODES.find(md => md.mode === mode)

  const modeMaps = selectedMode?.maps?.map(mapId => {
    const bfMap = MAPS.find(m => m.map === mapId)
    
    if (bfMap && selectedMode?.mapOverrides && selectedMode?.mapOverrides?.length > 0) {
      overrideMapName(bfMap, selectedMode?.mapOverrides)
    }

    return bfMap
  })

  return modeMaps as BattlefrontMap[]
}

interface MapsProps {
  map: string,
  selectedMode: string,
  setMap: any
}

export function Map({map, selectedMode, setMap}: MapsProps) {

  const { t } = useTranslation('translation')

  return (
    <div className="input-maps">
      <label htmlFor="input-maps">{t('features.host.form.map')}: </label>
      <select value={map} id="input-maps" name="input-maps" onChange={(e) => setMap(e.target.value)}>
        {getModeMaps(selectedMode).map((m) => ( 
          <option key={m.map} value={m.map}>{m.name}</option>
        ))}
      </select>
    </div>
  )
}
import { IMG_URL_POSTFIX, IMG_URL_PREFIX } from '../constants'
import { MAPS } from '../data/maps'
import { BattlefrontMap, BattlefrontMode } from '../data/models'
import { MODES } from '../data/modes'

export function mapImage(value?: string): string {
  return IMG_URL_PREFIX + value?.replaceAll('/', '-') + IMG_URL_POSTFIX
}

export function getModeMaps(mode: string): BattlefrontMap[] {
  const selectedMode = MODES.find(md => md.mode === mode)

  const modeMaps = selectedMode?.maps?.map(mapId => {
    const bfMap = MAPS.find(m => m.map === mapId) as BattlefrontMap
    return ensureMapOverride(bfMap, selectedMode)
  })

  return modeMaps as BattlefrontMap[]
}

export function ensureMapOverride(bfMap: BattlefrontMap, bfMode: BattlefrontMode): BattlefrontMap {
  const mapWithOverride = bfMode.mapOverrides?.find(mo => mo.map === bfMap.map)
  const overriddenMap: BattlefrontMap = { map: bfMap.map, name: bfMap.name}

  if (mapWithOverride) {
    overriddenMap.name = mapWithOverride.name
  }

  return overriddenMap
}

export function ensureMapName(map: string, mode: string): string {
  const bfMode = MODES.find(x => x.mode === mode) as BattlefrontMode
  const mapWithOverride = bfMode.mapOverrides?.find(mo => mo.map === map) as BattlefrontMap

  if (mapWithOverride) {
    return mapWithOverride.name
  }

  const bfMap = MAPS.find(x => x.map === map) as BattlefrontMap
  return bfMap.name
}
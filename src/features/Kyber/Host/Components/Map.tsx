import { useTranslation } from 'react-i18next'
import { getModeMaps } from '..'
import style from './../host.module.scss'

interface MapsProps {
  map: string,
  selectedMode: string,
  setMap: any
}

export function Map({map, selectedMode, setMap}: MapsProps) {

  const { t } = useTranslation('translation')

  return (
    <div className={`r start input-maps ${style.line}`}>
      <label className="c s6 m6 l6" htmlFor="input-maps">
        {t('features.host.form.map')}
      </label>
      <select className="c s5 m6 l6" value={map} id="input-maps" name="input-maps" 
        onChange={(e) => setMap(e.target.value)}>
        {getModeMaps(selectedMode).map((m) => ( 
          <option key={m.map} value={m.map}>{t(`maps.${m.name}`).replace('maps.', '')}</option>
        ))}
      </select>
    </div>
  )
}
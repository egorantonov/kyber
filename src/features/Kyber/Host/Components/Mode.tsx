import { useTranslation } from 'react-i18next'
import { getModeMaps } from '..'
import { MODES } from '../../../../data/modes'
import style from './../host.module.scss'

interface ModeProps {
  mode: string,
  setMode: any,
  setMap: any
}

export function Mode({mode, setMode, setMap}: ModeProps) {

  const { t } = useTranslation('translation')

  return (
    <div className={`r start input-modes ${style.line}`}>
      <label className="c s6 m6 l6" htmlFor="input-modes">
        {t('features.host.form.mode')}
      </label>
      <select className="c s5 m6 l6" value={mode} id="input-modes" name="input-modes" 
        onChange={(e) => {
          setMode(e.target.value)          
          setMap(getModeMaps(e.target.value)[0].map)
        }}>
        {MODES.map((m) => (
          <option key={m.name} value={m.mode}>{m.name.replaceAll('Versus', 'vs.')}</option>
        ))}
      </select>
    </div>
  )
}
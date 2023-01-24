import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { getModeMaps } from '../../../../utils/maps'
import { MODES } from '../../../../data/modes'
import style from './../host.module.scss'

interface ModeProps {
  mode: string,
  setMode: any,
  setMap: any
}

export function Mode({mode, setMode, setMap}: ModeProps) {

  const onChangeMode = useCallback((e: { target: { value: string } }) => {
    setMode(e.target.value)
    setMap(getModeMaps(e.target.value)[0].map)
  }, [])

  const { t } = useTranslation('translation')

  return (
    <div className={`r start input-modes ${style.line}`}>
      <label className="c s6 m6 l6" htmlFor="input-modes">
        {t('features.host.form.mode')}
      </label>
      <select className="c s5 m6 l6" id="input-modes" name="input-modes"
        value={mode} onChange={onChangeMode}>
        {MODES.map((m) => (
          <option key={m.name} value={m.mode} data-name={m.name}>
            {t(`modes.${m.name}`).replace('modes.', '')}
          </option>
        ))}
      </select>
    </div>
  )
}
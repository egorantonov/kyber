import { useTranslation } from 'react-i18next'
import { MODES } from '../../../../data/modes'

interface ModeProps {
  mode: string,
  setMode: any
}

export function Mode({mode, setMode}: ModeProps) {

  const { t } = useTranslation('translation')

  return (
    <div className="r start input-modes">
      <label className="c s5 m4 l2" htmlFor="input-modes">{t('features.host.form.mode')}: </label>
      <select className="c s5 m4 l3" value={mode} id="input-modes" name="input-modes" onChange={(e) => setMode(e.target.value)}>
        {MODES.map((m) => (
          <option key={m.name} value={m.mode}>{m.name}</option>
        ))}
      </select>
    </div>
  )
}
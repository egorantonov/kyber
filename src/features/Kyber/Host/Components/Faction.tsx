import { useTranslation } from 'react-i18next'
import { Side } from '../../../../data/models'

const sides = [Side.Light, Side.Dark]

interface FactionProps {
  faction: number,
  setFaction: any
}

export function Faction({faction, setFaction}: FactionProps) {
  const { t } = useTranslation('translation')

  return(
    <div className="input-faction">
      {t('features.host.form.faction')}:
      <div className='radio-wrapper filter-switch'>
        {sides.map((x) => (
          <div className="filter-switch-item" key={x}>
            <input
              className="radio"
              type="radio"
              name="faction"
              id={Side[x]}
              value={x}
              checked={faction === x}
              onChange={(e) => setFaction(+e.target.value)}
            />
            <label htmlFor={Side[x]}>{t(`common.side.${Side[x]}`).toLocaleUpperCase()}</label>
          </div>
        ))}  
      </div>
    </div>
  )
}
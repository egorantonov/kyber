import { useTranslation } from 'react-i18next'
import { Side } from '../../../../data/models'

interface FactionProps {
  faction: number,
  setFaction: any
}

export function Faction({faction, setFaction}: FactionProps) {
  const { t } = useTranslation('translation')

  return(
    <div className="input-faction">
      {t('features.host.form.faction')}:
      <input type="radio" id="faction-light" name="faction" value={Side.Light} checked={faction === Side.Light} 
        onChange={() => setFaction(Side.Light)}/>
      <label htmlFor="faction-light">{t(`common.side.${Side[Side.Light]}`)}</label>
      <input type="radio" id="faction-dark" name="faction" value={Side.Dark} checked={faction === Side.Dark}
        onChange={() => setFaction(Side.Dark)}/>
      <label htmlFor="faction-dark">{t(`common.side.${Side[Side.Dark]}`)}</label>
    </div>
  )
}
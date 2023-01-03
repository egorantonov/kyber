import { useTranslation } from 'react-i18next'

interface MaxPlayersProps {
  maxPlayers: number,
  setMaxPlayers: any
}

export function MaxPlayers({ maxPlayers, setMaxPlayers }: MaxPlayersProps) {

  const { t } = useTranslation('translation')

  return (
    <div className="r start input-players">
      <div className="c s5 m4 l2">
        <label htmlFor="input-players">{t('features.host.form.maxPlayers')}</label></div>
      <div className="c s5 m4 l3">
        <input id="input-players" type="range" min={2} max={64} onChange={(e) => setMaxPlayers(+e.target.value)} />{maxPlayers}
      </div>
    </div>
  )
}
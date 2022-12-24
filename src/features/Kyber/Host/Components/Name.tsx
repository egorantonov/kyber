import { useTranslation } from 'react-i18next'

interface NameProps{
  setName: any
}

export function Name({setName}: NameProps) {

  const { t } = useTranslation('translation')

  return(
    <div className="input-name">
      <label htmlFor="input-name">{t('features.host.form.name')}: </label>
      <input id="input-name" type="text" required={true} placeholder="Required" onChange={(e) => setName(e.target.value)}></input>
    </div>
  )
}
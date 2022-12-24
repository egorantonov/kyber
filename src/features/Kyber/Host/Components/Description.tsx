import { useTranslation } from 'react-i18next'

interface DescriptionProps{
  setDescription: any
}

export function Description({setDescription}: DescriptionProps) {

  const { t } = useTranslation('translation')

  return(
    <div className="input-description">
      <label htmlFor="input-description">{t('features.host.form.description')}: </label>
      <input id="input-description" type="text" placeholder="Optional" onChange={(e) => setDescription(e.target.value)}></input>
    </div>
  )
}
import { useTranslation } from 'react-i18next'

interface DescriptionProps{
  setDescription: any
}

export function Description({setDescription}: DescriptionProps) {

  const { t } = useTranslation('translation')

  return(
    <div className="r start input-description">
      <label className="c s5 m4 l2" htmlFor="input-description">{t('features.host.form.description')}: </label>
      <input className="c s5 m4 l3" id="input-description" type="text" placeholder="Optional" onChange={(e) => setDescription(e.target.value)}></input>
    </div>
  )
}
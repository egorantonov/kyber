import { useTranslation } from 'react-i18next'
import style from './../host.module.scss'

interface DescriptionProps{
  setDescription: any
}

export function Description({setDescription}: DescriptionProps) {

  const { t } = useTranslation('translation')

  return(
    <div className={`r start input-description ${style.line}`}>
      <label className="c s6 m6 l6" htmlFor="input-description">
        {t('features.host.form.description')}
      </label>
      <input className="c s5 m6 l6" id="input-description" type="text" placeholder={t('features.host.form.optional') || 'Optional'} onChange={(e) => setDescription(e.target.value)}></input>
    </div>
  )
}
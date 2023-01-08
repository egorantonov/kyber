import { useTranslation } from 'react-i18next'
import style from './../host.module.scss'

interface NameProps{
  setName: any
}

export function Name({setName}: NameProps) {

  const { t } = useTranslation('translation')

  return(
    <div className={`r start input-name ${style.line}`}>
      <label className="c s6 m6 l4" htmlFor="input-name">
        {t('features.host.form.name')}
      </label>
      <input className="c s5 m4 l3" id="input-name" type="text" required={true} placeholder="Required" 
        onChange={(e) => setName(e.target.value)} />
    </div>
  )
}
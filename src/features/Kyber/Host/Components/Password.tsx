import { useTranslation } from 'react-i18next'
import style from './../host.module.scss'

interface PasswordProps{
  setPassword: any
}

export function Password({setPassword}: PasswordProps) {

  const { t } = useTranslation('translation')

  return(
    <div className={`r start input-password ${style.line}`}>
      <label className="c s6 m6 l6" htmlFor="input-password">
        {t('features.host.form.password')}
      </label>
      <input className="c s5 m6 l6" id="input-password" type="password" placeholder="Optional" onChange={(e) => setPassword(e.target.value)}></input>
    </div>
  )
}
import { useTranslation } from 'react-i18next'

interface PasswordProps{
  setPassword: any
}

export function Password({setPassword}: PasswordProps) {

  const { t } = useTranslation('translation')

  return(
    <div className="r start input-password">
      <label className="c s5 m4 l2" htmlFor="input-password">{t('features.host.form.password')}: </label>
      <input className="c s5 m4 l3" id="input-password" type="password" placeholder="Optional" onChange={(e) => setPassword(e.target.value)}></input>
    </div>
  )
}
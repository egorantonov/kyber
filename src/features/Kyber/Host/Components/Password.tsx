import { useTranslation } from 'react-i18next'

interface PasswordProps{
  setPassword: any
}

export function Password({setPassword}: PasswordProps) {

  const { t } = useTranslation('translation')

  return(
    <div className="input-password">
      <label htmlFor="input-password">{t('features.host.form.password')}: </label>
      <input id="input-password" type="password" placeholder="Optional" onChange={(e) => setPassword(e.target.value)}></input>
    </div>
  )
}
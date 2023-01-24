import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import style from './../host.module.scss'

interface PasswordProps{
  password: string,
  setPassword: any
}

export function Password({password, setPassword}: PasswordProps) {

  const { t } = useTranslation('translation')

  const onChangeValue = useCallback((e: {target: {value: string}}) => {
    setPassword(e.target.value)
  }, [])

  return(
    <div className={`r start input-password ${style.line}`}>
      <label className="c s6 m6 l6" htmlFor="input-password">
        {t('features.host.form.password')}
      </label>
      <input className="c s5 m6 l6" id="input-password" type="password" 
        placeholder={t('features.host.form.optional') || 'Optional'} 
        value={password} onChange={onChangeValue}/>
    </div>
  )
}
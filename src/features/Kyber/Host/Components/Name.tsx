import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { isNullOrEmpty } from '../../../../extensions/string'
import style from './../host.module.scss'

interface NameProps{
  name: string,
  setName: any,
  setValidationFailed: any
}

export function Name({name, setName, setValidationFailed}: NameProps) {

  const { t } = useTranslation('translation')

  const onChangeValue = useCallback((e: {target: {value: string}}) => {
    setName(e.target.value)
    setValidationFailed(isNullOrEmpty(e.target.value))    
  }, [])

  return(
    <div className={`r start input-name ${style.line}`}>
      <label className="c s6 m6 l6" htmlFor="input-name">
        {t('features.host.form.name')}
      </label>
      <input value={name} className="c s5 m6 l6" id="input-name" type="text" required={true} 
        placeholder={t('features.host.form.required') || 'Required'} 
        onChange={onChangeValue} />
    </div>
  )
}
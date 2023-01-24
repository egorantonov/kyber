import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import style from './../host.module.scss'

interface DescriptionProps{
  description: string,
  setDescription: any
}

export function Description({description, setDescription}: DescriptionProps) {

  const { t } = useTranslation('translation')

  const onChangeValue = useCallback((e: {target: {value: string}}) => {
    setDescription(e.target.value)
  }, [])

  return(
    <div className={`r start input-description ${style.line}`}>
      <label className="c s6 m6 l6" htmlFor="input-description">
        {t('features.host.form.description')}
      </label>
      <input className="c s5 m6 l6" id="input-description" type="text" 
        placeholder={t('features.host.form.optional') || 'Optional'} 
        value={description} onChange={onChangeValue}/>
    </div>
  )
}
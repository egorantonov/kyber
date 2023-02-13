import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { isBlur, toggleBlur } from '../../features/Kyber/Servers/serversSlice'

export const Blur = () => {

  const { t } = useTranslation()
  const blur = useAppSelector(isBlur)
  const dispatch = useAppDispatch()
  
  return (
    <div>
      <p className='uppercase'>{t('components.blur.title')}:&nbsp;</p>
      <div className='radio-wrapper x2 filter-switch' style={{margin: 7, width: 125}}>
          
        <div className="filter-switch-item" >
          <input type="radio" id="blur-on" name="blur" value="on" checked={blur}
            onChange={() => dispatch(toggleBlur(true))} />
          <label htmlFor="blur-on">{t('common.switch.on')}</label>
        </div>
        <div className="filter-switch-item">
          <input type="radio" id="blur-off" name="blur" value="off" checked={!blur}
            onChange={() => dispatch(toggleBlur(false))} />
          <label htmlFor="blur-off">{t('common.switch.off')}</label>
        </div>
      </div>
    </div>
  )
}
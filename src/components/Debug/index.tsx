import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { isDebug, toggleDebug } from '../../features/Kyber/Servers/serversSlice'

export const Debug = () => {

  const { t } = useTranslation()
  const debug = useAppSelector(isDebug)
  const dispatch = useAppDispatch()
  
  return (
    <div>
      <p className='uppercase'>{t('components.debug.title')}:&nbsp;</p>
      <div className='radio-wrapper x2 filter-switch' style={{margin: 7, width: 125}}>
          
        <div className="filter-switch-item" >
          <input type="radio" id="debug-on" name="debug" value="on" checked={debug}
            onChange={() => dispatch(toggleDebug(true))} />
          <label htmlFor="debug-on">{t('common.switch.on')}</label>
        </div>
        <div className="filter-switch-item">
          <input type="radio" id="debug-off" name="debug" value="off" checked={!debug}
            onChange={() => dispatch(toggleDebug(false))} />
          <label htmlFor="debug-off">{t('common.switch.off')}</label>
        </div>
      </div>
    </div>
  )
}
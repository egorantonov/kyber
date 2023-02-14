import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getKyberApiStatus, KyberApiStatus, setKyberApiStatus } from './statusSlice'

import style from './status.module.scss'
import { useState } from 'react'
import { Trans } from 'react-i18next'
import ExternalLink from '../../components/ExternalLink'
import { KYBER_API } from '../../api/endpoints'
import { DISCORD_KYBER } from '../../constants'

export function KyberStatus() {
  const [visible, setVisible] = useState(true)
  const dispatch = useAppDispatch()
  const status = useAppSelector(getKyberApiStatus)

  function onLoad() {
    dispatch(setKyberApiStatus(KyberApiStatus.Ok))
  }

  function onError() {
    dispatch(setKyberApiStatus(KyberApiStatus.Unavailable))
    setTimeout(() => {
      setVisible(true)      
    }, 500)
  }

  return (
    <div id="kyber-status-wrapper" >
      <img id='check-kyber-api'
        className={style.image}
        src={`${KYBER_API.hostName}/logo.svg`}
        width={0} height={0}        
        onLoad={() => onLoad()}
        onError={() => onError()}
      />
      {status === KyberApiStatus.Unavailable && (
        <div className={`${style.status} ${visible ? style.shown : style.closed}`}>
          <div className={style.info}>
            ⚠
          </div>
          <div className={style.text}>
            <Trans i18nKey="features.status.message">
              Hmmm... Kyber API seems to be down. Try open 
              <ExternalLink href={KYBER_API.hostName}>Kyber official site</ExternalLink>
              or check status on 
              <ExternalLink href={DISCORD_KYBER}>
                Discord server
              </ExternalLink>
            </Trans>
          
          </div>
          <div className={style.close} onClick={() => {setVisible(false)}}>
            ✕
          </div>
          
        </div>)}
    </div>
    
  )
}
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { Modal } from '../../../components/Modal/Modal'
import { Server } from '../../../components/Server/Server'

import { clear, fetchServersAsync, selectServers, isDebug, getServersStatus, Status, toggleAutoUpdate, isLiveUpdate, getModalServer } from './serversSlice'

const liveUpdateDelay = 5000 //ms

export function KyberServers() {
  const { t } = useTranslation()
  const servers = useAppSelector(selectServers)
  const debug = useAppSelector(isDebug)
  const liveUpdate = useAppSelector(isLiveUpdate)
  const status = useAppSelector(getServersStatus)
  const modalServer = useAppSelector(getModalServer)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchServersAsync(debug))

    let timer: NodeJS.Timeout | undefined

    if (!timer && liveUpdate) {
      timer = setInterval(() => {
        console.log('timer invoked')
        dispatch(fetchServersAsync(debug))
      }, liveUpdateDelay)
    }

    return (() => {
      clearInterval(timer)
    })
  }, [liveUpdate])

  return (
    <div style={{ marginTop: 25 }}>
      <div>
        <Modal modalServer={modalServer} />
      </div>
      {/* <div>
        <input
          type="checkbox"
          name="liveUpdate"
          id="liveUpdate"
          checked={liveUpdate}
          onChange={() => dispatch(toggleAutoUpdate())}
        />
        <label htmlFor="liveUpdate">Live Update</label>
      </div>       */}
      <div id='servers-buttons' className='flex flex-items-center' style={{marginLeft: 10}}>
        {t('features.servers.liveUpdate')}:&nbsp;
        <div className='radio-wrapper x2 filter-switch' style={{margin: 7, width: 125}}>
          
          <div className="filter-switch-item" >
            <input type="radio" id="liveUpdate-on" name="liveUpdate" value="on" checked={liveUpdate}
              onChange={() => dispatch(toggleAutoUpdate(true))} />
            <label htmlFor="liveUpdate-on">{t('common.switch.on')}</label>
          </div>
          <div className="filter-switch-item">
            <input type="radio" id="liveUpdate-off" name="liveUpdate" value="off" checked={!liveUpdate}
              onChange={() => dispatch(toggleAutoUpdate(false))} />
            <label htmlFor="liveUpdate-off">{t('common.switch.off')}</label>
          </div>
        </div>
        {
          !liveUpdate && 
          <button disabled={status === Status.Loading} aria-label="Fetch servers list"
            onClick={() => dispatch(fetchServersAsync(debug))}>
            🔄 {t('features.servers.update')}
          </button>
        }
        {
          debug && 
          <button aria-label="Clear servers list" onClick={() => dispatch(clear())}>
            ❌ {t('features.servers.debugClear')}
          </button>
        }
        {/* {status === Status.Loading ? '🔄' : status === Status.Idle ? '✅' : '❌'} */}
      </div>
      
      <div className='container'>
        <h3 className='flex flex-content-center'>{t('features.servers.found', {count: servers.length })}</h3>
        {servers.length > 0 && servers.map((s) => { 
          return <Server key={s.id} server={s} /> 
        })}
      </div>
    </div>
  )
}
import React, { useEffect } from 'react'

import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { Server } from '../../../components/Server/Server'

import { clear, fetchServersAsync, selectServers, isDebug, getServersStatus, Status, toggleAutoUpdate, isLiveUpdate } from './serversSlice'

const liveUpdateDelay = 5000 //ms

export function KyberServers() {
  const servers = useAppSelector(selectServers)
  const debug = useAppSelector(isDebug)
  const liveUpdate = useAppSelector(isLiveUpdate)
  const status = useAppSelector(getServersStatus)
  const dispatch = useAppDispatch()

  let foundServersMessage = 'No Kyber servers found' // t('found0')

  switch (servers.length) {
  case 0:
    break
  case 1: 
    foundServersMessage = `Found ${servers.length} Kyber server` // t('found1'))
    break
  default:
    foundServersMessage = `Found ${servers.length} Kyber servers` // t('found2+')
  }

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
    <div style={{ marginTop: 75 }}>
      <div>
        <input
          type="checkbox"
          name="liveUpdate"
          id="liveUpdate"
          checked={liveUpdate}
          onChange={() => dispatch(toggleAutoUpdate())}
        />
        <label htmlFor="liveUpdate">Live Update</label>
      </div>
      <button aria-label="Clear servers list" onClick={() => dispatch(clear())}>
        Clear
      </button>
      <button disabled={status === Status.Loading} aria-label="Fetch servers list"
        onClick={() => dispatch(fetchServersAsync(debug))}>
        Fetch
      </button>
      {status === Status.Loading ? '🔄' : '✅'}
      <div className='container'>
        {foundServersMessage}
        {servers.map((s) => { return <Server key={s.id} server={s} /> })}
      </div>
    </div>
  )
}
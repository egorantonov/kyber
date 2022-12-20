import React, { useEffect, useState } from 'react'

import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { MAPS } from '../../../data/maps'
import { MODES } from '../../../data/modes'
import { isNullOrWhiteSpace } from '../../../extensions/string'

import { clear, fetchServersAsync, selectServers, isDebug, getServersStatus, Status } from './serversSlice'

const IMG_URL_PREFIX = 'https://kyber.gg/static/images/maps/'
const IMG_URL_POSTFIX = '.jpg'

function mapImage(value?: string): string {
  return IMG_URL_PREFIX + value?.replaceAll('/', '-') + IMG_URL_POSTFIX
}

function getMode(value?: string): string {
  if (isNullOrWhiteSpace(value)) {
    return ''
  }
  
  const result = MODES.find(m => m.mode === value)?.name.toUpperCase() || ''
  return result
}

function getMap(value?: string): string {
  if (isNullOrWhiteSpace(value)) {
    return ''
  }

  const result = MAPS.find(m => m.map === value)?.name.toUpperCase() || ''
  return result
}

function getHost(value?: string): string {
  if (isNullOrWhiteSpace(value) || value?.toLowerCase() === 'unknown') {
    return ''
  }
  
  return `hosted by 👤${value}`
}

export function KyberServers() {
  const servers = useAppSelector(selectServers)
  const debug = useAppSelector(isDebug)
  const status = useAppSelector(getServersStatus)
  const dispatch = useAppDispatch()

  useEffect(() => { 
    dispatch(fetchServersAsync(debug)) 
    console.log('KyberServers.useEffect() invoked')
  }, [])

  return(
    <div style={{}}>
      <button
        aria-label="Clear servers list"
        onClick={() => dispatch(clear())}
      >Clear</button>
      <button
        disabled={status === Status.Loading}
        aria-label="Fetch servers list"
        onClick={() => dispatch(fetchServersAsync(debug))}
      >Fetch</button>
      <div className='container'>
        {servers.map((s) => {
          const map = getMap(s.map)
          const mode = getMode(s.mode)
          const host = getHost(s.host)
          const image = mapImage(s.map)
          return(
            <div style={{
              border: '1px solid #ccc', 
              backgroundColor: 'var(--bg-color-substrate)',
              backdropFilter: 'blur(10px)',
              margin: 10,
            }} key={s.id} data-id={s.id} data-img={mapImage(s.map)}> 
              <div className='server-image-container' style={{display: 'inline-block', margin: 10}}>
                <img src={image} alt={map} style={{width: 160, height: 90}}/>
              </div>
              <div className='server-data-container-1' style={{display: 'inline-block', margin: 10}}>
                <p>{s.name} {host}</p>
                <p>{mode} on {map}</p>
              </div>
              <div className='server-data-container-2' style={{display: 'inline-block', margin: 10}}>
                <p>mods: {s.mods?.length} 👥 {s.users}/{s.maxPlayers} 🕓 {s.startedAtPretty}</p>
                <p>location: <img src={s.proxy?.flag} alt="location flag" style={{width: '24px', height: '16px'}}/> {s.proxy?.name} ip: {s.proxy?.ip}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
import React, { useEffect, useState } from 'react'

import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { MAPS } from '../../../data/maps'
import { MODES } from '../../../data/modes'

import { clear, fetchServersAsync, selectServers } from './serversSlice'

export function KyberServers() {
  const servers = useAppSelector(selectServers)
  const dispatch = useAppDispatch()

  useEffect(() => { 
    dispatch(fetchServersAsync()) 
    console.log('KyberServers.useEffect() invoked')
  }, [])

  return(
    <div style={{}}>
      <button
        aria-label="Clear servers list"
        onClick={() => dispatch(clear())}
      >Clear</button>
      <button
        aria-label="Fetch servers list"
        onClick={() => dispatch(fetchServersAsync())}
      >Fetch</button>
      <div className='container'>
        {servers.map((s) => {
          return(
            <div style={{
              border: '1px solid #ccc', 
              backgroundColor: 'var(--bg-color-substrate)',
              backdropFilter: 'blur(10px)',
              margin: 10,
              padding: 10
            }} key={s.id} data-id={s.id}>              
              <p>{s.name} hosted by {s.host}</p>
              <p>{MODES.find(m => m.mode === s.mode)?.name.toUpperCase()} on {MAPS.find(m => m.map === s.map)?.name.toUpperCase()}</p>
              <p>mods: {s.mods?.length} 👥 {s.users}/{s.maxPlayers} 🕓 {s.startedAtPretty}</p>
              <p>location: <img src={s.proxy?.flag} alt="location flag" style={{width: '24px', height: '16px'}}/> {s.proxy?.name} ip: {s.proxy?.ip}</p>
              
              
            </div>
          )
        })}
      </div>
    </div>
  )
}
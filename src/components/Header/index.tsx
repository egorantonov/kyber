import React from 'react'
import { useState, useEffect } from 'react'
import { useAppSelector } from '../../app/hooks'
import { getKyberApiStatus, KyberApiStatus } from '../../features/Status/statusSlice'
import { useTranslation } from 'react-i18next'

import style from './header.module.scss'
import '../../styles/grid.scss'
import logo from '../../logo.svg'
import { KYBER_API } from '../../api/endpoints'
import { getTimeHHmm } from '../../extensions/date'

function Clock() {

  const [date, setDate] = useState(new Date())

  function refreshClock() {
    setDate(new Date())
  }

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000)
    return function cleanup() {
      clearInterval(timerId)
    }
  }, [])

  const time = getTimeHHmm(date)

  return (
    <span>
      {time}
    </span>
  )
}

export function Header() {
  const { t } = useTranslation('translation')
  const status = useAppSelector(getKyberApiStatus)

  return (
    <>
      <ul id="header" className={`r ${style.header}`}>
        <li className="c s4 m4 l4 text-start">          
          <a href={`${KYBER_API.hostName}/servers`} target="_blank" rel="noreferrer" className={style.padleft}>
            <img src={logo} alt="logo" className={style.header__logo} />
            <span> KYBER </span>
          </a><span className={style.status}>{status === KyberApiStatus.Unavailable && t('header.offline')}</span>
        </li>
        <li className="c s4 m4 l4 text-center">
          <Clock />
        </li>
        <li className="c s4 m4 l4 text-end">
          <a href="https://github.com/egorantonov" target="_blank" rel="noreferrer" className={style.padright}>EYEMVX</a>
        </li>
      </ul>
    </>
  )
}
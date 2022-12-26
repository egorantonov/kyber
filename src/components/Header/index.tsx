import React from 'react'
import { useState, useEffect } from 'react'
import style from './header.module.scss'
import logo from '../../logo.svg'
import { useAppSelector } from '../../app/hooks'
import { getKyberApiStatus, KyberApiStatus } from '../../features/Status/statusSlice'
import { useTranslation } from 'react-i18next'

function Clock() {

  const [date, setDate] = useState(new Date())

  function refreshClock() {
    setDate(new Date())
  }

  function checkTwoDigits(number: number): string {
    return `${number < 10 ? '0' : ''}${number}`
  }

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000)
    return function cleanup() {
      clearInterval(timerId)
    }
  }, [])

  const hours = checkTwoDigits(date.getHours())
  const minutes = checkTwoDigits(date.getMinutes())

  return (
    <span>
      {hours}:{minutes}
    </span>
  )
}

export function Header() {
  const { t } = useTranslation('translation')
  const status = useAppSelector(getKyberApiStatus)

  return (
    <>
      <ul id="header" className={`${style.header}`}>
        <li className="c s2 m2 l2 text-start">          
          <a href="https://kyber.gg/servers" target="_blank" rel="noreferrer">
            <img src={logo} alt="logo" className={style.header__logo} />
            <span> Kyber </span>
          </a><span className={style.status}>{status === KyberApiStatus.Unavailable && t('header.offline')}</span>
        </li>
        <li className="c s2 m2 l2 text-center">
          <Clock />
        </li>
        <li className="c s2 m2 l2 text-end">
          <a href="https://github.com/egorantonov" target="_blank" rel="noreferrer">EYEMVX</a>
        </li>
      </ul>
    </>
  )
}
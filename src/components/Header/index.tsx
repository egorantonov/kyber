import React from 'react'
import { useState, useEffect } from 'react'
import style from './header.module.scss'

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

  return (
    <ul id="header" className={`${style.header}  uppercase`}>
      <li className="c s2 m2 l2 text-start">          
        <a href="https://kyber.gg/servers" target="_blank" rel="noreferrer">
          <img src="https://kyber.gg/logo.svg" alt="logo" className={style.header__logo} />
          <span>Kyber</span>
        </a>
      </li>
      <li className="c s2 m2 l2 text-center">
        <Clock />
      </li>
      <li className="c s2 m2 l2 text-end">
        <a href="https://github.com/egorantonov" target="_blank" rel="noreferrer">EYEMVX</a>
      </li>
    </ul>
  )
}
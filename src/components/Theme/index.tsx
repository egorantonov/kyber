import React, { Fragment, useEffect, useState } from 'react'

import style from './theme.module.scss'

const THEME = 'theme'
const DARK = 'dark'
const LIGHT = 'light'
const SYSTEM = 'system'
const THEMES = [ DARK, LIGHT ]
const SWITCHES = THEMES.concat(SYSTEM)

function initializeTheme(): string {
  const theme = `${window?.localStorage?.getItem(THEME)}`

  if (THEMES.includes(theme)) {
    document.documentElement.dataset.theme = theme
    return theme
  }

  document.documentElement.dataset.theme = getSystemTheme()
  return SYSTEM
}

function getSystemTheme(): string {  
  const userMedia = window.matchMedia(`(prefers-color-scheme: ${LIGHT})`)
  return userMedia.matches ? LIGHT : DARK
}

export const Theme = () => {
  const initialTheme = initializeTheme()
  const [theme, setTheme] = useState(initialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = THEMES.includes(theme) ? theme : getSystemTheme()
    localStorage.setItem(THEME, theme)
  })

  return (
    <div>
      {SWITCHES.map((t) => (
        <Fragment key={t}>
          <input
            className="radio"
            type="radio"
            name="password"
            id={t}
            value={t}
            checked={t === theme}
            onChange={(e) => setTheme(e.target.value)} 
          />
          <label htmlFor={t}>{t.toUpperCase()}</label>
        </Fragment>
      ))}
    </div>

  )
}
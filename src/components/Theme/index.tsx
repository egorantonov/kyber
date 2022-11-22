import React, { Fragment, useEffect, useState } from 'react'
import { changeTheme, getTheme, SYSTEM, THEMES } from '../../contexts/ThemeContext'

const SWITCHES = THEMES.concat(SYSTEM)

export const Theme = () => {
  const initialTheme = getTheme()
  const [theme, setTheme] = useState(initialTheme)

  useEffect(() => {
    changeTheme(theme)
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
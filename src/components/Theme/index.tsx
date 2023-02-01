import React, { Fragment, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { changeTheme, getTheme, SYSTEM, THEMES } from '../../contexts/ThemeContext'

const SWITCHES = THEMES.concat(SYSTEM)

export const Theme = () => {
  const { t } = useTranslation()
  const initialTheme = getTheme()
  const [theme, setTheme] = useState(initialTheme)
  const localStorageDisabled = !window?.localStorage

  function tx(localKey: string): string {
    return t(`components.theme.${localKey}`)
  }

  useEffect(() => {
    changeTheme(theme)
  })

  return (
    <div>
      <p className='uppercase'>{tx('title')}</p>
      <div className="radio-wrapper x3 filter-switch">    
        {SWITCHES.map((x) => (
          <div className="filter-switch-item" key={x}>
            <input
              className="radio"
              type="radio"
              name="password"
              id={x}
              value={x}
              checked={x === theme}
              disabled={localStorageDisabled}
              onChange={(e) => setTheme(e.target.value)} 
            />
            <label htmlFor={x}>{tx(x).toLocaleUpperCase()}</label>
          </div>
        ))}
      </div>
      {localStorageDisabled && (
        <p style={{color: 'var(--highlight)'}}>{t('messages.localStorageDisabled')}</p>
      )}
    </div>

  )
}
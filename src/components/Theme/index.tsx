import React, { Fragment, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { changeTheme, getTheme, SYSTEM, THEMES } from '../../contexts/ThemeContext'

const SWITCHES = THEMES.concat(SYSTEM)

export const Theme = () => {
  const { t, i18n } = useTranslation()
  const initialTheme = getTheme()
  const [theme, setTheme] = useState(initialTheme)
  const localStorageDisabled = !window?.localStorage

  useEffect(() => {
    changeTheme(theme)
  })

  return (
    <div>
      <p>{t('theme.title')}</p>
      {SWITCHES.map((x) => (
        <Fragment key={x}>
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
          <label htmlFor={x}>{t(`theme.${x}`).toLocaleUpperCase()}</label>
        </Fragment>
      ))}
      {localStorageDisabled && (
        <p>{t('messages.localStorageDisabled')}</p>
      )}
    </div>

  )
}
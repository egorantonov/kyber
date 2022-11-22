import React from 'react'

export const THEME = 'theme'
export const DARK = 'dark'
export const LIGHT = 'light'
export const SYSTEM = 'system'
export const THEMES = [DARK, LIGHT]

export const ThemeContext = React.createContext({
  theme: SYSTEM,
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  changeTheme: (theme: string) => {}
  //changeTheme
})
 
export function changeTheme(theme: string): void {
  document.documentElement.dataset.theme = THEMES.includes(theme) ? theme : getSystemTheme()
  localStorage.setItem(THEME, theme)
}

export function initializeTheme(): string {
  const theme = `${window?.localStorage?.getItem(THEME)}`

  if (THEMES.includes(theme)) {
    document.documentElement.dataset.theme = theme
    return theme
  }

  document.documentElement.dataset.theme = getSystemTheme()
  return SYSTEM
}

export function getSystemTheme(): string {
  const userMedia = window.matchMedia(`(prefers-color-scheme: ${LIGHT})`)
  return userMedia.matches ? LIGHT : DARK
}


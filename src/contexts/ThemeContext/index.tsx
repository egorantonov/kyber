export const THEME = 'theme'
export const DARK = 'dark'
export const LIGHT = 'light'
export const SYSTEM = 'system'
export const THEMES = [DARK, LIGHT]

export function changeTheme(theme: string): void {
  document.documentElement.dataset.theme = THEMES.includes(theme) ? theme : getSystemTheme()
  localStorage.setItem(THEME, theme)
}

export function initializeTheme() {
  const theme = `${window?.localStorage?.getItem(THEME)}`
  document.documentElement.dataset.theme = THEMES.includes(theme) ? theme : getSystemTheme()
}

export function getTheme(): string {
  const theme = `${window?.localStorage?.getItem(THEME)}`
  return THEMES.includes(theme) ? theme : SYSTEM
}

function getSystemTheme(): string {
  const userMedia = window.matchMedia(`(prefers-color-scheme: ${LIGHT})`)
  return userMedia.matches ? LIGHT : DARK
}


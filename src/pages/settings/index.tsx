import React from 'react'
import { useTranslation } from 'react-i18next'
import { Theme } from '../../components/Theme'

export function Settings() {
  const { t, i18n } = useTranslation('translation')
  return (
    <div id="settings">
      <h1>{t('pages.settings.title')}</h1>
      <div>
        <Theme />
      </div>      
    </div>
  )
}

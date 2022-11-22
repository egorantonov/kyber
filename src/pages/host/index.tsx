import { useTranslation } from 'react-i18next'

export function Host() {
  const { t, i18n } = useTranslation('translation')
  return (
    <h1>{t('pages.host.title')}</h1>
  )
}

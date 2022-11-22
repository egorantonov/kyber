import { useTranslation } from 'react-i18next'

export function Servers() {
  const { t, i18n } = useTranslation('translation')
  return (
    <h1>{t('pages.servers.title')}</h1>
  )
}

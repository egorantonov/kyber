import { useTranslation } from 'react-i18next'

export function Download() {
  const { t, i18n } = useTranslation('translation')
  return (
    <h1>{t('pages.download.title')}</h1>
  )
}

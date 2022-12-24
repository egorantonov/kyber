import { useTranslation } from 'react-i18next'
import { NavLinkPersist } from '../../supports/Persistence'
import style from './nav.module.scss'

export function Nav() {
  const { t } = useTranslation('translation')
  const className = ({ isActive }: { isActive: boolean }) => {
    return `${isActive ? style.active : ''} ${style.link}`
  }

  return (
    <nav>
      <NavLinkPersist className={className} to='/'>{t('nav.servers')}</NavLinkPersist>
      <NavLinkPersist className={className} to='/download'>{t('nav.download')}</NavLinkPersist>
      <NavLinkPersist className={className} to='/host'>{t('nav.host')}</NavLinkPersist>
      <NavLinkPersist className={className} to='/about'>{t('nav.about')}</NavLinkPersist>
      <NavLinkPersist className={className} to='/settings'>{t('nav.settings')}</NavLinkPersist>
    </nav>
  )
}

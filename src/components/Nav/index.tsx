import { useTranslation } from 'react-i18next'
import { NavLinkPersist } from '../../supports/Persistence'
import style from './nav.module.scss'

export function Nav() {

  const className = ({ isActive }: { isActive: boolean }) => {
    return `${isActive ? style.active : ''} ${style.link}`
  }

  const { t } = useTranslation('translation')

  function tx(localKey: string): string {
    return t(`components.nav.${localKey}`)
  }

  return (
    <nav className={style.nav}> 
      <NavLinkPersist className={className} to='/' data-content='💻'>{tx('servers')}</NavLinkPersist>
      <NavLinkPersist className={className} to='/download' data-content='⏬'>{tx('download')}</NavLinkPersist>
      <NavLinkPersist className={className} to='/host' data-content='➕'>{tx('host')}</NavLinkPersist>
      <NavLinkPersist className={className} to='/about' data-content='⚠️'>{tx('about')}</NavLinkPersist>
      <NavLinkPersist className={className} to='/settings' data-content='⚙️'>{tx('settings')}</NavLinkPersist>
    </nav>
  )
}

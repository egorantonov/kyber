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
    // TODO: add rows/columns style
    <nav className={style.nav}> 
      <NavLinkPersist className={className} to='/'>{tx('servers')}</NavLinkPersist>
      <NavLinkPersist className={className} to='/download'>{tx('download')}</NavLinkPersist>
      <NavLinkPersist className={className} to='/host'>{tx('host')}</NavLinkPersist>
      <NavLinkPersist className={className} to='/about'>{tx('about')}</NavLinkPersist>
      <NavLinkPersist className={className} to='/settings'>{tx('settings')}</NavLinkPersist>
    </nav>
  )
}

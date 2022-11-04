import { NavLinkPersist } from '../../supports/Persistence'
import style from './nav.module.scss'

export function Nav() {

  const className = ({ isActive }: { isActive: boolean }) => {
    return `${isActive ? style.active : ''} ${style.link}`
  }

  return (
    <nav>
      <NavLinkPersist className={className} to='/'>Servers</NavLinkPersist>
      <NavLinkPersist className={className} to='/download'>Download</NavLinkPersist>
      <NavLinkPersist className={className} to='/host'>Host</NavLinkPersist>
      <NavLinkPersist className={className} to='/about'>About</NavLinkPersist>
      <NavLinkPersist className={className} to='/settings'>Settings</NavLinkPersist>
    </nav>
  )
}

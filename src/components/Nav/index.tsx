import { useTranslation } from 'react-i18next'
import { NavLinkPersist } from '../../supports/Persistence'
import { blurOrBackground } from '../../utils/ui'
import { SimpleIcon } from '../SimpleIcon'
import { SimpleIcons20x20, SimpleIcons24x24 } from './constants'
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
    <nav className={`${style.nav} ${blurOrBackground(10, false)}`}> 
      <NavLinkPersist className={className} to='/' data-content='💻'>
        <SimpleIcon height={24} width={24} path={SimpleIcons24x24.servers} />
        <span>
          {tx('servers')}
        </span>        
      </NavLinkPersist>
      <NavLinkPersist className={className} to='/download' data-content='⏬'>
        <SimpleIcon height={24} width={24} path={SimpleIcons24x24.download} />
        <span>
          {tx('download')}
        </span>        
      </NavLinkPersist>
      <NavLinkPersist className={className} to='/host' data-content='➕'>
        <SimpleIcon height={24} width={24} path={SimpleIcons24x24.host} />
        <span>
          {tx('host')}
        </span>        
      </NavLinkPersist>
      <NavLinkPersist className={className} to='/about' data-content='⚠️'>
        <SimpleIcon height={24} width={24} fill='var(--color)' path={SimpleIcons24x24.about} />
        <span>
          {tx('about')}
        </span>        
      </NavLinkPersist>
      <NavLinkPersist className={className} to='/settings' data-content='⚙️'>
        <SimpleIcon height={24} width={24} fill='var(--color)' path={SimpleIcons24x24.settings} />
        <span>
          {tx('settings')}
        </span>        
      </NavLinkPersist>
    </nav>
  )
}

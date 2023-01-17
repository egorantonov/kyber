import logo from '../../logo.svg'
import { Counter } from '../../features/counter/Counter'
import { Trans, useTranslation } from 'react-i18next'
import { InfoBlock } from '../../components/InfoBlock'
import { about, whatAboutKyber, getInvolved, aboutAuthor, otherProjects } from './data'
import ExternalLink from '../../components/ExternalLink'

export function AboutPage() {
  const { t } = useTranslation('translation')
  return (
    <div id="page-about">
      <div id='page-about-infoblocks' className='flex f-row flex-wrap'>
        <InfoBlock {...about}>
          <p style={{fontSize: 18, textTransform: 'none'}}>
            {t(`${about.id}.body`)}
          </p>
        </InfoBlock>
        <InfoBlock {...whatAboutKyber}>
          <p style={{fontSize: 18, textTransform: 'none'}}>
            {t(`${whatAboutKyber.id}.body`)}
          </p>
        </InfoBlock>
        <InfoBlock {...getInvolved}>
          <p  style={{fontSize: 24, textTransform: 'none'}}>
            <Trans i18nKey={`${getInvolved.id}.body`}>
            Have any suggestions? Found a bug? Create a new issue on <span>Github</span>
            </Trans>            
          </p>
        </InfoBlock>
        <InfoBlock {...aboutAuthor}>
          <p style={{fontSize: 20, textTransform: 'none'}}>
            <Trans i18nKey={`${aboutAuthor.id}.body`}>
            Created by <ExternalLink href='https://github.com/egorantonov' title='Github'>EYEMVX</ExternalLink> in 2023. Subscribe or send a friend request: search for @EYEMVX on Origin, Discord, Twitch and Youtube. Have a Github account? Make sure you starred <ExternalLink href='https://github.com/egorantonov/kyber' title='💫'>this project</ExternalLink> 💫
            </Trans> 
          </p>
        </InfoBlock>
        <InfoBlock {...otherProjects}>
          <p style={{fontSize: 24, textTransform: 'none'}}>
            <Trans i18nKey={`${otherProjects.id}.body`}>
            Love electronic dance music? Subscribe to my EDM podcast <span>PHASE FLOW</span>
            </Trans> 
          </p>
        </InfoBlock>
      </div>
    </div>
  )
}

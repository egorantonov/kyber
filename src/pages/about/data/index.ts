import { KYBER_API } from '../../../api/endpoints'
import { InfoBlockProps } from '../../../components/InfoBlock'

export const about: InfoBlockProps = {
  id: 'pages.about.about',
  href: '',
  className: 'wide',
  background: `linear-gradient(135deg, var(--bg-color), var(--bg-color-alpha), #fff0), url(${KYBER_API.hostName}/static/images/maps/S8-Felucia-Levels-MP-Felucia_01-Felucia_01.jpg)`
}

export const whatAboutKyber: InfoBlockProps = {
  id: 'pages.about.whatAboutKyber',
  href: '',
  className: '',
  background: `linear-gradient(135deg, var(--bg-color), var(--bg-color-alpha), #fff0), url(${KYBER_API.hostName}/static/images/maps/Levels-Space-SB_DroidBattleShip_01-SB_DroidBattleShip_01.jpg)`
}

export const getInvolved: InfoBlockProps = {
  id: 'pages.about.getInvolved',
  href: 'https://github.com/egorantonov/kyber/issues',
  className: '',
  background: `linear-gradient(135deg, var(--bg-color), var(--bg-color-alpha), #fff0), url(${KYBER_API.hostName}/static/images/maps/Levels-MP-DeathStar02_01-DeathStar02_01.jpg)`
}

export const aboutAuthor: InfoBlockProps = {
  id: 'pages.about.aboutAuthor',
  href: '',
  className: '',
  background: `linear-gradient(135deg, var(--bg-color), var(--bg-color-alpha), #fff0), url(${KYBER_API.hostName}/static/images/maps/Levels-MP-Hoth_01-Hoth_01.jpg)`
}

export const otherProjects: InfoBlockProps = {
  id: 'pages.about.otherProjects',
  href: 'https://phaseflow.github.io/podcast',
  className: '',
  background: `linear-gradient(135deg, var(--bg-color), var(--bg-color-alpha), #fff0), url(${KYBER_API.hostName}/static/images/maps/Levels-Space-SB_Fondor_01-SB_Fondor_01.jpg)`
}
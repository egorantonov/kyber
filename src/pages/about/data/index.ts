import { KYBER_API } from '../../../api/endpoints'
import { InfoBlockProps } from '../../../components/InfoBlock'
import { GITHUB_EYEMVX } from '../../../constants'
import { UniqueMaps } from '../../../data/maps'

const UNIQUE_MAPS = UniqueMaps()

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max)
}

const INFOBLOCK_AMOUNT = 6

function getRandomPics(): string[] {
  const pics: string[] = []
  const map = new Map()  

  while (pics.length < INFOBLOCK_AMOUNT) {
    const r = getRandomInt(UNIQUE_MAPS.length)
    if (!map.has(r)) {
      map.set(r, true)
      pics.push(UNIQUE_MAPS[r].replaceAll('/', '-'))
    }
  }

  return pics
}

const PICS = getRandomPics()

export const about: InfoBlockProps = {
  id: 'pages.about.about',
  href: '',
  className: 'wide',
  // background: `linear-gradient(135deg, var(--bg-color), var(--bg-color-alpha), #fff0), url(${KYBER_API.hostName}/static/images/maps/S8-Felucia-Levels-MP-Felucia_01-Felucia_01.jpg)`
  background: `linear-gradient(135deg, var(--bg-color), var(--bg-color-alpha), #fff0), url(${KYBER_API.hostName}/static/images/maps/${PICS[0]}.jpg)`
}

export const whatAboutKyber: InfoBlockProps = {
  id: 'pages.about.whatAboutKyber',
  href: '',
  className: '',
  // background: `linear-gradient(135deg, var(--bg-color), var(--bg-color-alpha), #fff0), url(${KYBER_API.hostName}/static/images/maps/Levels-Space-SB_DroidBattleShip_01-SB_DroidBattleShip_01.jpg)`
  background: `linear-gradient(135deg, var(--bg-color), var(--bg-color-alpha), #fff0), url(${KYBER_API.hostName}/static/images/maps/${PICS[1]}.jpg)`
}

export const copyright: InfoBlockProps = {
  id: 'pages.about.copyright',
  href: 'https://github.com/battledash',
  className: '',
  background: `linear-gradient(135deg, var(--bg-color), var(--bg-color-alpha), #fff0), url(${KYBER_API.hostName}/static/images/maps/${PICS[2]}.jpg)`
}

export const getInvolved: InfoBlockProps = {
  id: 'pages.about.getInvolved',
  href: `${GITHUB_EYEMVX}/kyber/issues`,
  className: '',
  // background: `linear-gradient(135deg, var(--bg-color), var(--bg-color-alpha), #fff0), url(${KYBER_API.hostName}/static/images/maps/Levels-MP-DeathStar02_01-DeathStar02_01.jpg)`
  background: `linear-gradient(135deg, var(--bg-color), var(--bg-color-alpha), #fff0), url(${KYBER_API.hostName}/static/images/maps/${PICS[3]}.jpg)`
}

export const aboutAuthor: InfoBlockProps = {
  id: 'pages.about.aboutAuthor',
  href: '',
  className: '',
  // background: `linear-gradient(135deg, var(--bg-color), var(--bg-color-alpha), #fff0), url(${KYBER_API.hostName}/static/images/maps/Levels-MP-Hoth_01-Hoth_01.jpg)`
  background: `linear-gradient(135deg, var(--bg-color), var(--bg-color-alpha), #fff0), url(${KYBER_API.hostName}/static/images/maps/${PICS[4]}.jpg)`
}

export const otherProjects: InfoBlockProps = {
  id: 'pages.about.otherProjects',
  href: 'https://phaseflow.github.io/podcast',
  className: '',
  // background: `linear-gradient(135deg, var(--bg-color), var(--bg-color-alpha), #fff0), url(${KYBER_API.hostName}/static/images/maps/Levels-Space-SB_Fondor_01-SB_Fondor_01.jpg)`
  background: `linear-gradient(135deg, var(--bg-color), var(--bg-color-alpha), #fff0), url(${KYBER_API.hostName}/static/images/maps/${PICS[5]}.jpg)`
}
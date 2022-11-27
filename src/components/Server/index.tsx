import { KyberServer } from '../../api/models'
import { BattlefrontMapName } from '../../data/models'
import './styles.scss'

type ServerProps = {
    s: KyberServer,
    mapName?: BattlefrontMapName,
    modeName?: string,
    showModal?: any
}

function RemoveVersion(modName: string): string {
  return encodeURIComponent(modName.substring(0, modName?.lastIndexOf('(') - 1))
}

const Server = ({ s, mapName, modeName, showModal }: ServerProps) => {
  const IMG_URL_PREFIX = 'https://kyber.gg/static/images/maps/'
  const IMG_URL_POSTFIX = '.jpg'
  const NO_MODS = 'NO MODS'
  const MODS_FREE = 'MODS FREE'
  const MODS_SEARCH = 'https://www.nexusmods.com/starwarsbattlefront22017/search/?gsearchtype=mods&gsearch='
  const MODS_ICON = 'https://images.nexusmods.com/favicons/ReskinOrange/favicon-16x16.png'
  const LOCKED = '🔐\xa0'
  const PRIVATE = '[PRIVATE]'
  const STARTED = '🕓'
  const IS_DARK = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

  const mapImage = IMG_URL_PREFIX + s?.map?.replaceAll('/', '-') + IMG_URL_POSTFIX
  const modTitle = s.mods?.length === 0
    ? MODS_FREE
    : JSON.stringify(s.mods).replaceAll('","', '\n').replaceAll('["', '').replaceAll('"]', '')
  const privateTitle = s.requiresPassword ? PRIVATE : ''
  const mobileBackGround = IS_DARK
    ? 'linear-gradient(#000000c0, #000000b0, #000000c0)'
    : 'linear-gradient(#ffffffc0, #ffffffb0, #ffffffc0)'

  return (
    <li className="server" data-id={s.id}
      onClick={() => showModal(s)}
      style={{
        background: `${mobileBackGround}, url(${mapImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }} >
      <div className="server-image-wrapper">
        <div className="server-image"
          title={modeName + ' on ' + mapName}
          style={{ backgroundImage: `url(${mapImage})` }}>
        </div>
      </div>

      <div className="server-info">
        <div className="server-info-server-name" title={privateTitle}>
          {s.requiresPassword && (<span>{LOCKED}</span>)}
          <span className="uppercase">{s.name}</span>
        </div>
        <div className="server-info-server-params">
          <span className="uppercase">{modeName}</span>
          {mapName && (
            <>
              <span> on </span>
              <span className="uppercase">{mapName}</span>
            </>
          )}
          {s.host && s.host.toLowerCase() !== 'unknown' && (
            <>
              <span> by </span>
              <span className="uppercase">{s.host}</span>
            </>
          )}

        </div>
        <div className="server-info-server-mods">
          <span title={modTitle}>
            {s.mods?.length === 0
              ? (<span className="uppercase" style={{ color: '#0d4' }}>{NO_MODS}</span>)
              : (<details onClick={(e) => { e.stopPropagation() }}>
                <summary className="uppercase">Mods required: {s.mods?.length}</summary>
                <div className="server-mods-details-content">
                  {s.mods?.map((mod, index) => (
                    <div key={`${index}_${mod}`}>
                      <a href={`${MODS_SEARCH}${RemoveVersion(mod)}`} target="_blank" rel="noreferrer">
                        <img src={MODS_ICON} loading="lazy" />
                        {mod}
                      </a>
                    </div>
                  ))}
                </div>

              </details>)}
          </span>
        </div>
      </div>
      <div className="server-utilization">
        <div>
          <span className="uppercase">👥{s.users}/{s.maxPlayers}</span>
        </div>
        <div >
          <progress value={s.users} max={s.maxPlayers}></progress>
        </div>
      </div>
      <div className="server-location">
        <div>
          <img src={s.proxy?.flag} alt="location flag" className="server-flag-image" />
          <span className="uppercase">
            {s.proxy?.name}
          </span>
        </div>
        <div className="server-started">
          <span className="uppercase">{STARTED} {s.startedAtPretty}</span>
        </div>
      </div>
      <div className="server-join">
        <button className="submit-button join-button" onClick={() => showModal(s)}>
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="currentColor" d="M176 480C148.6 480 128 457.6 128 432v-352c0-25.38 20.4-47.98 48.01-47.98c8.686 0 17.35 2.352 25.02 7.031l288 176C503.3 223.8 512 239.3 512 256s-8.703 32.23-22.97 40.95l-288 176C193.4 477.6 184.7 480 176 480z"></path>
          </svg>
        </button>
      </div>

    </li>
  )
}

export default Server
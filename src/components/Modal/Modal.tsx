import { Fragment, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { KYBER_API } from '../../api/endpoints'
import { KyberServer, MessageResponse } from '../../api/models'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { PlayRequest, Side } from '../../data/models'
import { isNullOrWhiteSpace } from '../../extensions/string'
import { CONSTANTS } from '../../features/Kyber/constants'
import { isModalOpen, toggleModal } from '../../features/Kyber/Servers/serversSlice'

import './styles.scss'

const MODS_SEARCH = 'https://www.nexusmods.com/starwarsbattlefront22017/search/?gsearchtype=mods&gsearch='
const MODS_ICON = 'https://images.nexusmods.com/favicons/ReskinOrange/favicon-16x16.png'
const sides = [Side.Light, Side.Dark]

function RemoveVersion(modName: string): string {
  const modVersionRegExp = /\/|\\|\||-|V\d.*\d*/gm
  const searchPhrase = modName
    .substring(0, modName?.lastIndexOf('(') - 1)
    .replaceAll(modVersionRegExp, ' ')
  return encodeURIComponent(searchPhrase)
}

export interface ModalProps {
  modalServer?: KyberServer;
}

export function Modal({ modalServer }: ModalProps) {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const status = useAppSelector(isModalOpen)
  const className = `modal${status ? ' open' : ''}`

  document.body.style.overflowY = status ? 'hidden' : 'scroll'

  const [faction, setFaction] = useState(Side.Light)
  const [password, setPassword] = useState('')

  async function joinServer(id: string, faction: Side, password: string): Promise<void> {
    const data: PlayRequest = { id, faction: +faction, password: password ?? '' }
    console.log(`You have chosen: ${Side[faction]} Side of the force`)
    await fetch(KYBER_API.play, {
      method: CONSTANTS.METHOD.POST,
      body: JSON.stringify(data),
      headers: {
        [CONSTANTS.HEADER.NAME.CONTENT_TYPE]: `${CONSTANTS.HEADER.VALUE.APP_JSON}`
      }
    })
      .then((response) => response.json())
      .then((data: MessageResponse) => {
        console.log(data.message)
        alert(data.message)
        if (data.message === CONSTANTS.KYBER.PLAY_SUCCESS) {
          closeServer()
        }
      })
      .catch(e => {
        // console.error(`${CONSTANTS.MESSAGE.ERROR} ${e.message} Endpoint: ${KYBER_API.play}`);
        console.error(e)
      })
  }

  function closeServer() {
    dispatch(toggleModal())
    setPassword('')
  }

  if (!status) {
    return null
  }

  return (
    <div id="modal" className={className}>
      {/* CLOSE BUTTON */}
      <div className='modal-header'>
        <div>{modalServer?.name}</div>
        <div onClick={() => closeServer()} style={{ cursor: 'pointer' }}>✕</div>
      </div>

      {/* BODY */}
      <div className='modal-body'>
        <div>{modalServer?.description}</div>
        <div>{CONSTANTS.KYBER.JOIN_SERVER_MESSAGE}</div>


        <div className="">
          <span>Preferred team: </span>
          {!modalServer?.autoBalanceTeams && (
            <div className="radio-wrapper filter-switch">              
              {sides.map((x) => (
                <div className="filter-switch-item" key={x}>
                  <input
                    className="radio"
                    type="radio"
                    name="faction"
                    id={Side[x]}
                    value={x}
                    checked={faction === x}
                    onChange={(e) => setFaction(+e.target.value)}
                  />
                  <label htmlFor={Side[x]}>{t(`common.side.${Side[x]}`).toLocaleUpperCase()}</label>
                </div>
              ))}            
            </div>
          )}
          {modalServer?.requiresPassword && (
            <div>
              <span>Password: </span>
              <input className="" id="password" required
                name="password" type="password" placeholder="Type password here"
                onChange={(e) => setPassword(e.target.value)} />
            </div>
          )}
        </div>

        <div>
          <div className="server-info-server-mods" style={{ maxWidth: '500px' }}>
            <span>
              {modalServer?.mods?.length === 0
                ? (<div style={{ color: 'var(--highlight)' }}>{CONSTANTS.KYBER.NO_MODS_WARNING}</div>)
                : (<>
                  <div style={{ color: 'var(--highlight)' }}>{CONSTANTS.KYBER.MODS_WARNING}</div>
                  <div className="server-mods-details-content">
                    {modalServer?.mods?.map((mod, index) => (
                      <div key={`${index}_${mod}`}>
                        <a href={`${MODS_SEARCH}${RemoveVersion(mod)}`} target="_blank" rel="noreferrer">
                          <img src={MODS_ICON} loading="lazy" />
                          {mod}
                        </a>
                      </div>
                    ))}
                  </div>
                </>
                )}
            </span>
          </div>
        </div>
      </div>

      {/* BUTTONS */}
      <div className='modal-buttons'>
        <button className="submit-button bd-filter-blur-5" disabled={!!modalServer && !!modalServer.requiresPassword && isNullOrWhiteSpace(password)}
          onClick={() => !!modalServer && joinServer(modalServer.id, faction, password)}>
          {CONSTANTS.BUTTON.JOIN}
        </button>
        <button className="submit-button bd-filter-blur-5" onClick={() => closeServer()}>{CONSTANTS.BUTTON.CLOSE}</button>
      </div>
    </div>
  )
}
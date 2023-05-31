import { useState, useRef } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { KYBER_API } from '../../api/endpoints'
import { KyberServer, MessageResponse } from '../../api/models'
import { useAppSelector, useAppDispatch, useEscapeKey } from '../../app/hooks'
import { PlayRequest, Side } from '../../data/models'
import { isNullOrWhiteSpace } from '../../extensions/string'
import { CONSTANTS } from '../../features/Kyber/constants'
import { ImageContainer } from './Components/ImageContainer'
import { isModalOpen, toggleModal } from '../../features/Kyber/Servers/serversSlice'

//import './styles.scss'
import style from './modal.module.scss'
import { IMG_NEXUS_MOD, MODS_SEARCH } from '../../constants'

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
        alert(tx(data.message))
        if (data.message === CONSTANTS.KYBER.PLAY_SUCCESS) {
          closeModal()
        }
      })
      .catch(e => {
        // console.error(`${CONSTANTS.MESSAGE.ERROR} ${e.message} Endpoint: ${KYBER_API.play}`);
        console.error(e)
      })
  }

  function closeModal() {
    dispatch(toggleModal(false))
    setPassword('')
  }

  function tx(localKey: string): string {
    return t(`components.modal.${localKey}`)
  }

  useEscapeKey(() => closeModal())

  if (!status) {
    return null
  }

  return (
    <div id="modal" className={`${style.modal_wrapper} `} onClick={() => closeModal()}>
      <div style={{margin: '0 25px'}}>
        <div className={`r ${style.modal}`} onClick={(e) => { e.stopPropagation() }}>

          <ImageContainer map={modalServer?.map as string} mode={modalServer?.mode as string} />

          <div className='flex c l12 m12 s12'>
            <div className={`${style.form_container} flex flex-column flex-content-space-between`}>
              {/* HEADER */}
              <div className={`${style.modal_header} flex flex-content-space-between`}>
                <div>{modalServer?.name}</div>
                <div onClick={() => closeModal()} style={{ cursor: 'pointer' }}>✕</div>
              </div>
          
              {/* BODY */}
              <div className='modal-body'>
            
                {modalServer?.description && (
                  <div id='modal-description' className={`${style.line} ${style.description}`}>
                    {tx('description')}: {modalServer?.description}
                  </div>
                )}
                <div id='modal-join_message' className={style.line}>
                  {tx('join')}
                </div>
                {!modalServer?.autoBalanceTeams && (
                  <div id='modal-side' className={`r ${style.line} ${style.input} flex-content-start`}>
                    <span className='c s10 m6 l6'>{tx('faction')}: </span>
                    <div className='c s12 m6 l6 radio-wrapper x2 filter-switch'>
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
                  </div>
                )}
                {modalServer?.requiresPassword && (
                  <div id='modal-password' className={`r ${style.line} ${style.input} flex-content-start`}>
                    <span className='c s10 m6 l6'>{tx('password')}: </span>
                    <input className='c s12 m6 l6' id="password" required
                      name="password" type="password" placeholder={tx('password_placeholder')}
                      onChange={(e) => setPassword(e.target.value)} />
                  </div>
                )}           

                {modalServer?.mods?.length === 0
                  ? (<div style={{ color: 'var(--highlight)' }}>{tx('no_mods_warning')}</div>)
                  : (<>
                    <div style={{ color: 'var(--highlight)' }}>
                      <p>
                        <Trans i18nKey='components.modal.mods_warning'>
                            Warning: This server requires Frosty mods {{ length: modalServer?.mods?.length }}.
                            Please download and apply them in this exact load order before joining this server.
                            Click on mod to search on NexusMods.
                        </Trans>
                      </p>
                      {/* {tx('mods_warning')} */}
                    </div>
                    <div className={style.mods_details_content}>
                      {modalServer?.mods?.map((mod, index) => (
                        <div key={`${index}_${mod}`}>
                          <a href={`${MODS_SEARCH}${RemoveVersion(mod)}`} target="_blank" rel="noreferrer">
                            <img src={IMG_NEXUS_MOD} loading="lazy" />
                            <span>&nbsp;{mod}</span>
                          </a>
                        </div>
                      ))}
                    </div>
                  </>
                  )}
              </div>

              {/* BUTTONS */}
              <div className='modal-buttons flex flex-content-center'>
                <button className="submit-button bd-filter-blur-5" disabled={!!modalServer && !!modalServer.requiresPassword && isNullOrWhiteSpace(password)}
                  onClick={() => !!modalServer && joinServer(modalServer.id, faction, password)}>
              ✅ {tx('button_join')}
                </button>
                <button className="submit-button bd-filter-blur-5" onClick={() => closeModal()}>
              ❌ {tx('button_close')}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
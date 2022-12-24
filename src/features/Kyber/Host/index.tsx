import { useEffect, useLayoutEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { KYBER_API } from '../../../api/endpoints'
import { hostServer } from '../../../api/methods'
import { ApiResponse, HostKyberServerRequest, HostKyberServerResponse, KyberProxy } from '../../../api/models'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { MAPS } from '../../../data/maps'
import { BattlefrontMap, Side } from '../../../data/models'
import { MODES } from '../../../data/modes'
import { getJson } from '../../../extensions/fetch'
import { fetchProxiesAsync, getProxyStatus, selectProxies, Status } from '../Servers/serversSlice'

function getModeMaps(mode: string): BattlefrontMap[] {
  const modeMapsStringArray = MODES.find(md => md.mode === mode)?.maps

  // TODO: rewrite and check duplicate names if needed for each mode
  const modeMaps = modeMapsStringArray?.map(mapId => {return MAPS.find(m => m.map === mapId)})
  //const modeMaps = MAPS.filter(m => modeMapsStringArray?.includes(m.map))
  return modeMaps as BattlefrontMap[]
}

function processResponse(apiResponse: ApiResponse<HostKyberServerResponse>, t: any) {
  
  if (apiResponse.success) {
    alert(`${apiResponse.data?.message}\nServer ID: ${apiResponse.data?.id})`)
  }  
  else if (!apiResponse.success && apiResponse.data?.message === 'Bad Request') {
    const firstRow = t('features.host.messages.badRequestValidationFailed') // t('badRequest.validationFailed')
    const failedValidations = apiResponse.data.validations?.body
    const secondRow = failedValidations?.map(v => {
      return `\n${t('features.host.validation.property')} '${t(`features.host.form.${v.property.replace('instance.','')}`)}' ${t(`features.host.validation.${v.messages[0]}`)}`
    })

    alert (`${firstRow}${secondRow}`)
  }
  else if (!apiResponse.success && apiResponse.data?.message != undefined) {
    alert (`Kyber API error: ${apiResponse.data?.message}`)
  }
  else {
    alert (`Unknown error: ${apiResponse.errors[0]}`)
  }
}

export function Host() {
  const { t, i18n } = useTranslation('translation')

  //const status = useAppSelector(getProxyStatus)
  const [mode, setMode] = useState(MODES[0].mode)
  const [map, setMap] = useState(MAPS[0].map)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [description, setDescription] = useState('')
  const [balance, setBalance] = useState(true)
  const [faction, setFaction] = useState(Side.Light)
  const [maxPlayers, setMaxPlayers] = useState(40)

  // TODO: problem with fetch
  const initialProxyState: KyberProxy[] = []
  //const initialProxyState = useAppSelector(selectProxies)

  const [proxies, setProxies] = useState(initialProxyState)
  const [proxyIp, setProxyIp] = useState('')

  useEffect(() => {
    
    /* DO NOT DELETE */
    getJson(KYBER_API.proxies)
      .then(
        (data: KyberProxy[]) => {
          setProxies(data)
          data.length > 0 && setProxyIp(data[0].ip)
        },
        (error) => {
          console.error(error)
        }
      )

  }, [])



  async function handleSubmit(e: any) {
    e.preventDefault()

    const request: HostKyberServerRequest = {
      autoBalanceTeams: balance,
      description,
      displayInBrowser: true,
      faction,
      kyberProxy: proxyIp ?? '',
      map,
      maxPlayers,
      mode,
      name,
      password
    }

    hostServer(request)
      .then(apiResponse => processResponse(apiResponse, t))
      .catch((e) => console.log(e))
    //processResponse(apiResponse)
  }

  return(
    <div id="host">
      <form id="form-host">
        <div>
          <p>{t('features.host.form.settings')}</p>  

          {/* INPUT - MODES */}
          <div className="input-modes">
            <label htmlFor="input-modes">{t('features.host.form.mode')}: </label>
            <select value={mode} id="input-modes" name="input-modes" onChange={(e) => setMode(e.target.value)}>
              {/* <option key='empty' value=''>{ALL}</option> */}
              {MODES.map((m) => (
                <option key={m.name} value={m.mode}>{m.name}</option>
              ))}
            </select>
          </div>

          {/* INPUT - MAPS */}
          <div className="input-maps">
            <label htmlFor="input-maps">{t('features.host.form.map')}: </label>
            <select value={map} id="input-maps" name="input-maps" onChange={(e) => setMap(e.target.value)}>
              {getModeMaps(mode).map((m) => ( 
                <option key={m.map} value={m.map}>{m.name}</option>
              ))}
            </select>
          </div>

          {/* INPUT - NAME */}
          <div className="input-name">
            <label htmlFor="input-name">{t('features.host.form.name')}: </label>
            <input id="input-name" type="text" required={true} placeholder="Required" onChange={(e) => setName(e.target.value)}></input>
          </div>

          {/* INPUT - PASSWORD */}
          <div className="input-password">
            <label htmlFor="input-password">{t('features.host.form.password')}: </label>
            <input id="input-password" type="password" placeholder="Optional" onChange={(e) => setPassword(e.target.value)}></input>
          </div>

          <p>{t('features.host.form.advanced')}</p>

          {/* INPUT - DESCRIPTION */}
          <div className="input-description">
            <label htmlFor="input-description">{t('features.host.form.description')}: </label>
            <input id="input-description" type="text" placeholder="Optional" onChange={(e) => setDescription(e.target.value)}></input>
          </div>
          
          {/* INPUT - BALANCE */}
          <div className="input-balance">
            {t('features.host.form.balance')}:
            <input type="radio" id="balance-on" name="balance" value="on" checked={balance} 
              onChange={() => setBalance(true)}/>
            <label htmlFor="balance-on">{t('common.switch.on')}</label>
            <input type="radio" id="balance-off" name="balance" value="off" checked={!balance}
              onChange={() => setBalance(false)}/>
            <label htmlFor="balance-off">{t('common.switch.off')}</label>
          </div>

          {/* INPUT - FACTION */}
          <div className="input-faction">
            {t('features.host.form.faction')}:
            <input type="radio" id="faction-light" name="faction" value={Side.Light} checked={faction === Side.Light} 
              onChange={() => setFaction(Side.Light)}/>
            <label htmlFor="faction-light">{t(`common.side.${Side[Side.Light]}`)}</label>
            <input type="radio" id="faction-dark" name="faction" value={Side.Dark} checked={faction === Side.Dark}
              onChange={() => setFaction(Side.Dark)}/>
            <label htmlFor="faction-dark">{t(`common.side.${Side[Side.Dark]}`)}</label>
          </div>

          {/* INPUT - PROXIES */}
          
          <div className="input-proxies">
            <label htmlFor="input-proxies">{t('features.host.form.proxy')}: </label>
            <select value={proxyIp} id="input-proxies" name="input-proxies" onChange={(e) => setProxyIp(e.target.value)}>
              {proxies.map((p) => (
                <option key={p.ip} value={p?.ip ?? 'loading'}>{p.name}</option>
              ))}
            </select>
            Selected proxy: {proxyIp} Flag url: {proxies.find(p => p.name === proxyIp)?.flag}
            <img src={proxies.length === 0 ? '' : proxies.find(p => p.name === proxyIp)?.flag} alt='proxy flag' width={24} />
          </div>

          {/* INPUT - MAX PLAYERS */}
          <div className="input-players">
            <label htmlFor="input-players">{t('features.host.form.maxPlayers')}</label>
            <input id="input-players" type="range" min={2} max={64} onChange={(e) => setMaxPlayers(+e.target.value)}/>{maxPlayers}
          </div>

          <input type="button" value="Host" onClick={(e) => handleSubmit(e)} />
        </div>
      </form>
    </div>
  )
}
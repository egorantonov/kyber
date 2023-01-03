import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { KYBER_API } from '../../../api/endpoints'
import { hostServer } from '../../../api/methods'
import { ApiResponse, HostKyberServerRequest, HostKyberServerResponse, KyberProxy } from '../../../api/models'
import { MAPS } from '../../../data/maps'
import { Side } from '../../../data/models'
import { MODES } from '../../../data/modes'
import { getJson } from '../../../extensions/fetch'
import { Mode } from './Components/Mode'
import { Map } from './Components/Map'
import { Name } from './Components/Name'
import { Password } from './Components/Password'
import { Description } from './Components/Description'
import { Balance } from './Components/Balance'
import { Faction } from './Components/Faction'
import { Proxies } from './Components/Proxies'
import { MaxPlayers } from './Components/Players'
import { url } from 'inspector'

// TODO: move to global constants
const IMG_URL_PREFIX = `${KYBER_API.hostName}/static/images/maps/`
const IMG_URL_POSTFIX = '.jpg'

function mapImage(value?: string): string {
  return IMG_URL_PREFIX + value?.replaceAll('/', '-') + IMG_URL_POSTFIX
}

function processResponse(apiResponse: ApiResponse<HostKyberServerResponse>, t: any) {
  
  if (apiResponse.success) {
    alert(`${apiResponse.data?.message}\nServer ID: ${apiResponse.data?.id})`)
  }  
  else if (!apiResponse.success && apiResponse.data?.message === 'Bad Request') {
    const firstRow = t('features.host.messages.badRequestValidationFailed')
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
  const { t } = useTranslation('translation')

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
          // TODO: temp sort, rewrite to ping and get time order
          setProxies(data.sort((a, b) =>  a.name?.localeCompare(b.name ?? '') ?? 0))
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
  }

  const imageUrl = mapImage(map)

  return(
    <div id="host">
      <form id="form-host">
        <div className="bd-filter-blur-10" style={{
          margin: 10, 
          padding: 10,
          // backgroundColor: 'var(--bg-color-substrate)', 
          background: `linear-gradient(90deg, var(--bg-color), var(--bg-color-alpha), var(--bg-color-substrate)), url(${imageUrl}) center center / cover`,          
          border: '1px solid var(--color-substrate)',
          borderRadius: 5
        }}>
          {/* TODO: img is not updated after mode changed */}
          <img style={{width: 80, height: 45, borderRadius: 5}} src={mapImage(map)} alt={map} />
          <p>{t('features.host.form.settings')}</p>
          <Mode mode={mode} setMode={setMode}  />
          <Map map={map} setMap={setMap} selectedMode={mode} />
          <Name setName={setName} />
          <Password setPassword={setPassword} />

          <p>{t('features.host.form.advanced')}</p>
          <Description setDescription={setDescription} />
          <Balance balance={balance} setBalance={setBalance} />
          <Faction faction={faction} setFaction={setFaction} />        
          <Proxies proxies={proxies} proxyIp={proxyIp} setProxyIp={setProxyIp} />
          <MaxPlayers maxPlayers={maxPlayers} setMaxPlayers={setMaxPlayers} />
          <button className='bd-filter-blur-5' type="button" value="Host" onClick={(e) => handleSubmit(e)} >Host</button>
        </div>
      </form>
    </div>
  )
}
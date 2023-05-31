import { useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { hostServer } from '../../../api/methods'
import { ApiResponse, HostKyberServerRequest, HostKyberServerResponse, KyberProxy } from '../../../api/models'
import { MAPS } from '../../../data/maps'
import { Side } from '../../../data/models'
import { MODES } from '../../../data/modes'
import { Mode } from './Components/Mode'
import { Map } from './Components/Map'
import { Name } from './Components/Name'
import { Password } from './Components/Password'
import { Description } from './Components/Description'
import { Balance } from './Components/Balance'
import { Faction } from './Components/Faction'
import { Proxies } from './Components/Proxies'
import { MaxPlayers } from './Components/Players'
import style from './host.module.scss'
import { Buttons } from './Components/Buttons'
import { isNullOrEmpty, isNullOrWhiteSpace } from '../../../extensions/string'
import { ImageContainer } from './Components/ImageContainer'
import ExternalLink from '../../../components/ExternalLink'
import { KYBER_API } from '../../../api/endpoints'
import { DISCORD_KYBER } from '../../../constants'

function processResponse(apiResponse: ApiResponse<HostKyberServerResponse>, t: any) {
  
  if (apiResponse.success) {
    const success = t('features.host.messages.success')
    const serverId = `\nServer ID: ${apiResponse.data?.id?.toUpperCase()}`
    alert(success + serverId)
  }  
  else if (!apiResponse.success && apiResponse.data?.message === 'Bad Request') {
    const firstRow = t('features.host.messages.badRequestValidationFailed')
    const failedValidations = apiResponse.data.validations?.body
    
    const secondRow = failedValidations?.map(v => {
      const firstError = v.messages[0].split(':')
      const property = `\n${t('features.host.validation.property')} `
      const propertyKey = `«${t(`features.host.form.${v.property.replace('instance.','')}`)}» `
      const firstErrorKey = t(`features.host.validation.${firstError[0]}`)
      const firstErrorValue = firstError[1] ? `\n${firstError[1]?.replaceAll(',', ',\n')}` : ''

      return property + propertyKey + firstErrorKey + firstErrorValue
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

interface HostProps {
  proxies: KyberProxy[]
}

export function Host({proxies}: HostProps) {
  const { t } = useTranslation('translation')

  const [mode, setMode] = useState(MODES[0].mode)
  const [map, setMap] = useState(MAPS[0].map)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [description, setDescription] = useState('')
  const [balance, setBalance] = useState(true)
  const [faction, setFaction] = useState(Side.Light)
  const [maxPlayers, setMaxPlayers] = useState(40)
  const [proxyIp, setProxyIp] = useState('')
  const [validationFailed, setValidationFailed] = useState(false)

  async function handleSubmit(e: any) {
    e.preventDefault()

    if (isNullOrEmpty(name)) {
      setValidationFailed(true)
      return
    }
    else {
      setValidationFailed(false)
    }

    const request: HostKyberServerRequest = {
      autoBalanceTeams: balance,
      description,
      displayInBrowser: true,
      faction,
      kyberProxy: isNullOrWhiteSpace(proxyIp) ? proxies[0].ip : proxyIp, // TODO: dirty little hack
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

  function handleReset() {
    setMode(MODES[0].mode)
    setMap(MAPS[0].map)
    setName('')
    setPassword('')
    setDescription('')
    setBalance(true)
    setFaction(Side.Light)
    setMaxPlayers(40)
    setProxyIp(proxies[0].ip)
    setValidationFailed(false)
  }

  function tx(localKey: string): string {
    return t(`features.host.form.${localKey}`)
  }

  //const proxy = proxies?.find(p => p.ip === proxyIp)

  return(
    <div id="host" className={`r ${style.host}`}>
      <div className={`c l12 m12 s12 ${style.form_container}`}>
        <form id="form-host"  >       
          <h2 className='uppercase'>{tx('settings')}</h2>
          <Mode mode={mode} setMode={setMode} setMap={setMap} />
          <Map map={map} setMap={setMap} selectedMode={mode} />
          <Name name={name} setName={setName} setValidationFailed={setValidationFailed} />
          <Password password={password} setPassword={setPassword} />

          <h2 className='uppercase'>{tx('advanced')}</h2>
          <Description description={description} setDescription={setDescription} />
          <Balance balance={balance} setBalance={setBalance} />
          <Faction faction={faction} setFaction={setFaction} />        
          <Proxies proxies={proxies} proxyIp={proxyIp} setProxyIp={setProxyIp} />
          <MaxPlayers maxPlayers={maxPlayers} setMaxPlayers={setMaxPlayers} />
          <div style={{color: 'var(--highlight)'}}>{validationFailed ? tx('validation_tooltip') : ' '}</div>
          {proxies.length 
            ? <Buttons tx={tx} handleReset={handleReset} handleSubmit={handleSubmit} name={name} />
            : (
              <Trans i18nKey="features.status.message">
                Hmmm... Kyber API seems to be down. Try open 
                <ExternalLink href={KYBER_API.hostName}>Kyber official site</ExternalLink>
                or check status on 
                <ExternalLink href={DISCORD_KYBER}>
                Discord server
                </ExternalLink>
              </Trans>
            )
          }
        </form>
      </div>
      <ImageContainer map={map} mode={mode} />
    </div>
  )
}
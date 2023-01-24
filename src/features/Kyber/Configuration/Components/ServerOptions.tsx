import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { KyberServerOptions } from '../models'
import { MODES } from '../../../../data/modes'
import { ensureMapName } from '../../../../utils/maps'

interface ServerOptionsProps {
  serverOptions: KyberServerOptions
}

export function ServerOptions({serverOptions}: ServerOptionsProps) {

  const map = ensureMapName(serverOptions?.MAP ?? '', serverOptions?.MODE ?? '')
  const mode = MODES.find(m => m.mode === serverOptions?.MODE)?.name
  const description = window.atob(serverOptions?.DESCRIPTION || '')
  const balance = serverOptions?.AUTO_BALANCE_TEAMS ? '✅' : '❌'

  const { t } = useTranslation('translation')
  
  function tx(localKey: string): string {
    return t(`features.config.${localKey}`)
  }

  return (
    <Fragment>        
      <tr>
        <td colSpan={2}><b>{tx('serverOptions')}</b></td>
      </tr>
      {serverOptions?.DESCRIPTION && <tr>
        <td><b>{tx('description')}</b>:</td>
        <td>{description}</td>
      </tr>}
      <tr>
        <td><b>{tx('balanced')}</b></td>
        <td> {balance}</td>
      </tr>
      <tr>
        <td><b>{tx('map')}</b></td>
        <td>
          {t(`maps.${map}`).replace('maps.', '')}
        </td>
      </tr>
      <tr>
        <td><b>{tx('mode')}</b></td>
        <td>
          {t(`modes.${mode}`).replace('modes.', '')}
        </td>
      </tr>
      <tr>
        <td><b>{tx('maxPlayers')}</b></td>
        <td> {serverOptions?.MAX_PLAYERS}</td>
      </tr>
      <tr>
        <td><b>{tx('port')}</b></td>
        <td> {serverOptions?.PORT}</td>
      </tr>
      <tr>
        <td><b>{tx('proxyAddress')}</b></td>
        <td> {serverOptions?.PROXY_ADDRESS}</td>
      </tr>
      <tr>
        <td><b>{tx('proxyPort')}</b></td>
        <td> {serverOptions?.PROXY_PORT}</td>
      </tr>
    </Fragment>
  )
}
import { KyberState } from '../../data/models'
import ModesFilter from '../ModesFilter'
import ProxyFilter from '../ProxyFilter'
import './styles.scss'

export const MIN_MODS = 0
export const MODS_ALL = 50
export const MAX_PLAYERS = 64

interface FiltersFormProps {
    handleSubmit: any,
    onModsChange: any,
    onMaxPlayersChange: any,
    onUsersChange: any,
    onPasswordChange: any,
    onModesChange: any,
    onProxiesChange: any,
    onSearch: any,
    state: KyberState
}

const FiltersForm = ({
  handleSubmit,
  onModsChange,
  onMaxPlayersChange,
  onUsersChange,
  onPasswordChange,
  onModesChange,
  onProxiesChange,
  onSearch,
  state }: FiltersFormProps) => {

  const ALL = 'ALL'
  const MIN_CAPACITY = 2
  const MIN_PLAYERS = 1
  const NO_MODS = 'NO MODS'
  const SEARCH_INPUT_TEXT = '🔍 Search'

  const LABEL = {
    MODS: 'Max Mods:',
    SERVER_CAPACITY: 'Max Server Capacity:',
    ACTIVE_PLAYERS: 'Min Active Players:',
    PASSWORD: 'Password:',
    MODES: 'Modes:',
    PROXIES: 'Locations:'
  }

  const IS_DESKTOP = window.matchMedia('(min-width: 601px)').matches

  return (
    <form className="filters-form">
      <div className={`search-input-block${window.matchMedia('(min-width: 601px)').matches ? ' server' : ''}`} style={{ justifyContent: 'space-around' }}>
        <div className="info-plate">
          <input className="" id="search" name="search" type="text"
            placeholder={SEARCH_INPUT_TEXT} onChange={onSearch} />
        </div>
      </div>
      <details className="filters-wrapper" open={IS_DESKTOP}>

        <summary>FILTERS</summary>
        <div className="filters">
          <div className="filter mods-wrapper">
            <label htmlFor="mods">{LABEL.MODS}</label>
            <div>
              {MIN_MODS}
              <input type="range" id="mods" name="mods" min={MIN_MODS} max={MODS_ALL} onChange={onModsChange} value={state.mods} />
              {MODS_ALL}
            </div>
            <span className="uppercase">{state.mods === MODS_ALL ? ALL : state.mods === MIN_MODS ? NO_MODS : state.mods}</span>
            <hr />
          </div>
          <div className="filter maxPlayers-wrapper">
            <label htmlFor="players">{LABEL.SERVER_CAPACITY}</label>
            <div>
              {MIN_CAPACITY}
              <input type="range" id="maxPlayers" name="maxPlayers" min={MIN_CAPACITY} max={MAX_PLAYERS} onChange={onMaxPlayersChange} value={state.maxPlayers} />
              {MAX_PLAYERS}
            </div>
            <span>{state.maxPlayers}</span>
            <hr />
          </div>
          <div className="filter users-wrapper">
            <label htmlFor="players">{LABEL.ACTIVE_PLAYERS}</label>
            <div>
              {MIN_PLAYERS}
              <input type="range" id="users" name="users" min={MIN_PLAYERS} max={state.maxPlayers} onChange={onUsersChange} value={state.users} />
              {state.maxPlayers}
            </div>
            <span>{state.users}</span>
            <hr />
          </div>
          <ModesFilter id="modes" label={LABEL.MODES} value={state.mode} modes={state.allModes} onModesChange={onModesChange} />
          <ProxyFilter id="proxies" label={LABEL.PROXIES} value={state.proxy} proxies={state.proxies} onProxiesChange={onProxiesChange} />
          <div className="filter password-wrapper">
            {/* <label htmlFor="password">{LABEL.PASSWORD}</label> */}
            {/* <select value={state.passwordStatus} id="password" name="password" size={defaultSelectSize} onChange={onPasswordChange} required>
                        {state.passwords.map((p) => (
                            <option key={p.value} value={p.value}>{p.name}</option>
                        ))}
                    </select> */}
            <span className="uppercase">{LABEL.PASSWORD}</span>
            <ul className="radio-wrapper filter-switch">

              {state.passwords.map((p) => (
                <li key={p.value} className="filter-switch-item">
                  <input
                    className="radio"
                    type="radio"
                    name="password"
                    id={p.value}
                    value={p.value}
                    checked={p.value === state.passwordStatus}
                    onChange={onPasswordChange} />
                  <label htmlFor={p.value}>{p.value}</label>
                </li>

              ))}
            </ul>
          </div>
        </div>
      </details>


      <div className="submitButtonWrapper">
        <input className="submit-button" type="submit" value="Refresh" onClick={handleSubmit} />
      </div>
    </form>
  )
}

export default FiltersForm
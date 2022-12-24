/* eslint-disable */
import React from 'react'
import { CONSTANTS } from '../constants'
import { MODES } from '../../../data/modes'
import { MAPS } from '../../../data/maps'
import { KYBER_API } from '../../../api/endpoints'
import { KyberState, Password, PasswordKeys, PasswordValues, PlayRequest, Side } from '../../../data/models'
import { KyberProxy, KyberServer, KyberServersResponse, MessageResponse } from '../../../api/models'
import { InfoPlate, ServerList, FiltersForm, Modal } from '../../../components'
import { MIN_MODS, MODS_ALL, MAX_PLAYERS } from '../../../components/FiltersForm'
import { FAKE_RESPONSE } from '../../../data/fake'
import './styles.scss'

const KYBER_CONSOLE = `
||  // \\\\    // ||‾‾\\  ||‾‾‾‾ ||‾‾\\ 
|| //	\\\\  //  ||  \\\\ ||     ||  \\\\
||//	 \\\\//   ||	// ||     ||  //
||/		  \\/    ||__/  ||____ ||__/ 
||\\		  ||    ||	\\  ||     || \\ 
||\\\\      ||    ||	\\\\ ||     || \\\\
|| \\\\     ||    ||	// ||     ||  \\\\
||  \\\\    ||    ||__/  ||____ ||   \\\\
`
const PASSWORDS: Password[] = [
  { name: PasswordKeys.all, value: PasswordValues.all },
  { name: PasswordKeys.free, value: PasswordValues.free },
  { name: PasswordKeys.required, value: PasswordValues.required }
]

class KyberServers extends React.Component<any, KyberState> {
  constructor(props: any) {
    super(props)
    this.state = {
      pageCount: 0,
      serverCount: 0,

      mods: MODS_ALL,
      users: 1,
      maxPlayers: MAX_PLAYERS,
      passwordStatus: PasswordValues.all,

      allModes: MODES,
      allMaps: MAPS,

      passwords: PASSWORDS,

      allServers: [],
      servers: [],
      proxies: [],
      searchedServers: [],

      searchValue: '',

      modalOpen: false,

      isLoading: true,
      isApiError: false,

      isDebug: true
    }

    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.onModsChange = this.onModsChange.bind(this)
    this.onUsersChange = this.onUsersChange.bind(this)
    this.onMaxPlayersChange = this.onMaxPlayersChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onModesChange = this.onModesChange.bind(this)
    this.onProxiesChange = this.onProxiesChange.bind(this)
    this.onSearch = this.onSearch.bind(this)
    this.showModal = this.showModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  componentDidMount() {
    console.log(KYBER_CONSOLE)
    console.log(CONSTANTS.MESSAGE.KYBER_WELCOME)
    this.setState({ isLoading: true })
    this.getServers().then(() => this.applySearch(this.state.searchValue))

    this.setState({ isLoading: false })

    // TODO: apply closest proxy? or only on host tab?
    this.getProxies()
  }

  // PROXIES
  getProxies = async () => {
    await fetch(KYBER_API.proxies)
      .then((response) => response.json())
      .then((data: KyberProxy[]) => {
        this.setState({ proxies: data })
      })
      .catch(e => {
        console.error(`${CONSTANTS.MESSAGE.ERROR} ${e.message} Endpoint: ${KYBER_API.proxies}`)
        this.setState({ isApiError: true })
      })

    console.log(`Available ${this.state.proxies.length} proxies:`)
    console.log(this.state.proxies)
  }

  // FETCH SERVERS
  fetchServers = async () => {
    await fetch(`${KYBER_API.servers}1`)
      .then((response) => response.json())
      .then((data: KyberServersResponse) => {
        this.setState({
          pageCount: data.pageCount,
          serverCount: data.serverCount,
          allServers: this.state.allServers.concat(data.servers)
        })
      })
      .catch(e => {
        console.error(`${CONSTANTS.MESSAGE.ERROR} ${e.message} Endpoint: ${KYBER_API.servers}1`)
        this.setState({ isApiError: true })
      })

    if (this.state.pageCount > 1) {
      for (let i = 2; i <= this.state.pageCount; i++) {
        await fetch(`${KYBER_API.servers}${i}`)
          .then((response) => response.json())
          .then((data: KyberServersResponse) => {
            this.setState({
              allServers: this.state.allServers.concat(data.servers)
            })
          })
          .catch(e => {
            console.error(`${CONSTANTS.MESSAGE.ERROR} ${e.message} Endpoint: ${KYBER_API.servers}${i}`)
            this.setState({ isApiError: true })
          })
      }
    }
  }

  // SERVERS
  getServers = async () => {
    if (this.state.isDebug) {

      this.setState({
        serverCount: FAKE_RESPONSE.length,
        servers: FAKE_RESPONSE
      })

      console.log(CONSTANTS.MESSAGE.DEBUG)

      return
    }

    this.setState({
      allServers: [],
      servers: []
    })

    await this.fetchServers()

    console.log(`Found ${this.state.serverCount} Kyber servers: `)
    console.log(this.state.allServers)

    // filter unique servers (by id)
    const uniqueServers: KyberServer[] = []
    const map = new Map()
    for (const server of this.state.allServers) {
      if (!map.has(server.id)) {
        map.set(server.id, true)
        uniqueServers.push(server)
      }
    }

    this.setState({
      serverCount: uniqueServers.length,
      servers: uniqueServers
    })

    //this.applySearch();

    console.log(`Found ${this.state.serverCount} unique Kyber servers (API fix on client): `)
    console.log(this.state.servers)
  }

  // WITH PASSWORD
  onPasswordChange(e: any): void {
    this.setState({ passwordStatus: e.target.value })
  }

  // WITH MODE SELECTED
  onModesChange(e: any): void {
    this.setState({ mode: e.target.value })
  }

  // WITH PROXY SELECTED
  onProxiesChange(e: any): void {
    this.setState({ proxy: e.target.value })
  }

  // ACTIVE PLAYERS
  onUsersChange(e: any): void {
    this.setState({ users: +e.target.value })
  }

  // SERVER CAPACITY
  onMaxPlayersChange(e: any): void {
    const capacity = +e.target.value

    this.setState({ maxPlayers: +e.target.value })
    if (this.state.users > capacity) {
      this.setState({ users: capacity })
    }
  }

  // MODS ENABLED
  onModsChange(e: any): void {
    this.setState({ mods: +e.target.value })
  }

  // APPLY FILTERS
  applyFilters(): void {
    if (this.state.mods !== MODS_ALL) {
      const serverModsFilter = this.state.servers.filter(s => (s.mods?.length || MIN_MODS) <= this.state.mods)
      this.setState({ servers: serverModsFilter })
    }

    if (this.state.maxPlayers !== MAX_PLAYERS) {
      const serverMaxPlayersFilter = this.state.servers.filter(s => (s.maxPlayers || MAX_PLAYERS) <= this.state.maxPlayers)
      this.setState({ servers: serverMaxPlayersFilter })
    }

    if (this.state.users !== MAX_PLAYERS) {
      const serverPlayersFilter = this.state.servers.filter(s => (s.users || MAX_PLAYERS) >= this.state.users)
      this.setState({ servers: serverPlayersFilter })
    }

    if (this.state.mode) {
      const modesFilter = this.state.servers.filter(s => s.mode === this.state.mode)
      this.setState({ servers: modesFilter })
    }

    if (this.state.proxy) {
      const proxiesFilter = this.state.servers.filter(p => p.proxy?.ip === this.state.proxy)
      this.setState({ servers: proxiesFilter })
    }

    if (this.state.passwordStatus !== PasswordValues.all) {
      const requiresPassword = this.state.passwordStatus === PasswordValues.required
      const serverPasswordFilter = this.state.servers.filter(s => s.requiresPassword === requiresPassword)
      this.setState({ servers: serverPasswordFilter })
    }
  }

  // FORM SUBMIT
  handleSubmit = async (e: any) => {
    this.setState({ isLoading: true, isApiError: false })
    e.preventDefault()

    await this.getServers()
      .then(() => this.applyFilters())
      .then(() => this.applySearch(this.state.searchValue))

    this.setState({ isLoading: false })
    console.log('Filtered: ')
    console.log(this.state.servers)
  }

  applySearch(searchValue: string): void {
    this.setState({
      searchedServers: searchValue?.length > 2
        ? this.state.servers.filter(s => s.name?.toLowerCase().includes(searchValue))
        : this.state.servers
    })
  }

  onSearch(e: any): void {
    // e.preventDefault();

    const searchValue = e.target.value.toLowerCase()
    this.applySearch(searchValue)
    this.setState({ searchValue })
  }

  showModal(s: KyberServer): void {
    this.setState({ modalOpen: true, modalServer: s })
  }

  closeModal(e: any): void {
    this.setState({ modalOpen: false })
  }

  joinServer = async (id: string, faction: Side, password: string): Promise<void> => {
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
          this.setState({ modalOpen: false })
        }
      })
      .catch(e => {
        // console.error(`${CONSTANTS.MESSAGE.ERROR} ${e.message} Endpoint: ${KYBER_API.play}`);
        console.error(e)
      })
  }

  render() {
    return (
      <>
        {/* TODO/HACK Opacity animation vs state issue */}
        {(this.state.modalOpen) && <Modal modalOpen={this.state.modalOpen}
          closeModal={this.closeModal}
          joinServer={this.joinServer}
          modalServer={this.state.modalServer} />}
        <div className="r" style={{ margin: '10px', marginTop: '100px' }}>
          <div className="c s12 m10 l2">
            <FiltersForm
              handleSubmit={this.handleSubmit}
              onModsChange={this.onModsChange}
              onMaxPlayersChange={this.onMaxPlayersChange}
              onUsersChange={this.onUsersChange}
              onPasswordChange={this.onPasswordChange}
              onModesChange={this.onModesChange}
              onProxiesChange={this.onProxiesChange}
              onSearch={this.onSearch}
              state={this.state} />
          </div>

          <div className="c s12 m12 l10">

            <ul style={{ padding: 0, margin: '10px', minHeight: '90vh' }}>
              {this.state.isLoading
                ? (<InfoPlate message={CONSTANTS.MESSAGE.LOADING} />)
                : (
                  this.state.isApiError
                    ? (<InfoPlate message={CONSTANTS.MESSAGE.API_ERROR} />)
                    : (
                      this.state.searchedServers.length === 0
                        ? (<InfoPlate message={CONSTANTS.MESSAGE.NO_RESULTS} />)
                        : (<ServerList servers={this.state.searchedServers} maps={this.state.allMaps} modes={this.state.allModes} showModal={this.showModal} />)
                    )
                )
              }
            </ul>
          </div>
        </div>
      </>
    )
  }
}

export default KyberServers
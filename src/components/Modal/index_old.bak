import { CONSTANTS } from '../../features/Kyber/constants'
import { KyberServer } from '../../api/models'
import { Side } from '../../data/models'
import React from 'react'
import './styles.scss'

const MODS_SEARCH = 'https://www.nexusmods.com/starwarsbattlefront22017/search/?gsearchtype=mods&gsearch='
const MODS_ICON = 'https://images.nexusmods.com/favicons/ReskinOrange/favicon-16x16.png'

type ModalProps = {
    modalOpen: boolean;
    closeModal?: any;
    joinServer?: any;
    modalServer?: KyberServer;
}

type ModalState = {
    id?: string;
    faction: Side;
    password: string;
}

function RemoveVersion(modName: string): string {
  return encodeURIComponent(modName.substring(0, modName?.lastIndexOf('(') - 1))
}

class Modal extends React.Component<ModalProps, ModalState> {
  constructor(props: ModalProps) {
    super(props)
    this.state = {
      id: props.modalServer?.id,
      faction: Side.Light,
      password: ''
    }

    this.onFactionChange = this.onFactionChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
  }

  onFactionChange(e: any): void {
    this.setState({ faction: +e.target.value })
  }

  onPasswordChange(e: any): void {
    this.setState({ password: e.target.value })
  }

  // TODO/HACK Opacity animation vs state issue
  componentDidMount() {
    if (this.props.modalOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = '15px'
      const header = document.getElementById('header')
      if (header) {
        header.style.width = 'calc(100% - 16px)'
      }
    }
  }

  // TODO/HACK Opacity animation vs state issue
  componentWillUnmount() {
    document.body.style.overflow = 'unset'
    document.body.style.paddingRight = ''
    const header = document.getElementById('header')
    if (header) {
      header.style.width = '100%'
    }
  }

  render() {
    const className = `modal${this.props.modalOpen ? ' open' : ''}`
    document.body.style.overflow = 'hidden'
    return (
      <div className={className}>
        <div style={{ direction: 'rtl' }}>
          <span onClick={this.props.closeModal} style={{ cursor: 'pointer' }}>✕</span>
        </div>
        <div>
          <div>{CONSTANTS.KYBER.JOIN_SERVER_MESSAGE}</div>
        </div>

        <div className="">
          {!this.props.modalServer?.autoBalanceTeams && (
            <div>
              <span>Preferred team: </span>
              {/* <input type="number" id="faction" name="faction" min={Side.Light} max={Side.Dark} defaultValue={Side.Light} onChange={this.onFactionChange} /> */}
              <ul className="radio-wrapper filter-switch">
                <li key={Side.Light} className="filter-switch-item">
                  <input
                    className="radio"
                    type="radio"
                    name="faction"
                    id={Side[Side.Light]}
                    value={Side.Light}
                    checked={this.state.faction === Side.Light}
                    onChange={this.onFactionChange} />
                  <label htmlFor={Side[Side.Light]}>{Side[Side.Light]} side</label>
                </li>
                <li key={Side.Dark} className="filter-switch-item">
                  <input
                    className="radio"
                    type="radio"
                    name="faction"
                    id={Side[Side.Dark]}
                    value={Side.Dark}
                    checked={this.state.faction === Side.Dark}
                    onChange={this.onFactionChange} />
                  <label htmlFor={Side[Side.Dark]}>{Side[Side.Dark]} side</label>
                </li>
              </ul>
            </div>
          )}
          {this.props.modalServer?.requiresPassword && (
            <div>
              <span>Password: </span>
              <input className="" id="password" name="password" type="password" placeholder="Type password here" required onChange={this.onPasswordChange} />
            </div>
          )}
        </div>

        <div>
          <div className="server-info-server-mods" style={{ maxWidth: '500px' }}>
            <span>
              {this.props.modalServer?.mods?.length === 0
                ? (<div style={{ color: '#0d3' }}>{CONSTANTS.KYBER.NO_MODS_WARNING}</div>)
                : (<>
                  <div>{CONSTANTS.KYBER.MODS_WARNING}</div>
                  <div className="server-mods-details-content">
                    {this.props.modalServer?.mods?.map((mod, index) => (
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
        <div style={{ margin: '0 auto' }}>
          <button className="submit-button" disabled={!!this.props.modalServer && !!this.props.modalServer.requiresPassword && !this.state.password}
            onClick={() => this.props.joinServer(this.state.id, this.state.faction, this.state.password)}>
            {CONSTANTS.BUTTON.JOIN}
          </button>
          <button className="submit-button" onClick={this.props.closeModal}>{CONSTANTS.BUTTON.CLOSE}</button>
        </div>
      </div>
    )
  }
}

export default Modal
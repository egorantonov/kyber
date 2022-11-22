import { BattlefrontMode } from '../../data/models'

const ALL = 'ALL'

interface ModesFilterProps {
    id: string,
    label: string,
    value?: string,
    onModesChange: any,
    modes: BattlefrontMode[]
}

const ModesFilter = ({id, label, value, onModesChange, modes}: ModesFilterProps) => {

  return (
    <>
      <div className="filter modes-wrapper">
        <label htmlFor={id}>{label}</label>
        <div>
          <select value={value} id={id} name={id} onChange={onModesChange}>
            <option key='empty' value=''>{ALL}</option>
            {modes.map((m) => (
              <option key={m.name} value={m.mode}>{m.name.replaceAll('Versus', 'vs.')}</option>
            ))}
          </select>
        </div>
        <hr />
      </div>
    </>
  )
}

export default ModesFilter
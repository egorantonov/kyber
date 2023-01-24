import { isNullOrEmpty } from '../../../../extensions/string'

interface ButtonsProps {
  tx: any
  handleSubmit: any
  handleReset: any
  name: string
}

export function Buttons({tx, handleSubmit, handleReset, name}: ButtonsProps) {

  const disabled = isNullOrEmpty(name)

  return (
    <div className='r start' style={{marginTop: 10}}>
      <div className="c s6 m6 l6">
        <button className='bd-filter-blur-5' type="button" 
          onClick={() => handleReset()}>
          ❌ {tx('reset')}
        </button>
        
      </div>
      <div className="c s5 m6 l6 flex flex-content-end" style={{maxWidth: 250}}>
        <button className='bd-filter-blur-5' type="button" title={disabled ? tx('validation_tooltip') : tx('ready')}
          onClick={(e) => handleSubmit(e)} /*disabled={disabled}*/>
          ✅ {tx('host')}
        </button>
      </div>
    </div>
  )
}
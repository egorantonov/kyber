import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { isDebug, toggleDebug } from '../../features/Kyber/Servers/serversSlice'

export const Debug = () => {

  const debug = useAppSelector(isDebug)
  const dispatch = useAppDispatch()
  
  return (
    <div>
      <p>DEBUG SWITCH</p>
      <input
        type="checkbox"
        name="debug"
        id="debug"
        checked={debug}
        onChange={() => dispatch(toggleDebug())} 
      />
      <label htmlFor="debug">Debug</label>
    </div>
  )
}
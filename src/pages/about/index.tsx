import logo from '../../logo.svg'
import { Counter } from '../../features/counter/Counter'

export function About() {
  return (
    <><h1>About</h1>
      <div>
        <img src={logo} className="App-logo" alt="logo" />
        <Counter /></div>
    </>
  )
}

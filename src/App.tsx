import './App.css'
import { Route, Routes } from 'react-router'
import { Download } from './pages/download'
import { Host } from './pages/host'
import { About } from './pages/about'
import { Servers } from './pages/servers'
import { Nav } from './components/Nav'
import { Settings } from './pages/settings'
import Header from './components/Header'
import './styles/common.scss'
import './styles/grid.scss'
import './styles/text.scss'

function App() {
  return (
    <div className="App">
      <header>
        <Header />
        <Nav />
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Servers />} />
          <Route path='/download' element={<Download />} />
          <Route path='/host' element={<Host />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/settings' element={<Settings />}/>
        </Routes>
      </main>
      <footer>

      </footer>
    </div>
  )
}

export default App

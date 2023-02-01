import './App.css'
import { Route, Routes } from 'react-router'
import { DownloadPage } from './pages/download'
import { HostPage } from './pages/host'
import { AboutPage } from './pages/about'
import { ServersPage } from './pages/servers'
import { Nav } from './components/Nav'
import { SettingsPage } from './pages/settings'
import { Header } from './components/Header'
import './styles/common.scss'
import './styles/grid.scss'
import './styles/text.scss'
import { initializeTheme } from './contexts/ThemeContext'
import { useEffect, useLayoutEffect } from 'react'
import { useAppDispatch } from './app/hooks'
import { fetchProxiesAsync } from './features/Kyber/Servers/serversSlice'
import { KyberStatus } from './features/Status'

function App() {
  const dispatch = useAppDispatch()

  useLayoutEffect(() => {
    initializeTheme()    
  })

  useEffect(() => {
    dispatch(fetchProxiesAsync())
  })

  return (
    <div className="App">
      <header>
        <Header />
        <KyberStatus />
      </header>      
      <Nav />
      <main>
        <Routes>
          <Route path='/' element={<ServersPage />} />
          <Route path='/download' element={<DownloadPage />} />
          <Route path='/host' element={<HostPage />}/>
          <Route path='/about' element={<AboutPage />}/>
          <Route path='/settings' element={<SettingsPage />}/>
        </Routes>
      </main>
      {/* <footer style={{
        position: 'fixed', 
        bottom: 0, 
        width: '100%',
        height: 30, 
        zIndex: 99, 
        color: 'red', 
        backgroundColor: 'yellow'}}>
        TEST
      </footer> */}
    </div>
  )
}

export default App

import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'
import './index.css'
import { PersistSelectedStates } from './supports/Persistence'
import { HelmetProvider } from 'react-helmet-async'
import './i18n/i18n'

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        {/* <PersistSelectedStates> */}
        <HelmetProvider>
          <App />
        </HelmetProvider>
        {/* </PersistSelectedStates> */}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)

serviceWorkerRegistration.register()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

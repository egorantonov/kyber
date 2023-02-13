import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchProxies, fetchServers } from '../../../api/methods'
import { KyberProxy, KyberServer, } from '../../../api/models'
import { RootState } from '../../../app/store'
import { FAKE_RESPONSE } from '../../../data/fake'

export enum Status {
  Idle = 0,
  Loading = 1,
  Failed = 2
}

export interface KyberState {
  proxies: KyberProxy[],
  servers: KyberServer[],
  modalServer?: KyberServer
  status: Status,
  proxyStatus: Status,
  liveUpdate: boolean, // updates Server List each 5 seconds
  modalOpen: boolean
  
  debug: boolean,
  blur: boolean,
}

const initialState: KyberState = {
  proxies: [],
  servers: [],
  status: Status.Idle,
  proxyStatus: Status.Loading, // loading proxies right immediately after the start
  liveUpdate: true,
  modalOpen: false,

  debug: false, // TODO: add to localStorage
  blur: true
}

export const fetchServersAsync = createAsyncThunk(
  'servers/fetchServers',
  async (debug: boolean) => {
    console.log('thunk `servers/fetchServers` invoked')
    if (debug) {
      return FAKE_RESPONSE
    }

    const response = await fetchServers()
    // The value we return becomes the `fulfilled` action payload
    return response.data
  }
)

export const fetchProxiesAsync = createAsyncThunk(
  'servers/fetchProxies',
  async () => {
    console.log('thunk `servers/fetchProxies` invoked')


    const response = await fetchProxies()
    // The value we return becomes the `fulfilled` action payload
    return response.data.sort((a, b) =>  a.name?.localeCompare(b.name ?? '') ?? 0) // TODO: temp sort until ping implemented
  }
)

const serversSlice = createSlice({
  name: 'servers',
  initialState,
  reducers: {
    clear: (state) => {
      state.servers = []
    },
    toggleDebug: (state, action) => {
      //state.debug = !state.debug
      state.debug = action.payload
    },
    toggleBlur: (state, action) => {      
      state.blur = action.payload
    },
    toggleAutoUpdate: (state, action) => {
      //state.liveUpdate = !state.liveUpdate
      state.liveUpdate = action.payload
    },
    toggleModal: (state) => {
      state.modalOpen = !state.modalOpen
    },
    setModalServer: (state, action) => {
      state.modalServer = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServersAsync.pending, (state) => {
        state.status = Status.Loading
      })
      .addCase(fetchServersAsync.fulfilled, (state, action) => {
        state.status = Status.Idle
        state.servers = action.payload
      })
      .addCase(fetchServersAsync.rejected, (state) => {
        state.status = Status.Failed
      })
      // TODO: move state (status) to another instance?
      .addCase(fetchProxiesAsync.pending, (state) => {
        state.proxyStatus = Status.Loading
      })
      .addCase(fetchProxiesAsync.fulfilled, (state, action) => {
        state.proxyStatus = Status.Idle
        state.proxies = action.payload
      })
      .addCase(fetchProxiesAsync.rejected, (state) => {
        state.proxyStatus = Status.Failed
      })
  },
})

export const selectServers = (state: RootState) => state.servers.servers
export const getServersStatus = (state: RootState) => state.servers.status
export const getModalServer = (state: RootState) => state.servers.modalServer

export const selectProxies = (state: RootState) => state.servers.proxies
export const getProxyStatus = (state: RootState) => state.servers.proxyStatus

export const isLiveUpdate = (state: RootState) => state.servers.liveUpdate
export const isModalOpen = (state: RootState) => state.servers.modalOpen

export const isDebug = (state: RootState) => state.servers.debug
export const isBlur = (state: RootState) => state.servers.blur

export const { clear, toggleDebug, toggleBlur, toggleAutoUpdate, toggleModal, setModalServer } = serversSlice.actions

export default serversSlice.reducer
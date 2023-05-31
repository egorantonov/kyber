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

export interface KyberServersState {
  servers: KyberServer[],
  modalServer?: KyberServer
  status: Status,
  liveUpdate: boolean, // updates Server List each 5 seconds
  modalOpen: boolean
  
  debug: boolean,
  blur: boolean,
}

const initialState: KyberServersState = {
  servers: [],
  status: Status.Idle,
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
    toggleModal: (state, action) => {
      //state.modalOpen = !state.modalOpen
      state.modalOpen = action.payload
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
  },
})

export const selectServers = (state: RootState) => state.servers.servers
export const getServersStatus = (state: RootState) => state.servers.status
export const getModalServer = (state: RootState) => state.servers.modalServer

export const isLiveUpdate = (state: RootState) => state.servers.liveUpdate
export const isModalOpen = (state: RootState) => state.servers.modalOpen

export const isDebug = (state: RootState) => state.servers.debug
export const isBlur = (state: RootState) => state.servers.blur

export const { clear, toggleDebug, toggleBlur, toggleAutoUpdate, toggleModal, setModalServer } = serversSlice.actions

export default serversSlice.reducer
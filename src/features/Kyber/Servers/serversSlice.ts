import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchServers } from '../../../api/methods'
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
  status: Status,
  liveUpdate: boolean, // updates Server List each 5 seconds
  
  debug: boolean,
}

const initialState: KyberState = {
  proxies: [],
  servers: [],
  status: Status.Idle,
  liveUpdate: false,

  debug: true // TODO: add to localStorage
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
    toggleDebug: (state) => {
      state.debug = !state.debug
    },
    toggleAutoUpdate: (state) => {
      state.liveUpdate = !state.liveUpdate
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
export const isLiveUpdate = (state: RootState) => state.servers.liveUpdate

export const isDebug = (state: RootState) => state.servers.debug

export const { clear, toggleDebug, toggleAutoUpdate } = serversSlice.actions

export default serversSlice.reducer
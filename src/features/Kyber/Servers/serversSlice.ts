import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { KYBER_API } from '../../../api/endpoints'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { fetchServers } from '../../../api/methods'
import { KyberProxy, KyberServer, KyberServersResponse } from '../../../api/models'
import { RootState } from '../../../app/store'
import { CONSTANTS } from '../constants'
import { KyberServers } from './Servers'
import { FAKE_RESPONSE } from '../../../data/fake'

export interface KyberState {
  proxies: KyberProxy[],
  servers: KyberServer[],
  status: 'idle' | 'loading' | 'failed',
  debug: boolean
}

const initialState: KyberState = {
  proxies: [],
  servers: [],
  status: 'idle',
  debug: false // TODO: add to localStorage
}

export const fetchServersAsync = createAsyncThunk(
  'servers/fetchServers',
  async (debug: boolean) => {
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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServersAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchServersAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.servers = action.payload
      })
      .addCase(fetchServersAsync.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export const selectServers = (state: RootState) => state.servers.servers
export const isDebug = (state: RootState) => state.servers.debug

export const { clear, toggleDebug } = serversSlice.actions

export default serversSlice.reducer
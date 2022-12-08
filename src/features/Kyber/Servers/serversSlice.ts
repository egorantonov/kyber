import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { KYBER_API } from '../../../api/endpoints'
import { KyberProxy, KyberServer, KyberServersResponse } from '../../../api/models'
import { RootState } from '../../../app/store'
import { CONSTANTS } from '../constants'
import { KyberServers } from './Servers'

export interface KyberState {
  proxies: KyberProxy[],
  servers: KyberServer[],
  status: 'idle' | 'loading' | 'failed'
}

const initialState: KyberState = {
  proxies: [],
  servers: [],
  status: 'idle'
}

export const fetchServersAsync = createAsyncThunk(
  'servers/fetchServers',
  async () => {
    console.log('fetchServersAsync thunk invoked') // TODO: debug
    const response = await fetchServers()
    // The value we return becomes the `fulfilled` action payload
    return response.data
  }
)

// FETCH SERVERS
const fetchServers = async () => {
  let pageCount = 0
  let servers: KyberServer[] = []

  await fetch(`${KYBER_API.servers}1`)
    .then((response) => response.json())
    .then((data: KyberServersResponse) => {
      servers = data.servers
      pageCount = data.pageCount
    })
    .catch(e => {
      console.error(`${CONSTANTS.MESSAGE.ERROR} ${e.message} Endpoint: ${KYBER_API.servers}1`)
    })

  if (pageCount > 1) {
    for (let i = 2; i <= pageCount; i++) {
      await fetch(`${KYBER_API.servers}${i}`)
        .then((response) => response.json())
        .then((data: KyberServersResponse) => {
          servers = servers.concat(data.servers)
        })
        .catch(e => {
          console.error(`${CONSTANTS.MESSAGE.ERROR} ${e.message} Endpoint: ${KYBER_API.servers}${i}`)
        })
    }
  }

  return new Promise<{data: KyberServer[]}>((resolve) => resolve({data: servers}))
}

const serversSlice = createSlice({
  name: 'servers',
  initialState,
  reducers: {
    clear: (state) => {
      console.log('clear thunk invoked')
      state.servers = []
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

export const { clear } = serversSlice.actions

export default serversSlice.reducer
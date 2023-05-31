import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchProxies } from '../../../api/methods'
import { KyberProxy, } from '../../../api/models'
import { RootState } from '../../../app/store'

export enum Status {
  Idle = 0,
  Loading = 1,
  Failed = 2
}

export interface KyberProxiesState {
  proxies: KyberProxy[],
  status: Status
}

const initialState: KyberProxiesState = {
  proxies: [],  
  status: Status.Idle
}

export const fetchProxiesAsync = createAsyncThunk(
  'servers/fetchProxies',
  async () => {
    console.log('thunk `servers/fetchProxies` invoked')


    const response = await fetchProxies()
    // The value we return becomes the `fulfilled` action payload
    return response.data.sort((a, b) =>  a.name?.localeCompare(b.name ?? '') ?? 0) // TODO: temp sort until ping implemented
  }
)

const proxiesSlice = createSlice({
  name: 'proxies',
  initialState,
  reducers: {
    clear: (state) => {
      state.proxies = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProxiesAsync.pending, (state) => {
        state.status = Status.Loading
      })
      .addCase(fetchProxiesAsync.fulfilled, (state, action) => {
        state.status = Status.Idle
        state.proxies = action.payload
      })
      .addCase(fetchProxiesAsync.rejected, (state) => {
        state.status = Status.Failed
      })
  },
})

export const selectProxies = (state: RootState) => state.proxies.proxies
export const getProxyStatus = (state: RootState) => state.proxies.status

export const { clear } = proxiesSlice.actions

export default proxiesSlice.reducer
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

export enum KyberApiStatus {
  Unknown = 0,
  Ok = 1,
  Unavailable = 2
}

export interface KyberApiState {
  status: KyberApiStatus
}

const initialState: KyberApiState = {
  status: KyberApiStatus.Unknown
}

const kyberApiSlice = createSlice({
  name: 'kyberApiStatus',
  initialState,
  reducers: {
    setKyberApiStatus: (state, action) => {
      state.status = action.payload
    }
  }
})

export const getKyberApiStatus = (state: RootState): KyberApiStatus => state.kyberApiStatus.status

export const { setKyberApiStatus } = kyberApiSlice.actions

export default kyberApiSlice.reducer
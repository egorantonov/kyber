import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import serversReducer from '../features/Kyber/Servers/serversSlice'
import proxiesReducer from '../features/Kyber/Servers/proxiesSlice'
import kyberApiStatusReducer from '../features/Status/statusSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    servers: serversReducer,
    proxies: proxiesReducer,
    kyberApiStatus: kyberApiStatusReducer
  },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

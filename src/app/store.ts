import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import serversReducer from '../features/Kyber/Servers/serversSlice'
import kyberApiStatusReducer from '../features/Status/statusSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    servers: serversReducer,
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

import { useCallback, useEffect } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

const KEY_NAME_ESC = 'Escape'
const KEY_EVENT_TYPE = 'keyup'
export function useEscapeKey(handleClose: any) {
  const handleEscKey = useCallback((event: any) => {
    if (event.key === KEY_NAME_ESC) {
      handleClose()
    }
  }, [handleClose])

  useEffect(() => {
    document.addEventListener(KEY_EVENT_TYPE, handleEscKey, false)

    return () => {
      document.removeEventListener(KEY_EVENT_TYPE, handleEscKey, false)
    }
  }, [handleEscKey])
}
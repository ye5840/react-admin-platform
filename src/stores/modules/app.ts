import { createSlice } from '@reduxjs/toolkit'
import type { AppState } from '../types'
import { Persistent } from '@/utils/cache/persistent'
import { APP_CONFIG_KEY } from '@/enums/cacheEnum'
import { deepMerge } from '@/utils'

const initialState: AppState = {
  appMode: undefined,
  themeMode: undefined,
  appConfig: Persistent.getLocal(APP_CONFIG_KEY),
  tableHeight: 0
}

const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppMode: (state, action) => {
      state.appMode = action.payload
    },
    setThemeMode: (state, action) => {
      state.themeMode = action.payload
    },
    setTableHeight: (state, action) => {
      state.tableHeight = action.payload
    },
    setAppConfig: (state, action) => {
      state.appConfig = deepMerge(state.appConfig || {}, action.payload)
      Persistent.setLocal(APP_CONFIG_KEY, state.appConfig, true)
    },
    resetState(state) {
      state.appMode = undefined
      state.themeMode = undefined
      state.appConfig = null
      state.tableHeight = 0
      Persistent.clearAll()
    }
  }
})

export const { setAppMode, setThemeMode, setAppConfig, resetState, setTableHeight } = app.actions

export default app.reducer

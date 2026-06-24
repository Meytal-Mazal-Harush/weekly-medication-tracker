import { configureStore } from '@reduxjs/toolkit'
import weekReducer from './slices/weekSlice'

export const store = configureStore({
  reducer: {
    week: weekReducer
  }
})
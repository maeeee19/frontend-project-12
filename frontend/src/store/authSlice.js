import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: '',
  token: '',
  isAuthenticated: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.username = action.payload.username
      state.token = action.payload.token
      state.isAuthenticated = true
    },
    clearAuth: (state) => {
      state.username = ''
      state.token = ''
      state.isAuthenticated = false
    },
  },
})

export const { setAuth, clearAuth } = authSlice.actions

export const selectAuth = state => state.auth

export default authSlice.reducer

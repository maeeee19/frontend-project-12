import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  token: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.username = action.payload.username;
      state.token = action.payload.token;
    },
    clearAuth: (state) => {
      state.username = '';
      state.token = '';
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;

export const selectAuth = (state) => state.auth;

export default authSlice.reducer;

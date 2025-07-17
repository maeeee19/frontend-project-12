import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedChannel: null,
}

export const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setSelectedChannel: (state, action) => {
      state.selectedChannel = action.payload
    },
    clearSelectedChannel: (state) => {
      state.selectedChannel = null
    },
  },
})

export const {
  setSelectedChannel,
  clearSelectedChannel,
} = channelsSlice.actions

export const selectSelectedChannel = state => state.channels.selectedChannel

export default channelsSlice.reducer

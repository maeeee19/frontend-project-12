import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedChannel: null,
  channels: [],
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
    setChannels: (state, action) => {
      state.channels = action.payload
    },
    addChannel: (state, action) => {
      state.channels.push(action.payload)
    },
    removeChannel: (state, action) => {
      const channelId = action.payload
      state.channels = state.channels.filter(channel => channel.id !== channelId)

      if (state.selectedChannel && state.selectedChannel.id === channelId) {
        state.selectedChannel = state.channels.length > 0 ? state.channels[0] : null
      }
    },
    renameChannel: (state, action) => {
      const { id, name } = action.payload
      const channel = state.channels.find(ch => ch.id === id)
      if (channel) {
        channel.name = name

        if (state.selectedChannel && state.selectedChannel.id === id) {
          state.selectedChannel.name = name
        }
      }
    },
  },
})

export const {
  setSelectedChannel,
  clearSelectedChannel,
  setChannels,
  addChannel,
  removeChannel,
  renameChannel,
} = channelsSlice.actions

export const selectChannels = state => state.channels.channels
export const selectSelectedChannel = state => state.channels.selectedChannel

export default channelsSlice.reducer

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  isLoading: false,
  error: null,
  currentChannelId: null,
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearMessages: (state) => {
      state.messages = [];
      state.currentChannelId = null;
    },
    removeMessagesByChannel: (state, action) => {
      state.messages = state.messages.filter((message) => message.channelId !== action.payload);
    },
  },
});

export const {
  setMessages,
  addMessage,
  setCurrentChannel,
  setLoading,
  setError,
  clearMessages,
  removeMessagesByChannel,
} = messagesSlice.actions;

export const selectMessages = (state) => state.messages.messages;
export const selectMessagesByChannel = (state, channelId) => state.messages.messages.filter((message) => message.channelId === channelId);
export const selectCurrentChannelMessages = (state) => state.messages.messages.filter((message) => message.channelId === state.messages.currentChannelId);
export const selectMessagesLoading = (state) => state.messages.isLoading;
export const selectMessagesError = (state) => state.messages.error;

export default messagesSlice.reducer;

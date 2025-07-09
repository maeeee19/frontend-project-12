import { configureStore } from '@reduxjs/toolkit';
import authSlice from '@/store/authSlice';
import { authApi } from '@/store/authApi';
import { channelsApi } from '@/store/channelsApi';
import { messageApi } from '@/store/messageApi';
import channelsSlice from '@/store/channelsSlice';
import messagesSlice from '@/store/messagesSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
    auth: authSlice,
    channels: channelsSlice,
    messages: messagesSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware, channelsApi.middleware, messageApi.middleware),
});

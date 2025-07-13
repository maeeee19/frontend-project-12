import { createApi } from '@reduxjs/toolkit/query/react'
import axios from 'axios'
import { createAuthHeaders, handleAuthError } from '@/utils/auth'

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  tagTypes: ['Channel'],
  endpoints: builder => ({
    getChannels: builder.query({
      queryFn: async () => {
        try {
          const response = await axios.get('/api/v1/channels', { headers: createAuthHeaders() })
          return { data: response.data }
        }
        catch (error) {
          handleAuthError(error);
          return {
            error: {
              status: error.response?.status || 'FETCH_ERROR',
              data: error.response?.data || error.message,
            },
          }
        }
      },
      providesTags: ['Channel'],
    }),
    addChannel: builder.mutation({
      queryFn: async (newChannel) => {
        try {
          const response = await axios.post('/api/v1/channels', { name: newChannel }, { headers: createAuthHeaders() })

          return { data: response.data }
        }
        catch (error) {
          handleAuthError(error);
          return {
            error: {
              status: error.response?.status || 'FETCH_ERROR',
              data: error.response?.data || error.message,
            },
          }
        }
      },
      invalidatesTags: ['Channel'],
    }),
    editChannel: builder.mutation({
      queryFn: async (editedChannel) => {
        try {
          const response = await axios.patch(`/api/v1/channels/${editedChannel.id}`, { name: editedChannel.name }, { headers: createAuthHeaders() })

          return { data: response.data }
        }
        catch (error) {
          handleAuthError(error);
          return {
            error: {
              status: error.response?.status || 'FETCH_ERROR',
              data: error.response?.data || error.message,
            },
          }
        }
      },
      invalidatesTags: ['Channel'],
    }),
    deleteChannel: builder.mutation({
      queryFn: async (channelId) => {
        try {
          const response = await axios.delete(`/api/v1/channels/${channelId}`, { headers: createAuthHeaders() })

          return { data: response.data }
        }
        catch (error) {
          handleAuthError(error);
          return {
            error: {
              status: error.response?.status || 'FETCH_ERROR',
              data: error.response?.data || error.message,
            },
          }
        }
      },
      invalidatesTags: ['Channel'],
    }),
  }),
})

export const {
  useGetChannelsQuery, useAddChannelMutation, useEditChannelMutation, useDeleteChannelMutation,
} = channelsApi

import { createApi } from '@reduxjs/toolkit/query/react'
import axios from 'axios'
import { createAuthHeaders, handleAuthError } from '@/utils/auth'

export const messageApi = createApi({
  reducerPath: 'messagesApi',
  tagTypes: ['Message'],
  endpoints: builder => ({
    getMessages: builder.query({
      queryFn: async () => {
        try {
          const response = await axios.get('/api/v1/messages', { headers: createAuthHeaders() })
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
      providesTags: ['Message'],
    }),
    addMessage: builder.mutation({
      queryFn: async (newMessage) => {
        try {
          const response = await axios.post('/api/v1/messages', newMessage, { headers: createAuthHeaders() })
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
      invalidatesTags: ['Message'],
    }),
    editMessage: builder.mutation({
      queryFn: async (editedMessage) => {
        try {
          const response = await axios.put(`/api/v1/messages/${editedMessage.id}`, editedMessage, { headers: createAuthHeaders() })
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
      invalidatesTags: ['Message'],
    }),
    deleteMessage: builder.mutation({
      queryFn: async (messageId) => {
        try {
          const response = await axios.delete(`/api/v1/messages/${messageId}`, { headers: createAuthHeaders() })
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
      invalidatesTags: ['Message'],
    }),
  }),
})

export const {
  useGetMessagesQuery, useAddMessageMutation, useEditMessageMutation, useDeleteMessageMutation,
} = messageApi

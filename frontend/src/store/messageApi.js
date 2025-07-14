import { createApi } from '@reduxjs/toolkit/query/react'
import axios from 'axios'

export const messageApi = createApi({
  reducerPath: 'messagesApi',
  tagTypes: ['Message'],
  endpoints: builder => ({
    getMessages: builder.query({
      queryFn: async () => {
        try {
          const token = localStorage.getItem('token')
          const response = await axios.get('/api/v1/messages', { headers: { Authorization: `Bearer ${token}` } })
          return { data: response.data }
        }
        catch (error) {
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
      queryFn: async newMessage => {
        try {
          const token = localStorage.getItem('token')
          const response = await axios.post('/api/v1/messages', newMessage, { headers: { Authorization: `Bearer ${token}` } })
          return { data: response.data }
        }
        catch (error) {
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
      queryFn: async editedMessage => {
        try {
          const token = localStorage.getItem('token')
          const response = await axios.put(`/api/v1/messages/${editedMessage.id}`, editedMessage, { headers: { Authorization: `Bearer ${token}` } })
          return { data: response.data }
        }
        catch (error) {
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
      queryFn: async messageId => {
        try {
          const token = localStorage.getItem('token')
          const response = await axios.delete(`/api/v1/messages/${messageId}`, { headers: { Authorization: `Bearer ${token}` } })
          return { data: response.data }
        }
        catch (error) {
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

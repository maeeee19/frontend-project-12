import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './baseQuery'

export const messageApi = createApi({
  reducerPath: 'messagesApi',
  tagTypes: ['Message'],
  baseQuery: baseQuery,
  endpoints: builder => ({
    getMessages: builder.query({
      query: () => '/messages',
      providesTags: ['Message'],
    }),
    addMessage: builder.mutation({
      query: newMessage => ({
        url: '/messages',
        method: 'POST',
        body: newMessage,
      }),
      invalidatesTags: ['Message'],
    }),
    editMessage: builder.mutation({
      query: editedMessage => ({
        url: `/messages/${editedMessage.id}`,
        method: 'PUT',
        body: editedMessage,
      }),
      invalidatesTags: ['Message'],
    }),
    deleteMessage: builder.mutation({
      query: messageId => ({
        url: `/messages/${messageId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Message'],
    }),
  }),
})

export const {
  useGetMessagesQuery, useAddMessageMutation, useEditMessageMutation, useDeleteMessageMutation,
} = messageApi

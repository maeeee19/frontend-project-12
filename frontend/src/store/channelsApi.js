import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './baseQuery'

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  tagTypes: ['Channel'],
  baseQuery: baseQuery,
  endpoints: builder => ({
    getChannels: builder.query({
      query: () => '/channels',
      providesTags: ['Channel'],
    }),
    addChannel: builder.mutation({
      query: newChannel => ({
        url: '/channels',
        method: 'POST',
        body: { name: newChannel },
      }),
      invalidatesTags: ['Channel'],
    }),
    editChannel: builder.mutation({
      query: editedChannel => ({
        url: `/channels/${editedChannel.id}`,
        method: 'PATCH',
        body: { name: editedChannel.name },
      }),
      invalidatesTags: ['Channel'],
    }),
    deleteChannel: builder.mutation({
      query: channelId => ({
        url: `/channels/${channelId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Channel'],
    }),
  }),
})

export const {
  useGetChannelsQuery, useAddChannelMutation, useEditChannelMutation, useDeleteChannelMutation,
} = channelsApi

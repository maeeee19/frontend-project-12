import { createApi } from '@reduxjs/toolkit/query/react'
import axios from 'axios'
import { handleAuthError } from '@/utils/auth'

export const authApi = createApi({
  reducerPath: 'authApi',
  endpoints: builder => ({
    login: builder.mutation({
      queryFn: async ({ username, password }) => {
        try {
          const response = await axios.post('/api/v1/login', { username, password })
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
    }),
    signup: builder.mutation({
      queryFn: async ({ username, password }) => {
        try {
          const response = await axios.post('/api/v1/signup', { username, password })
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
    }),
  }),
})

export const { useLoginMutation, useSignupMutation } = authApi

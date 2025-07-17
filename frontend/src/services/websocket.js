import { io } from 'socket.io-client'
import { addMessage } from '@/store/messagesSlice'
import { filterProfanity } from '@/utils/profanityFilter'
import { channelsApi } from '@/store/channelsApi'

let socket = null
let dispatch = null

export const initWebSocket = (dispatchInstance) => {
  dispatch = dispatchInstance

  if (!socket) {
    socket = io('/')

    socket.on('newMessage', (data) => {
      if (dispatch) {
        const filteredData = {
          ...data,
          text: filterProfanity(data.text),
        }
        dispatch(addMessage(filteredData))
      }
    })

    socket.on('newChannel', () => {
      if (dispatch) {
        dispatch(channelsApi.util.invalidateTags(['Channel']))
      }
    })

    socket.on('removeChannel', () => {
      if (dispatch) {
        dispatch(channelsApi.util.invalidateTags(['Channel']))
      }
    })

    socket.on('renameChannel', () => {
      if (dispatch) {
        dispatch(channelsApi.util.invalidateTags(['Channel']))
      }
    })
  }

  return socket
}

export const getSocket = () => socket

export const disconnectWebSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}

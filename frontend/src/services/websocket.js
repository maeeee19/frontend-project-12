import { io } from 'socket.io-client'
import { addMessage } from '@/store/messagesSlice'
import { addChannel, removeChannel, renameChannel } from '@/store/channelsSlice'
import { showNetworkError } from '@/utils/notifications'
import { filterProfanity } from '@/utils/profanityFilter'
import { handleAuthError } from '@/utils/auth'

let socket = null
let dispatch = null

export const initWebSocket = (dispatchInstance) => {
  dispatch = dispatchInstance

  if (!socket) {
    socket = io('ws://localhost:5002')

    socket.on('newMessage', (data) => {
      if (dispatch) {
        const filteredData = {
          ...data,
          text: filterProfanity(data.text),
        }
        dispatch(addMessage(filteredData))
      }
    })

    socket.on('newChannel', (data) => {
      if (dispatch) {
        dispatch(addChannel(data))
      }
    })

    socket.on('removeChannel', (data) => {
      if (dispatch) {
        dispatch(removeChannel(data.id))
      }
    })

    socket.on('renameChannel', (data) => {
      if (dispatch) {
        dispatch(renameChannel(data))
      }
    })

    socket.on('connect_error', (error) => {
      // Проверяем, не является ли ошибка связанной с аутентификацией
      if (error?.data?.status === 401) {
        handleAuthError(error);
      } else {
        showNetworkError()
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

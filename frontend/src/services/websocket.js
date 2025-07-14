import { io } from 'socket.io-client'
import { addMessage } from '@/store/messagesSlice'
import { addChannel, removeChannel, renameChannel } from '@/store/channelsSlice'
import { showNetworkError } from '@/utils/notifications'
import { filterProfanity } from '@/utils/profanityFilter'

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

    socket.on('connect_error', () => {
      showNetworkError()
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

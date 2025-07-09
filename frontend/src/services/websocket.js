import { io } from 'socket.io-client';
import { addMessage } from '@/store/messagesSlice';
import { addChannel, removeChannel, renameChannel } from '@/store/channelsSlice';
import { showNetworkError, showConnectionEstablished } from '@/utils/notifications';
import { filterProfanity } from '@/utils/profanityFilter';

let socket = null;
let store = null;

export const initWebSocket = (storeInstance) => {
  store = storeInstance;

  if (!socket) {
    socket = io('ws://localhost:5002');

    socket.on('connect', () => {
      showConnectionEstablished();
    });

    socket.on('disconnect', () => {
      showNetworkError();
    });

    socket.on('newMessage', (data) => {
      if (store) {
        const filteredData = {
          ...data,
          text: filterProfanity(data.text),
        };
        store.dispatch(addMessage(filteredData));
      }
    });

    socket.on('newChannel', (data) => {
      if (store) {
        store.dispatch(addChannel(data));
      }
    });

    socket.on('removeChannel', (data) => {
      if (store) {
        store.dispatch(removeChannel(data.id));
      }
    });

    socket.on('renameChannel', (data) => {
      if (store) {
        store.dispatch(renameChannel(data));
      }
    });

    socket.on('connect_error', (error) => {
      showNetworkError();
    });
  }

  return socket;
};

export const getSocket = () => socket;

export const disconnectWebSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

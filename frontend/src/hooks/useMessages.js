import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetMessagesQuery, useAddMessageMutation } from '@/store/messageApi';
import { filterProfanity } from '@/utils/profanityFilter';
import {
  setMessages,
  addMessage,
  setCurrentChannel,
  setLoading,
  setError,
  selectMessagesByChannel,
  selectMessagesLoading,
  selectMessagesError,
} from '@/store/messagesSlice';

export const useMessages = (channelId) => {
  const dispatch = useDispatch();
  const { data: apiMessages, isLoading: apiLoading, error: apiError } = useGetMessagesQuery();
  const [addMessageMutation, { isLoading: isAddingMessage }] = useAddMessageMutation();

  const messages = useSelector((state) => selectMessagesByChannel(state, channelId));
  const isLoading = useSelector(selectMessagesLoading);
  const error = useSelector(selectMessagesError);

  useEffect(() => {
    if (apiMessages) {
      const filteredMessages = apiMessages.map((message) => ({
        ...message,
        text: filterProfanity(message.text),
      }));
      dispatch(setMessages(filteredMessages));
    }
  }, [apiMessages, dispatch]);

  useEffect(() => {
    dispatch(setLoading(apiLoading));
  }, [apiLoading, dispatch]);

  useEffect(() => {
    if (apiError) {
      dispatch(setError(apiError.message || 'Ошибка загрузки сообщений'));
    }
  }, [apiError, dispatch]);

  useEffect(() => {
    if (channelId) {
      dispatch(setCurrentChannel(channelId));
    }
  }, [channelId, dispatch]);

  const sendMessage = async (text, username) => {
    if (!text.trim() || !channelId) return;

    try {
      const newMessage = {
        channelId,
        text: text.trim(),
        username,
      };

      const optimisticMessage = {
        ...newMessage,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      };
      dispatch(addMessage(optimisticMessage));

      const result = await addMessageMutation(newMessage).unwrap();
      return result;
    } catch (error) {
      throw error;
    }
  };

  return {
    messages,
    isLoading: isLoading || apiLoading,
    error,
    sendMessage,
    isAddingMessage,
  };
};

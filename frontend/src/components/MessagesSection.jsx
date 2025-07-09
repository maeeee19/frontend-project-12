import { Container, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useMessages } from '@/hooks/useMessages';
import { selectSelectedChannel } from '@/store/channelsSlice';
import {
  showMessageSent, showMessageError, showLoadError, showWarning,
} from '@/utils/notifications';
import { filterProfanity, containsProfanity } from '@/utils/profanityFilter';

const MessagesSection = () => {
  const { t } = useTranslation();
  const selectedChannel = useSelector(selectSelectedChannel);
  const username = useSelector((state) => state.auth.username);
  const [message, setMessage] = useState('');

  const {
    messages, isLoading, error, sendMessage, isAddingMessage,
  } = useMessages(selectedChannel?.id);

  useEffect(() => {
    if (error) {
      showLoadError(t('messages.title').toLowerCase());
    }
  }, [error, t]);

  const handleSendMessage = async () => {
    if (message.trim() && selectedChannel) {
      if (containsProfanity(message)) {
        showWarning(t('messages.profanityWarning'));
      }

      try {
        const filteredMessage = filterProfanity(message);
        await sendMessage(filteredMessage, username);
        showMessageSent();
        setMessage('');
      } catch (error) {
        showMessageError();
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Container className="border rounded h-100">
      <div className="p-3 d-flex flex-column justify-content-between align-items-left mb-3 border-bottom">
        <strong>
          #
          {selectedChannel?.name}
        </strong>
        <span>{t('messages.messageCount', { count: messages.length })}</span>
      </div>
      <div className="p-3 pl-5">
        {isLoading && <div>{t('messages.loadingMessages')}</div>}
        {error && (
          <div className="text-danger">
            {t('messages.loadError')}
            :
            {' '}
            {error.message}
          </div>
        )}
        {!isLoading && !error && messages.length === 0 && (
        <div className="text-muted">{t('messages.noMessages')}</div>
        )}
        {
                    messages.map((message) => (
                      <div key={message.id} className="d-flex flex-row gap-2 mb-2">
                        <strong>
                          {message.username}
                          :
                        </strong>
                        <span>{message.text}</span>
                      </div>
                    ))
                }
      </div>
      <div className="p-3 d-flex justify-content-between align-items-center gap-2">
        <Form.Control
          type="text"
          placeholder={t('messages.messagePlaceholder')}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isAddingMessage || !selectedChannel}
        />
        <Button
          variant="primary"
          onClick={handleSendMessage}
          disabled={isAddingMessage || !message.trim() || !selectedChannel}
        >
          {isAddingMessage ? t('common.sending') : t('common.send')}
        </Button>
      </div>
    </Container>
  );
};

export default MessagesSection;

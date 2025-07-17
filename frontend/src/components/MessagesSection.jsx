import { Container, Form, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useMessages } from '@/hooks/useMessages'
import { selectSelectedChannel } from '@/store/channelsSlice'
import { showWarning } from '@/utils/notifications'
import { filterProfanity, containsProfanity } from '@/utils/profanityFilter'

const MessagesSection = () => {
  const { t } = useTranslation()
  const selectedChannel = useSelector(selectSelectedChannel)
  const username = useSelector(state => state.auth.username)
  const [message, setMessage] = useState('')
  const inputRef = useRef(null)
  const messagesEndRef = useRef(null)

  const {
    messages, isLoading, error, sendMessage, isAddingMessage,
  } = useMessages(selectedChannel?.id)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (message.trim() && selectedChannel) {
      if (containsProfanity(message)) {
        showWarning(t('messages.profanityWarning'))
      }

      try {
        const filteredMessage = filterProfanity(message)
        await sendMessage(filteredMessage, username)
        setMessage('')
        inputRef.current.focus()
      }
      catch {
        console.log('error')
      }
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Container className="border rounded d-flex flex-column" style={{ maxHeight: "calc(100vh - 100px)" }}>
      <div className="p-3 d-flex flex-column justify-content-between align-items-left border-bottom">
        <strong>
          #
          {selectedChannel?.name}
        </strong>
        <span>{t('messages.messageCount', { count: messages.length })}</span>
      </div>
      <div className="p-3 pl-5 flex-grow-1 overflow-auto">
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
          messages.map(message => (
            <div key={message.id} className="d-flex flex-row gap-2 mb-2">
              <strong>
                {message.username}
                :
              </strong>
              <span>{message.text}</span>
            </div>
          ))
        }
        <div ref={messagesEndRef} />
      </div>
      <div className="p-3 d-flex justify-content-between align-items-center gap-2 mt-auto">
        <Form.Control
          type="text"
          placeholder={t('messages.messagePlaceholder')}
          value={message}
          aria-label="Новое сообщение"
          ref={inputRef}
          autoComplete="off"
          onChange={e => setMessage(e.target.value)}
          autoFocus
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
  )
}

export default MessagesSection

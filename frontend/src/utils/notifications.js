import { toast } from 'react-toastify'
import i18next from 'i18next'

export const showSuccess = (message) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  })
}

export const showError = (message) => {
  toast.error(message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  })
}

export const showWarning = (message) => {
  toast.warning(message, {
    position: 'top-right',
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  })
}

export const showInfo = (message) => {
  toast.info(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  })
}

export const showChannelCreated = () => {
  showSuccess(i18next.t('notifications.channelCreated'))
}

export const showChannelRenamed = () => {
  showSuccess(i18next.t('notifications.channelRenamed'))
}

export const showChannelDeleted = () => {
  showSuccess(i18next.t('notifications.channelDeleted'))
}

export const showNetworkError = () => {
  // showError(i18next.t('notifications.networkError'))
}

export const showLoadError = () => {
  // showError(i18next.t('notifications.loadError', { resource }))
}

export const showSaveError = () => {
  // showError(i18next.t('notifications.saveError', { resource }))
}

export const showMessageSent = () => {
  showSuccess(i18next.t('notifications.messageSent'))
}

export const showMessageError = () => {
  // showError(i18next.t('notifications.messageError'))
}

export const showConnectionEstablished = () => {
  // showInfo(i18next.t('notifications.connectionEstablished'))
}

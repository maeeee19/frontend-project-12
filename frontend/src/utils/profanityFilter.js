import leoProfanity from 'leo-profanity'

try {
  leoProfanity.loadDictionary('en')
}
catch (error) {
  console.error('Failed to initialize profanity filter:', error)
}

/**
 * Проверяет, содержит ли текст нецензурные слова
 * @param {string} text - текст для проверки
 * @returns {boolean} - true если содержит нецензурные слова
 */
export const containsProfanity = (text) => {
  if (!text || typeof text !== 'string') return false
  try {
    return leoProfanity.check(text)
  }
  catch (error) {
    console.warn('Profanity check failed:', error)
    return false
  }
}

/**
 * Фильтрует нецензурные слова в тексте, заменяя их звездочками
 * @param {string} text - текст для фильтрации
 * @returns {string} - отфильтрованный текст
 */
export const filterProfanity = (text) => {
  if (!text || typeof text !== 'string') return text

  try {
    return leoProfanity.clean(text)
  }
  catch (error) {
    console.warn('Profanity filtering failed:', error)
    return text
  }
}

/**
 * Получает список нецензурных слов (для отладки)
 * @returns {Array} - массив нецензурных слов
 */
export const getProfanityList = () => {
  try {
    return leoProfanity.list()
  }
  catch (error) {
    console.warn('Failed to get profanity list:', error)
    return []
  }
}

/**
 * Добавляет кастомные слова в список для фильтрации
 * @param {Array} words - массив слов для добавления
 */
export const addCustomProfanityWords = (words) => {
  if (Array.isArray(words)) {
    words.forEach(word => {
      leoProfanity.add(word.toLowerCase())
    })
  }
}

/**
 * Удаляет слова из списка фильтрации
 * @param {Array} words - массив слов для удаления
 */
export const removeProfanityWords = (words) => {
  if (Array.isArray(words)) {
    words.forEach(word => {
      leoProfanity.remove(word.toLowerCase())
    })
  }
}

/**
 * Полная проверка и фильтрация текста
 * @param {string} text - исходный текст
 * @returns {object} - объект с результатами проверки
 */
export const validateAndFilterText = (text) => {
  if (!text || typeof text !== 'string') {
    return {
      isValid: false,
      filteredText: text,
      containsProfanity: false,
      error: 'Текст не может быть пустым',
    }
  }

  const trimmedText = text.trim()
  const hasProfanity = containsProfanity(trimmedText)
  const filteredText = filterProfanity(trimmedText)

  return {
    isValid: true,
    filteredText,
    containsProfanity: hasProfanity,
    error: null,
  }
}

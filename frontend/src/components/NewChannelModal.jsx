import { Modal, Form, Button } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'

import { useTranslation } from 'react-i18next'
import { setSelectedChannel, selectChannels } from '@/store/channelsSlice'
import { useAddChannelMutation } from '@/store/channelsApi'
import { showChannelCreated, showSaveError } from '@/utils/notifications'
import { filterProfanity } from '@/utils/profanityFilter'

const createValidationSchema = (channels, t) => Yup.object().shape({
  name: Yup.string()
    .required(t('channels.validation.required'))
    .min(3, t('channels.validation.minLength'))
    .max(20, t('channels.validation.maxLength'))
    .test('unique-name', t('channels.validation.unique'), value => {
      if (!value || !channels) return true

      const normalizedValue = value.trim().toLowerCase()
      const isDuplicate = channels.some(channel => channel.name.toLowerCase() === normalizedValue)

      return !isDuplicate
    }),
})

const NewChannelModal = ({ show, onHide }) => {
  const { t } = useTranslation()
  const [addChannel, { isLoading }] = useAddChannelMutation()
  const dispatch = useDispatch()
  const channels = useSelector(selectChannels)
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: createValidationSchema(channels, t),
    onSubmit: async values => {
      try {
        const filteredName = filterProfanity(values.name)
        console.log(filteredName)
        const result = await addChannel(filteredName).unwrap()
        dispatch(setSelectedChannel(result))
        showChannelCreated(values.name)
        formik.resetForm()
        onHide()
      } catch {
        showSaveError(t('channels.title').toLowerCase().slice(0, -1))
        formik.setFieldError('name', 'Ошибка создания канала')
      }
    },
  })

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>{t('channels.newChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="d-flex flex-column gap-4" onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="name">{t('channels.channelName')}</Form.Label>
            <Form.Control
              id="name"
              autoFocus
              type="text"
              placeholder={t('channels.channelNamePlaceholder')}
              onChange={e => formik.setFieldValue('name', e.target.value)}
              value={formik.values.name}
              isInvalid={formik.touched.name && formik.errors.name}
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  formik.handleSubmit()
                }
              }}
            />
            {formik.touched.name && formik.errors.name && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.name}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Button
            variant="primary"
            disabled={isLoading || !formik.isValid || !formik.dirty}
            type="submit"
          >
            {isLoading ? t('common.creating') : t('common.create')}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default NewChannelModal

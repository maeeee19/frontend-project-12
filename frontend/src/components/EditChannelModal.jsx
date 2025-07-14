import { Modal, Form, Button } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { selectChannels } from '@/store/channelsSlice'
import { useEditChannelMutation } from '@/store/channelsApi'
import { showChannelRenamed, showSaveError } from '@/utils/notifications'
import { filterProfanity } from '@/utils/profanityFilter'

const EditChannelModal = ({ show, onHide, channel }) => {
  const { t } = useTranslation()
  const [editChannel, { isLoading }] = useEditChannelMutation()
  const channels = useSelector(selectChannels)

  const createValidationSchema = (channels, currentChannelId) => Yup.object().shape({
    name: Yup.string()
      .required(t('channels.validation.required'))
      .min(3, t('channels.validation.minLength'))
      .max(20, t('channels.validation.maxLength'))
      .test('unique-name', t('channels.validation.unique'), (value) => {
        if (!value || !channels) return true

        const normalizedValue = value.trim().toLowerCase()
        const isDuplicate = channels.some(ch => ch.id !== currentChannelId && ch.name.toLowerCase() === normalizedValue)

        return !isDuplicate
      }),
  })
  const formik = useFormik({
    initialValues: {
      name: channel?.name || '',
    },
    validationSchema: createValidationSchema(channels, channel?.id),
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const filteredName = filterProfanity(values.name)
        await editChannel({ id: channel.id, name: filteredName }).unwrap()
        showChannelRenamed(values.name)
        onHide()
      }
      catch {
        showSaveError(t('channels.title').toLowerCase().slice(0, -1))
        formik.setFieldError('name', t('channels.validation.editError'))
      }
    },
  })

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>{t('channels.editChannel')}</Modal.Title>
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
              onKeyPress={(e) => {
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
            {isLoading ? t('common.saving') : t('common.save')}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default EditChannelModal

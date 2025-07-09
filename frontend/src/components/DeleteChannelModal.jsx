import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useDeleteChannelMutation } from '@/store/channelsApi';
import { removeMessagesByChannel } from '@/store/messagesSlice';
import { showChannelDeleted, showSaveError } from '@/utils/notifications';

const DeleteChannelModal = ({ show, onHide, channel }) => {
  const { t } = useTranslation();
  const [deleteChannel, { isLoading }] = useDeleteChannelMutation();
  const dispatch = useDispatch();
  const handleDeleteChannel = async () => {
    try {
      await deleteChannel(channel.id).unwrap();
      dispatch(removeMessagesByChannel(channel.id));
      showChannelDeleted(channel.name);
      onHide();
    } catch (error) {
      showSaveError(t('channels.title').toLowerCase().slice(0, -1));
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>{t('channels.deleteChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{t('modals.deleteConfirm')}</p>
        <p className="text-muted">{t('modals.deleteWarning')}</p>
        <div className="d-flex gap-2 mt-3">
          <Button
            variant="secondary"
            onClick={onHide}
            disabled={isLoading}
          >
            {t('common.cancel')}
          </Button>
          <Button
            variant="danger"
            onClick={handleDeleteChannel}
            disabled={isLoading}
          >
            {isLoading ? t('common.loading') : t('common.delete')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteChannelModal;

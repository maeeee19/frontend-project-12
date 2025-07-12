import {
  ListGroup, Button, Col, Container, Row, Dropdown, ButtonGroup,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { setSelectedChannel } from '@/store/channelsSlice';
import { useChannels } from '@/hooks/useChannels';
import NewChannelModal from './NewChannelModal';
import EditChannelModal from './EditChannelModal';
import DeleteChannelModal from './DeleteChannelModal';

const ChannelsList = () => {
  const { t } = useTranslation();
  const [showNewChannelModal, setShowNewChannelModal] = useState(false);
  const [showEditChannelModal, setShowEditChannelModal] = useState(false);
  const [showDeleteChannelModal, setShowDeleteChannelModal] = useState(false);
  const dispatch = useDispatch();
  const { channels, selectedChannel, isLoading } = useChannels();
  const [channelToEdit, setChannelToEdit] = useState(null);
  const [channelToDelete, setChannelToDelete] = useState(null);

  const handleChannelClick = (channel) => {
    dispatch(setSelectedChannel(channel));
  };

  const handleShowNewChannelModal = () => {
    setShowNewChannelModal(true);
  };

  const handleHideNewChannelModal = () => {
    setShowNewChannelModal(false);
  };

  const handleShowEditChannelModal = (channel) => {
    setChannelToEdit(channel);
    setShowEditChannelModal(true);
  };

  const handleHideEditChannelModal = () => {
    setShowEditChannelModal(false);
  };

  const handleDeleteChannel = (channelId) => {
    setChannelToDelete(channelId);
    setShowDeleteChannelModal(true);
  };

  const handleHideDeleteChannelModal = () => {
    setShowDeleteChannelModal(false);
  };

  return (
    <>
      <NewChannelModal show={showNewChannelModal} onHide={handleHideNewChannelModal} />
      {channelToEdit && <EditChannelModal show={showEditChannelModal} onHide={handleHideEditChannelModal} channel={channelToEdit} />}
      {channelToDelete && <DeleteChannelModal show={showDeleteChannelModal} onHide={handleHideDeleteChannelModal} channel={channelToDelete} />}
      <Container className="p-3 border rounded">
        <div className="mb-3 d-flex justify-content-between align-items-center">
          <h6>{t('channels.title')}</h6>
          <Button variant="primary" onClick={handleShowNewChannelModal}>{t('common.add')}</Button>
        </div>
        <Row className="mb-3">
          <Col>
            <ListGroup className="mt-3" as="ul">
              {isLoading && <div>{t('channels.loadingChannels')}</div>}
              {channels && channels.map((channel) => (
                <ListGroup.Item
                  onClick={() => handleChannelClick(channel)}
                  action
                  active={selectedChannel?.id === channel.id}
                  className="d-flex justify-content-between align-items-center border-gray-200"
                  as="li"
                  key={channel.id}
                >
                  {
                    channel.removable ? (
                      <Dropdown as={ButtonGroup} className="w-100 h-100 d-flex justify-content-between">
                        <Button variant="success" className="w-100 h-100 d-flex justify-content-between border-0 bg-transparent text-black">
                          #
                          {channel.name}
                        </Button>

                        <Dropdown.Toggle split className="bg-transparent border-1 text-black" id="dropdown-split-basic" />

                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => handleShowEditChannelModal(channel)}>{t('channels.rename')}</Dropdown.Item>
                          <Dropdown.Item onClick={() => handleDeleteChannel(channel)}>{t('channels.remove')}</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    ) : (
                      <Button className="w-100 h-100 d-flex justify-content-between border-0 bg-transparent text-black">
                        #
                        {channel.name}
                      </Button>
                    )
                  }
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ChannelsList;

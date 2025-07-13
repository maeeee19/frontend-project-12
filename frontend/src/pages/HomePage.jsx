import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Appbar from '@/components/Appbar';
import ChannelsList from '@/components/ChannelsList';
import MessagesSection from '@/components/MessagesSection';
import { initWebSocket, disconnectWebSocket } from '@/services/websocket';
import { selectAuth } from '@/store/authSlice';
import { isTokenValid } from '@/utils/auth';

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector(selectAuth);

  useEffect(() => {
    // Проверяем валидность токена
    if (!isTokenValid()) {
      navigate('/login');
      return;
    }

    initWebSocket(dispatch);
    
    return () => {
      disconnectWebSocket();
    };
  }, [navigate, dispatch, token]);

  return (
    <>
      <Appbar />
      <Container className="mt-3">
        <Row>
          <Col xs={4}>
            <ChannelsList />
          </Col>
          <Col xs={8}>
            <MessagesSection />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;

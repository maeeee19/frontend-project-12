import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Appbar from '@/components/Appbar';
import ChannelsList from '@/components/ChannelsList';
import MessagesSection from '@/components/MessagesSection';
import { setAuth } from '@/store/authSlice';
import { initWebSocket } from '@/services/websocket';
import { useDispatch } from 'react-redux';
import { useStore } from 'react-redux';

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const store = useStore();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    if (username && token) {
      dispatch(setAuth({ username, token }));
      initWebSocket(store);
    }
  }, []);

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

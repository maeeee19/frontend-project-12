import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Appbar from '@/components/Appbar';
import ChannelsList from '@/components/ChannelsList';
import MessagesSection from '@/components/MessagesSection';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
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

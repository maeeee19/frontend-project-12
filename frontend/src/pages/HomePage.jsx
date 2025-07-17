import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ChannelsList from '@/components/ChannelsList'
import MessagesSection from '@/components/MessagesSection'

const HomePage = () => {
  return (
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
  )
}

export default HomePage

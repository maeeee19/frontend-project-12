import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Appbar from '@/components/Appbar'
import ChannelsList from '@/components/ChannelsList'
import MessagesSection from '@/components/MessagesSection'
import { initWebSocket } from '@/services/websocket'

const HomePage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      navigate('/login')
      return
    }

    initWebSocket(dispatch)
  }, [navigate, dispatch])

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
  )
}

export default HomePage

import {
  Container, Row, Col, Button,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const NotFoundPage = () => {
  const { t } = useTranslation()

  return (
    <Container className="d-flex justify-content-center align-items-center h-100">
      <Row>
        <Col className="text-center">
          <h1 className="display-1">404</h1>
          <h2 className="mb-4">{t('errors.notFound.title')}</h2>
          <p className="text-muted mb-4">
            {t('errors.notFound.description')}
          </p>
          <Link to="/">
            <Button variant="primary">{t('errors.notFound.backHome')}</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  )
}

export default NotFoundPage

import {
  Form, Button, Container, Row, Col,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { useLogin } from '@/hooks/useAuth'

const LoginPage = () => {
  const { handleLogin, isLoading } = useLogin()

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        await handleLogin(values)
      }
      catch (error) {
        if (error.status === 401) {
          formik.setFieldError('password', 'Неверные имя пользователя или пароль')
        }
        else {
          formik.setFieldError('password', 'Ошибка входа')
        }
      }
    },
  })

  return (
    <Container className="d-flex justify-content-center align-items-center h-100 w-1800">
      <Row>
        <Col>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="username">Ваш ник</Form.Label>
              <Form.Control
                id="username"
                type="username"
                placeholder="Ваш ник"
                onChange={e => formik.setFieldValue('username', e.target.value)}
                value={formik.values.username}
                isInvalid={formik.errors.username}
              />
              {formik.touched.username && formik.errors.username && (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.password}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="password">Пароль</Form.Label>
              <Form.Control
                id="password"
                type="password"
                placeholder="Пароль"
                onChange={e => formik.setFieldValue('password', e.target.value)}
                value={formik.values.password}
                isInvalid={formik.errors.password}
              />
              {formik.touched.password && formik.errors.password && (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.password}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Button className="mt-3" variant="primary" type="submit" disabled={isLoading}>
              Войти
            </Button>
          </Form>
          <div className="d-flex flex-column mt-3">
            <Link to="/signup">Регистрация</Link>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginPage

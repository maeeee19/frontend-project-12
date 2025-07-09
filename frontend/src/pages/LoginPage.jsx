import {
  Form, Button, Container, Row, Col,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import { useDispatch } from 'react-redux';
import { setAuth } from '@/store/authSlice';
import { useLoginMutation } from '@/store/authApi';
import Appbar from '@/components/Appbar';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading, isError }] = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const result = await login(values).unwrap();
        localStorage.setItem('token', result.token);
        localStorage.setItem('username', values.username);
        navigate('/');
        dispatch(setAuth({ username: values.username, token: result.token }));
      } catch (error) {
        showSaveError(t('channels.title').toLowerCase().slice(0, -1));
      }
    },
  });

  return (
    <>
      <Appbar />
      <Container className="d-flex justify-content-center align-items-center h-100 w-1800">
        <Row>
          <Col>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Ваш ник</Form.Label>
                <Form.Control
                  type="username"
                  placeholder="Ваш ник"
                  onChange={(e) => formik.setFieldValue('username', e.target.value)}
                  value={formik.values.username}
                  isInvalid={isError}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Пароль</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Пароль"
                  onChange={(e) => formik.setFieldValue('password', e.target.value)}
                  value={formik.values.password}
                  isInvalid={isError}
                />
              </Form.Group>
              <Button className="mt-3" variant="primary" type="submit" disabled={isLoading}>
                Войти
              </Button>
            </Form>
            <div className="d-flex flex-column mt-3">
              <Link to="/signup">Нет аккаунта? Зарегистрироваться</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginPage;

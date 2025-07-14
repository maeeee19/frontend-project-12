import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import {
  Form, Button, Container, Row, Col,
} from 'react-bootstrap'
import { setAuth } from '@/store/authSlice'
import { useSignupMutation } from '@/store/authApi'

import Appbar from '@/components/Appbar'

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .required('Имя пользователя обязательное поле'),
  password: Yup.string()
    .min(6, 'Не менее 6 символов')
    .max(20, 'Пароль должен быть не более 20 символов')
    .required('Пароль обязательное поле'),
  passwordConfirm: Yup.string()
    .required('Повторите пароль')
    .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
})

const SignupPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [signup, { isLoading }] = useSignupMutation()

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async values => {
      try {
        const result = await signup(values).unwrap()
        localStorage.setItem('token', result.token)
        localStorage.setItem('username', values.username)
        navigate('/')
        dispatch(setAuth({ username: values.username, token: result.token }))
      } catch (error) {
        if (error.status === 409) {
          formik.setFieldError('username', 'Такой пользователь уже существует')
        } else {
          formik.setFieldError('username', 'Ошибка регистрации')
        }
      }
    },
  })

  return (
    <>
      <Appbar />
      <Container className="d-flex justify-content-center align-items-center h-100 w-1800">
        <Row>
          <Col>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="username">Имя пользователя</Form.Label>
                <Form.Control
                  id="username"
                  type="username"
                  placeholder="Имя пользователя"
                  onChange={e => formik.setFieldValue('username', e.target.value)}
                  value={formik.values.username}
                  isInvalid={formik.touched.username && formik.errors.username}
                />
                {formik.touched.username && formik.errors.username && (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.username}
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
                  isInvalid={formik.touched.password && formik.errors.password}
                />
                {formik.touched.password && formik.errors.password && (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="passwordConfirm">Подтвердите пароль</Form.Label>
                <Form.Control
                  id="passwordConfirm"
                  type="password"
                  placeholder="Подтвердите пароль"
                  onChange={e => formik.setFieldValue('passwordConfirm', e.target.value)}
                  value={formik.values.passwordConfirm}
                  isInvalid={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
                />
                {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.passwordConfirm}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <Button className="mt-3" variant="primary" type="submit" disabled={isLoading}>
                Зарегистрироваться
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default SignupPage

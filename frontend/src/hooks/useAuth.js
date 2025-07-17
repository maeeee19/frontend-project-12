import { useEffect } from 'react'
import { store } from '@/store/store'
import { setAuth } from '@/store/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useSignupMutation, useLoginMutation } from '@/store/authApi'

export const useInitAuth = () => {
  const username = localStorage.getItem('username')
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (username && token) {
      store.dispatch(setAuth({ username, token }))
    }
  }, [username, token])

  return { username, token }
}

export const useLogout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    dispatch(setAuth({ username: '', token: '' }))
    navigate('/login')
  }

  return handleLogout
}

export const useSignup = () => {
  const [signup, { isLoading }] = useSignupMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSignup = async (values) => {
    const result = await signup(values).unwrap()
    localStorage.setItem('token', result.token)
    localStorage.setItem('username', values.username)
    navigate('/')
    dispatch(setAuth({ username: values.username, token: result.token }))
  }

  return { handleSignup, isLoading }
}

export const useLogin = () => {
  const [login, { isLoading }] = useLoginMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = async (values) => {
    const result = await login(values).unwrap()
    localStorage.setItem('token', result.token)
    localStorage.setItem('username', values.username)
    navigate('/')
    dispatch(setAuth({ username: values.username, token: result.token }))
  }

  return { handleLogin, isLoading }
}

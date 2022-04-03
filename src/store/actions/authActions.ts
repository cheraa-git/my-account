import { NavigateFunction } from 'react-router-dom'
import axiosApp from '../../axiosApp'
import { authTypes, loginUserPayload } from '../../types/authTypes'
import { LOGIN_USER, LOGOUT_USER, SET_ERROR } from '../actionTypes'


export const postAuthData =
  (payload: { phone: string; password: string }, navigate: NavigateFunction) => async (dispatch: any) => {
    console.log('PAYLOAD', payload)

    try {
      const response = await axiosApp.post('/auth/login', payload)
      const data = response.data
      console.log('postAuthData', response)
      const expirationDate = new Date(new Date().getTime() + 3600000)

      if (!data.error && response.status === 200) {
        dispatch(loginUser({ token: data.token, userName: data.name, userPhone: data.phone, userId: data.id }))
        localStorage.setItem('token', data.token)
        localStorage.setItem('expirationDate', `${expirationDate}`)
        // navigate('/')
        document.location.href = '/'
      } else if (data.error === 'IncorrectPassword') {
        dispatch(setError('Неверный пароль'))
      } else if (data.error === 'UserNotFound') {
        dispatch(setError('Пользователь не найден. Повторите попытку или загеристрирустесь'))
      }
    } catch (e) {
      console.log('Error:', e)
      dispatch(setError('Ошибка'))
    }
  }

export const autoLogin = () => async (dispatch: any) => {
  const token = localStorage.getItem('token')
  // const decodeToken =
  if (!token) {
    return dispatch(logoutUser())
  }

  if (new Date(localStorage.getItem('expirationDate') || '') <= new Date()) {
    return dispatch(logoutUser())
  }


  try {
    const data = (await axiosApp.get('/auth/autologin')).data
    console.log('AUTO_LOGIN_DATA', data)

    if (data.error) {
      return dispatch(logoutUser())
    } else {
      dispatch(loginUser({ token, userName: data.name, userPhone: data.phone, userId: data.id }))
    }
  } catch (e) {
    console.log('Error: ', e)
  }
}

/////////// REDUCER ACITONS

export function setError(error: string): authTypes {
  return {
    type: SET_ERROR,
    payload: error,
  }
}

export function loginUser(data: loginUserPayload): authTypes {
  return {
    type: LOGIN_USER,
    payload: data,
  }
}

export function logoutUser(): authTypes {
  localStorage.removeItem('token')
  localStorage.removeItem('expirationDate')
  return {
    type: LOGOUT_USER,
  }
}

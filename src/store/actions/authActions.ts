import axiosApp from '../../axiosApp'
import { authTypes, loginUserPayload } from '../../types/authTypes'
import { LOGIN_USER, SET_ERROR } from '../actionTypes'

export const postAuthData = (payload: { phone: string; password: string }) => async (dispatch: any) => {
  try {
    const response = await axiosApp.get(`/users?email=${payload.phone}`)
    const data = response.data[0]
    console.log('postAuthData', data)

    if (data.password === payload.password) {
      dispatch(loginUser({ token: data.id, userName: data.name, userPhone: data.phone }))
      localStorage.setItem('token', data.token)
      // document.location.href = '/'
    } else {
      dispatch(setError('Неверный пароль'))
    }
  } catch (e) {
    console.log('Error:', e)
    dispatch(setError('Ошибка'))
  }
}

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

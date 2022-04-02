import { authTypes } from '../../types/authTypes'
import { LOGIN_USER, SET_ERROR } from '../actionTypes'

interface AuthInitialState {
  token: string
  userName: string
  userPhone: string
  isAuth: boolean
  error: string
}

const initialState: AuthInitialState = {
  token: '1',
  userName: 'Александр',
  userPhone: '89256457610',
  isAuth: true,
  error: '',
}

export function authReducer(state = initialState, action: authTypes) {
  switch (action.type) {
    case SET_ERROR:
      return { ...state, error: action.payload }
    case LOGIN_USER:
      return {
        ...state,
        token: action.payload.token,
        userName: action.payload.userName,
        userPhone: action.payload.userPhone,
        isAuth: true,
      }
    default:
      return state
  }
}

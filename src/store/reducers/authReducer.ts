import { authTypes } from '../../types/authTypes'
import { LOGIN_USER, LOGOUT_USER, SET_ERROR } from '../actionTypes'

interface AuthInitialState {
  token: string
  userId: number
  userName: string
  userPhone: string
  isAuth: boolean
  error: string
}

const initialState: AuthInitialState = {
  token: '',
  userId: 0,
  userName: '',
  userPhone: '',
  isAuth: false,
  error: '',
}

export function authReducer(state = initialState, action: authTypes) {
  switch (action.type) {
    case SET_ERROR:
      return { ...state, error: action.payload }
    case LOGIN_USER:
      console.log('LOG', action.payload)

      return {
        ...state,
        token: action.payload.token,
        userName: action.payload.userName,
        userPhone: action.payload.userPhone,
        userId: action.payload.userId,
        isAuth: true,
      }
    case LOGOUT_USER:
      return { ...state, ...initialState }
    default:
      return state
  }
}

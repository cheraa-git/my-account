import { LOGIN_USER, LOGOUT_USER, SET_ERROR } from '../store/actionTypes'

interface setError {
  type: typeof SET_ERROR
  payload: string
}

interface loginUser {
  type: typeof LOGIN_USER
  payload: loginUserPayload
}

interface logoutUser {
  type: typeof LOGOUT_USER
}

export type authTypes = setError | loginUser | logoutUser

///////////////////////////////////////////

export interface loginUserPayload {
  token: string
  userName: string
  userPhone: string
  userId: number
}

export interface postRegistrDataPayload {
  phone: string
  name: string
  password: string
}

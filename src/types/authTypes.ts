import { LOGIN_USER, SET_ERROR } from '../store/actionTypes'

interface setError {
  type: typeof SET_ERROR
  payload: string
}

interface loginUser {
  type: typeof LOGIN_USER
  payload: loginUserPayload
}

export type authTypes = setError | loginUser

///////////////////////////////////////////

export interface loginUserPayload {
  token: number
  userName: string
  userPhone: string
}

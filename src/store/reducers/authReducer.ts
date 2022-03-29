import { authActions } from '../../types/authTypes'

interface AuthInitialState {
  isAuth: boolean
}

const initialState: AuthInitialState = {
  isAuth: false,
}

export function authReducer(state = initialState, action: authActions) {
  switch (action.type) {
    default:
      return state
  }
}

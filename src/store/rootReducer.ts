import { combineReducers } from 'redux'
import { authReducer } from './reducers/authReducer'
import { contactsReducer } from './reducers/contactsReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

const rootReducer = combineReducers({
  auth: authReducer,
  contacts: contactsReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

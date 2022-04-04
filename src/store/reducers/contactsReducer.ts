import { Contact, contactsTypes } from '../../types/contactsTypes'
import { ADD_CONTACT, DEL_CONTACT, EDIT_CONTACT, FILTER, SET_CONTACTS } from '../actionTypes'

interface ContactsInitialState {
  contacts: Contact[]
  filterBy: string
}

const initialState: ContactsInitialState = {
  contacts: [],
  filterBy: '',
}

export function contactsReducer(state = initialState, action: contactsTypes) {
  switch (action.type) {
    case SET_CONTACTS:
      return { ...state, contacts: action.payload }
    case DEL_CONTACT:
      return { ...state, contacts: state.contacts.filter((el) => el.id !== action.id) }
    case ADD_CONTACT:
      return { ...state, contacts: state.contacts.concat(action.payload) }
    case EDIT_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((el) => {
          if (el.id === action.payload.id) {
            return action.payload
          }
          return el
        }),
      }
    case FILTER:
      return { ...state, filterBy: action.payload }
    default:
      return state
  }
}

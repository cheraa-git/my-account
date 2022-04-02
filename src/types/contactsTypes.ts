import { ADD_CONTACT, DEL_CONTACT, EDIT_CONTACT, SET_CONTACTS } from '../store/actionTypes'

interface setContacts {
  type: typeof SET_CONTACTS
  payload: Contact[]
}

interface delContact {
  type: typeof DEL_CONTACT
  id: number
}

interface addContact {
  type: typeof ADD_CONTACT
  payload: Contact
}

interface editContact {
  type: typeof EDIT_CONTACT
  payload: Contact
}

export type contactsTypes = setContacts | delContact | addContact | editContact

/////////////

export interface Contact {
  id: number
  token: string
  name: string
  phone: string
  note: string
}

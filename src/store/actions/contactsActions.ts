import axiosApp from '../../axiosApp'
import { Contact, contactsTypes } from '../../types/contactsTypes'
import { Snackbar } from '../../types/otherTypes'
import { ADD_CONTACT, DEL_CONTACT, EDIT_CONTACT, FILTER, SET_CONTACTS } from '../actionTypes'
import { AppDispatch } from '../rootReducer'

export const fetchContacts = (userId: number) => async (dispatch: AppDispatch) => {
  try {
    const data = (await axiosApp.get(`/contacts?userId=${userId}`)).data
    dispatch(setContacts(data))
    // console.log('fetchContacts', data)
  } catch (e) {
    console.log('Error: ', e)
  }
}

export const addContact = (contact: object, snackbar: Snackbar) => async (dispatch: AppDispatch) => {
  try {
    const data = await axiosApp.post('/contacts', contact)

    if (data.statusText === 'Created') {
      dispatch(addLocalContact(data.data))
      snackbar('Готово!', { variant: 'success' })
    } else snackbar('Ошибка', { variant: 'error' })

    console.log('DATA', data)
  } catch (e) {
    console.log('Error: ', e)
    snackbar('Ошибка', { variant: 'error' })
  }
}

export const delContact = (userId: number, contact: Contact, snackbar: Snackbar) => async (dispatch: AppDispatch) => {
  if (!(userId === contact.userId)) {
    throw new Error('Remove contact error: Invalid userId')
  }
  try {
    const response = await axiosApp.delete(`/contacts/${contact.id}`)
    if (response.statusText === 'OK') {
      dispatch(delLocalContact(contact.id))
      snackbar('Контакт удален')
    } else snackbar('Ошибка', { variant: 'error' })
  } catch (e) {
    console.log('Error: ', e)
    snackbar('Ошибка', { variant: 'error' })
  }
}

export const editContact = (userId: number, contact: Contact, snackbar: Snackbar) => async (dispatch: AppDispatch) => {
  if (!(userId === contact.userId)) {
    throw new Error('Remove contact error: Invalid token')
  }
  try {
    const response = await axiosApp.put(`/contacts/${contact.id}`, contact)

    if (response.statusText === 'OK') {
      dispatch(editLocalContact(contact))
      snackbar('Контакт изменен', { variant: 'success' })
    } else snackbar('Ошибка', { variant: 'error' })
  } catch (e) {
    console.log('Error: ', e)
    snackbar('Ошибка', { variant: 'error' })
  }
}

////////// REDUCER ACTIONS

export function delLocalContact(id: number): contactsTypes {
  return {
    type: DEL_CONTACT,
    id,
  }
}

export function addLocalContact(contact: Contact): contactsTypes {
  return {
    type: ADD_CONTACT,
    payload: contact,
  }
}

export function setContacts(contacts: Contact[]): contactsTypes {
  return {
    type: SET_CONTACTS,
    payload: contacts,
  }
}

export function editLocalContact(contact: Contact): contactsTypes {
  return {
    type: EDIT_CONTACT,
    payload: contact,
  }
}

export function filterContacts(request: string): contactsTypes {
  return {
    type: FILTER,
    payload: request,
  }
}

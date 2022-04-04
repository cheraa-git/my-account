import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/rootReducer'
import { Contact } from '../../types/contactsTypes'
import { PersonCard } from './PersonCard'

export const PersonCardList: React.FC<{ contacts: Contact[] }> = ({ contacts }) => {
  const { filterBy } = useSelector((state: RootState) => state.contacts)

  if (filterBy) {
    contacts = contacts.filter((el) => {
      const n = el.name.toLowerCase()
      const f = filterBy.toLowerCase()
      const p = el.name.toLowerCase()
      if (n.indexOf(f) >= 0 || p.indexOf(f) >= 0) return true
      return false
    })
  }
  contacts.sort((a, b) => {
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1
    return 0
  })

  return (
    <div>
      {contacts.map((contact, index) => (
        <PersonCard contact={contact} key={index} />
      ))}
    </div>
  )
}

import React from 'react'
import { Contact } from '../../types/contactsTypes'
import { PersonCard } from './PersonCard'

export const PersonCardList: React.FC<{ contacts: Contact[] }> = ({ contacts }) => {
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

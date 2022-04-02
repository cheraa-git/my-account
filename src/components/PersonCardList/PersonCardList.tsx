import React from 'react'
import { Contact } from '../../types/contactsTypes'
import { PersonCard } from './PersonCard'

export const PersonCardList: React.FC<{ contacts: Contact[] }> = ({ contacts }) => {
  return (
    <div>
      {contacts.map((contact, index) => (
        <PersonCard contact={contact} key={index} />
      ))}
    </div>
  )
}

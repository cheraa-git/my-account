import React, { useState } from 'react'
import { Contact } from '../../types/contactsTypes'
import { Accordion, AccordionSummary, AccordionDetails, Divider, IconButton } from '@mui/material'
import ArrowSvg from '../../static/app/angle_down.svg'
import PersonSvg from '../../static/app/person-circle.svg'
import { NavLink } from 'react-router-dom'
import { formatPhone } from '../../functions'
import { CreateContactDialog } from '../CreateContactDialog'

export const PersonCard: React.FC<{ contact: Contact }> = ({ contact }) => {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <>
      <Accordion className="mt-2">
        <AccordionSummary
          expandIcon={<img className="opacity-50" src={ArrowSvg} width={15} alt="arrow" />}
          aria-controls="panel1a-content"
        >
          <img className="me-2" src={PersonSvg} width={30} alt="person" />
          <div className="lead">{contact.name}</div>
        </AccordionSummary>

        <AccordionDetails className="bg-light">
          <div className="lead d-flex fs-6">
            <i className="bi bi-telephone-fill opacity-50 me-2" />
            {formatPhone(contact.phone)}

            <NavLink className="ms-auto" to="/">
              <IconButton
                className="pt-0"
                onClick={() => {
                  setDialogOpen(true)
                }}
                color="primary"
                size="small"
              >
                <i className="bi bi-pencil-square" />
              </IconButton>
            </NavLink>
          </div>
          {contact.note && (
            <>
              <Divider />
              <i className="opacity-75"># {contact.note}</i>
            </>
          )}
        </AccordionDetails>
      </Accordion>

      <CreateContactDialog editData={contact} isOpen={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  )
}

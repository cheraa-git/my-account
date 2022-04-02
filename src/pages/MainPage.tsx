import { Button, Dialog, Divider, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CreateContactDialog } from '../components/CreateContactDialog'
import { PersonCardList } from '../components/PersonCardList/PersonCardList'
import { formatPhone } from '../functions'
import { fetchContacts } from '../store/actions/contactsActions'
import { RootState } from '../store/rootReducer'

export const MainPage: React.FC = () => {
  const dispatch = useDispatch()
  const { userName, token, userPhone } = useSelector((state: RootState) => state.auth)
  const { contacts } = useSelector((state: RootState) => state.contacts)
  const [isOpenDialog, setIsOpenDialog] = useState(false)

  useEffect(() => {
    dispatch(fetchContacts(token))
  }, [])
  return (
    <div className="mx-auto ">
      <div className="card">
        <div className="card-body">
          <div className="d-flex">
            <p className="mb-0 lead">Моя карточка</p>
            <Button className="ms-auto" onClick={() => setIsOpenDialog(true)}>
              Создать контакт
            </Button>
          </div>
          <h1 className="display-6">{userName}</h1>
          <h6>{formatPhone(userPhone)}</h6>
        </div>
      </div>
      <hr style={{ height: '3px' }} />
      <PersonCardList contacts={contacts} />

      <CreateContactDialog isOpen={isOpenDialog} onClose={() => setIsOpenDialog(false)} />
    </div>
  )
}

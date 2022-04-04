import { Button, IconButton, InputAdornment, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CreateContactDialog } from '../components/CreateContactDialog'
import { PersonCardList } from '../components/PersonCardList/PersonCardList'
import { formatPhone } from '../functions'
import { fetchContacts, filterContacts } from '../store/actions/contactsActions'
import { RootState } from '../store/rootReducer'

export const MainPage: React.FC = () => {
  const dispatch = useDispatch()
  const { userName, userPhone, userId } = useSelector((state: RootState) => state.auth)
  const { contacts, filterBy } = useSelector((state: RootState) => state.contacts)
  const [isOpenDialog, setIsOpenDialog] = useState(false)

  useEffect(() => {
    dispatch(fetchContacts(userId))
  }, [dispatch, userId])
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
      <TextField
        className="bg-light mt-4 mb-2 "
        value={filterBy}
        onChange={(e) => dispatch(filterContacts(e.target.value))}
        variant="filled"
        label="Поиск"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => dispatch(filterContacts(''))}>
                <i className="bi bi-x"></i>
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <PersonCardList contacts={contacts} />

      <CreateContactDialog isOpen={isOpenDialog} onClose={() => setIsOpenDialog(false)} />
    </div>
  )
}

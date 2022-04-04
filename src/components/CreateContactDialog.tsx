import { Button, Dialog, DialogActions, DialogTitle, TextField, TextFieldProps } from '@mui/material'
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addContact, delContact, editContact } from '../store/actions/contactsActions'
import { RootState } from '../store/rootReducer'
import { Contact } from '../types/contactsTypes'
interface CreateContactDialogProps {
  editData?: Contact
  isOpen: boolean
  onClose: () => void
}

export const CreateContactDialog: React.FC<CreateContactDialogProps> = ({ editData, isOpen, onClose }) => {
  const dispatch = useDispatch()
  const { enqueueSnackbar: snackbar } = useSnackbar()

  const inpConfig: TextFieldProps = { className: 'mb-3', size: 'small', fullWidth: true, variant: 'filled' }
  const initValues = editData
    ? { name: editData.name, phone: editData.phone, note: editData.note }
    : { name: '', phone: '', note: '' }
  const { userId } = useSelector((state: RootState) => state.auth)

  const [inpValues, setInpValues] = useState(initValues)
  const [alertOpen, setAlertOpen] = useState(false)

  const saveHandler = () => {
    if (!inpValues.name) return snackbar('Введите имя')
    if (!inpValues.phone) return snackbar('Введите номер телефона')

    if (!editData) {
      dispatch(addContact({ ...inpValues, userId }, snackbar))
    } else {
      dispatch(editContact(userId, { ...editData, ...inpValues }, snackbar))
    }
    onClose()
  }

  const delHandler = () => {
    dispatch(delContact(userId, editData!, snackbar))
    onClose()
  }

  const closeDialogHandler = () => {
    onClose()
  }
  const delButton = (
    <>
      <Button color="error" onClick={() => setAlertOpen(true)}>
        Удалить контакт
      </Button>

      <Dialog open={alertOpen} onClose={() => setAlertOpen(false)}>
        <DialogTitle id="alert-dialog-title">Вы уверены, что хотите удалить контакт "{editData?.name}"?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setAlertOpen(false)}>Отмена</Button>
          <Button onClick={delHandler} color="error">
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )

  return (
    <Dialog open={isOpen} onClose={closeDialogHandler} fullWidth>
      <div className="card p-2">
        <h1 className="display-6 card-header">{editData ? 'Редактирование' : 'Создание'} контакта</h1>
        <div className="card-body">
          <TextField
            value={inpValues?.name}
            onChange={(e) => setInpValues({ ...inpValues, name: e.target.value })}
            label="Имя"
            {...inpConfig}
          />
          <TextField
            value={inpValues?.phone}
            onChange={(e) => setInpValues({ ...inpValues, phone: e.target.value })}
            label="Номер телефона"
            type="tel"
            {...inpConfig}
          />
          <TextField
            value={inpValues?.note}
            onChange={(e) => setInpValues({ ...inpValues, note: e.target.value })}
            label="Заметки"
            {...inpConfig}
          />
          {editData && delButton}
        </div>

        <DialogActions>
          <Button color="inherit" onClick={closeDialogHandler}>
            Отмена
          </Button>
          <Button onClick={saveHandler}>сохранить</Button>
        </DialogActions>
      </div>
    </Dialog>
  )
}

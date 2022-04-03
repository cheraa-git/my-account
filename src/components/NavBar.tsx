import { Button } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../store/actions/authActions'
import { RootState } from '../store/rootReducer'

export const NavBar: React.FC = () => {
  const { isAuth } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-0">
      <div className="container-fluid">
        <a className="navbar-brand lead" href="/">
          Мои контакты &nbsp;
          <i className="bi bi-person-circle navbar-brand" />
        </a>
        {isAuth && <Button onClick={() => dispatch(logoutUser())}>Выход</Button>}
      </div>
    </nav>
  )
}

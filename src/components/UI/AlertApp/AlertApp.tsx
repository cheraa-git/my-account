import { Alert, AlertProps } from '@mui/material'
import React from 'react'
import { CSSTransition } from 'react-transition-group'
import './AlertApp.sass'

interface Props extends AlertProps {
  error: string
}

export const AlertApp: React.FC<Props> = ({ error, ...alertProps }) => {
  return (
    <div>
      <CSSTransition in={Boolean(error)} timeout={{enter: 200, exit: 400}} classNames="alert" mountOnEnter unmountOnExit>
        <div>
          <Alert severity="error" {...alertProps}>
            {error}
          </Alert>
        </div>
      </CSSTransition>
    </div>
  )
}

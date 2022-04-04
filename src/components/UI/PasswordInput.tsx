import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material'
import React, { useState } from 'react'

export const PasswordInput: React.FC<TextFieldProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div>
      <TextField
        // changeable parameters
        size="small"
        label="Пароль"
        {...props}
        // immutable parameters
        type={showPassword ? 'text' : 'password'}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" style={{ width: 'min-content', marginBottom: '0px' }}>
              <IconButton onClick={handleClickShowPassword} edge="end" className="ms-auto mb-0">
                {showPassword ? (
                  <i className="bi bi-eye-fill opacity-75 me-1"></i>
                ) : (
                  <i className="bi bi-eye-slash-fill opacity-75 me-1"></i>
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  )
}

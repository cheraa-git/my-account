import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { AlertApp } from '../components/UI/AlertApp/AlertApp'
import { postAuthData, postRegistrData, setError } from '../store/actions/authActions'
import { RootState } from '../store/rootReducer'

export const AuthPage: React.FC = () => {
  const dispatch = useDispatch()
  const { mode } = useParams()
  const { error } = useSelector((state: RootState) => state.auth)
  const [inpValue, setInpValue] = useState({ phone: '', password: '', confirmPassword: '', name: '' })
  const [valid, setValid] = useState({ phone: '', name: '', password: '', confirmPassword: '' })

  const loginHandler = () => dispatch(postAuthData({ phone: inpValue.phone, password: inpValue.password }))

  const signupHandler = () => {
    setValid({ ...valid, phone: '', name: '', password: '', confirmPassword: '' })
    const { password, phone, confirmPassword, name } = inpValue
    if (
      password.length >= 6 &&
      name.match(/^[a-zA-Zа-яА-Я0-9]{3,25}$/) &&
      phone.match(/^((8|\+7)[\- ]?)(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/i)
    ) {
      if (password === confirmPassword) {
        dispatch(postRegistrData({ phone, password, name }))
        console.log('success')
        return
      }
      setValid((prev) => ({ ...prev, confirmPassword: 'invalid' }))
    }
    if (password.length < 6) {
      setValid((prev) => ({ ...prev, password: 'invalid' }))
    }
    if (!name.match(/^[a-zA-Zа-яА-Я0-9]{3,25}$/)) {
      setValid((prev) => ({ ...prev, name: 'invalid' }))
    }
    if (!phone.match(/^((8|\+7)[\- ]?)(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/i)) {
      setValid((prev) => ({ ...prev, phone: 'invalid' }))
    }
  }

  const inputHandler = (obj: object) => {
    setInpValue((prev) => ({ ...prev, ...obj }))
  }

  let content = null
  if (mode === 'login' || !mode) {
    content = (
      <>
        <h1 className="display-6">Вход</h1>
        <div className="mb-3">
          <label className="lead form-label">Телефон</label>
          <input
            className="form-control"
            value={inpValue.phone}
            onChange={(e) => inputHandler({ phone: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label className="lead form-label">Пароль</label>
          <input
            type="password"
            className="form-control"
            value={inpValue.password}
            onChange={(e) => inputHandler({ password: e.target.value })}
            minLength={6}
            required
          />
        </div>
        <button className="btn btn-primary" onClick={loginHandler}>
          Войти
        </button>
        <p className="lead mb-0 mt-2">
          Еще нет аккаунта?&nbsp;
          <NavLink className="text-decoration-none" to="/auth/signup">
            Зарегестрируйтесь.
          </NavLink>
        </p>
      </>
    )
  } else if (mode === 'signup') {
    content = (
      <>
        <h2 className="display-6">Регистрация</h2>

        <div className="mb-3">
          <label className="form-label lead">Телефон</label>
          <input
            className={`form-control is-${valid.phone}`}
            value={inpValue.phone}
            onChange={(e) => inputHandler({ phone: e.target.value })}
            required
          />
          <div className="invalid-feedback">Некорректный номер телефона</div>
        </div>

        <div className="mb-3">
          <label className="form-label lead">Никнейм</label>
          <input
            className={`form-control is-${valid.name}`}
            value={inpValue.name}
            onChange={(e) => inputHandler({ name: e.target.value })}
            required
          />
          <div className="invalid-feedback">
            Только буквы (A-Z a-z А-Я а-я) и цифры (0-9), не меньше 3 и не больше 25 символов
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label lead">Пароль</label>
          <input
            type="password"
            className={`form-control is-${valid.password}`}
            value={inpValue.password}
            onChange={(e) => inputHandler({ password: e.target.value })}
            required
            minLength={6}
          />
          <div className="invalid-feedback">Не менее 6 символов</div>
        </div>

        <div className="mb-3">
          <label className="form-label lead">Пароль еще раз</label>
          <input
            type="password"
            className={`form-control is-${valid.confirmPassword}`}
            value={inpValue.confirmPassword}
            onChange={(e) => inputHandler({ confirmPassword: e.target.value })}
            required
            minLength={6}
          />
          <div className="invalid-feedback">Пароли не совпадают</div>
        </div>

        <button className="btn btn-primary" onClick={signupHandler}>
          Зарегистрироваться
        </button>
        <p className="lead mb-0">
          Уже есть аккаунт?&nbsp;
          <NavLink className="text-decoration-none" to="/auth/login">
            Войдите
          </NavLink>
        </p>
      </>
    )
  }
  return (
    <div className="mx-auto">
      {content}
      <AlertApp error={error} onClose={() => dispatch(setError(''))} />
    </div>
  )
}

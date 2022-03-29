import React, { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'

export const AuthPage: React.FC = () => {
  const { mode } = useParams()
  const [inpValue, setInpValue] = useState({ email: '', password: '', confirmPassword: '', name: '' })
  const [valid, setValid] = useState({ email: '', name: '', password: '', confirmPassword: '' })

  const loginHandler = () => {}

  const signupHandler = () => {}

  const inputHandler = (obj: object) => {
    setInpValue((prev) => ({ ...prev, ...obj }))
  }

  let content = null
  if (mode === 'login' || !mode) {
    content = (
      <>
        <h1 className="display-6">Вход</h1>
        <div className="mb-3">
          <label className="lead form-label">E-mail</label>
          <input
            className="form-control"
            value={inpValue.email}
            onChange={(e) => inputHandler({ email: e.target.value })}
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
          <label className="form-label lead">E-mail</label>
          <input
            type="email"
            className={`form-control is-${valid.email}`}
            value={inpValue.email}
            onChange={(e) => inputHandler({ email: e.target.value })}
            required
          />
          <div className="invalid-feedback">Некорректный E-mail</div>
        </div>

        <div className="mb-3">
          <label className="form-label lead">Никнейм</label>
          <input
            className={`form-control is-${valid.name}`}
            value={inpValue.name}
            // onChange={(e) => inputHandler(e, setLogin)}
            required
          />
          <div className="invalid-feedback">
            Только буквы (A-Z a-z) и цифры (0-9), не меньше 3 и не больше 25 символов
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label lead">Пароль</label>
          <input
            type="password"
            className={`form-control is-${valid.password}`}
            value={inpValue.password}
            onChange={(e) => setInpValue({ ...inpValue })}
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
            // onChange={(e) => inputHandler(e, setConfirmPassword)}
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
    <div className="mx-auto" style={{ width: '60%', minWidth: '21rem', maxWidth: '600px' }}>
      {content}
    </div>
  )
}

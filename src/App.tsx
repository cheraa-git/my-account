import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthPage } from './pages/AuthPage'
import { MainPage } from './pages/MainPage'

function App() {
  const isAuth = false

  const RoutesHandler = () => {
    if (isAuth) {
      return (
        <Routes>
          <Route element={<AuthPage />} path="/auth/:mode" />
          <Route element={<MainPage />} path="/" />
        </Routes>
      )
    } else {
      return (
        <Routes>
          <Route element={<AuthPage />} path="/auth/:mode" />
          <Route element={<AuthPage />} path="/" />
        </Routes>
      )
    }
  }
  return (
    <div className="container-fluid">
      <RoutesHandler />
    </div>
  )
}

export default App

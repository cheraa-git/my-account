import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { AuthPage } from './pages/AuthPage'
import { MainPage } from './pages/MainPage'
import { RootState } from './store/rootReducer'

function App() {
  const { isAuth } = useSelector((state: RootState) => state.auth)

  return (
    <>
      <NavBar />
      <div className="container main-content">
        <Routes>
          <Route element={<AuthPage />} path="/auth/:mode" />

          <Route
            element={
              <RequireAuth redirectTo="/auth/login" isAuth={isAuth}>
                <MainPage />
              </RequireAuth>
            }
            path="/"
          />
        </Routes>
      </div>
    </>
  )
}

const RequireAuth: React.FC<{ redirectTo: string; isAuth: boolean }> = ({ children, redirectTo, isAuth }) => {
  return <>{isAuth ? children : <Navigate to={redirectTo} />}</>
}

// const RequireAuth =
export default App

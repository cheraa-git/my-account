import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { AuthPage } from './pages/AuthPage'
import { MainPage } from './pages/MainPage'
import { autoLogin } from './store/actions/authActions'
import { RootState } from './store/rootReducer'

function App() {
  const dispatch = useDispatch()
  const { isAuth } = useSelector((state: RootState) => state.auth)
  useEffect(() => {
    dispatch(autoLogin())
  }, [dispatch])

  const routes = isAuth ? (
    <Routes>
      <Route element={<AuthPage />} path="/auth/:mode" />
      <Route element={<MainPage />} path="/" />
    </Routes>
  ) : (
    <Routes>
      <Route element={<AuthPage />} path="/auth/:mode" />
      <Route element={<AuthPage />} path="/" />
    </Routes>
  )

  return (
    <>
      <NavBar />
      <div className="container main-content">{routes}</div>
    </>
  )
  // return (
  //   <>
  //     <NavBar />
  //     <div className="container main-content">
  //       <Routes>
  //         <Route element={<AuthPage />} path="/auth/:mode" />

  //         <Route
  //           element={
  //             <RequireAuth redirectTo="/auth/login" isAuth={isAuth}>
  //               <MainPage />
  //             </RequireAuth>
  //           }
  //           path="/"
  //         />
  //       </Routes>
  //     </div>
  //   </>
  // )
}

// const RequireAuth: React.FC<{ redirectTo: string; isAuth: boolean }> = ({ children, redirectTo, isAuth }) => {
//   return <>{isAuth ? children : <Navigate to={redirectTo} />}</>
// }

export default App

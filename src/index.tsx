import React from 'react'
import ReactDOM from 'react-dom'
import './index.sass'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store/rootReducer'

import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack'

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <BrowserRouter>
        <SnackbarProvider autoHideDuration={2000}>
          <App />
        </SnackbarProvider>
      </BrowserRouter>
    </Provider>
  </React.Fragment>,
  document.getElementById('root')
)

reportWebVitals()

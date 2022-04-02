import React from 'react'
import ReactDOM from 'react-dom'
import './index.sass'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { rootReducer } from './store/rootReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack'

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <BrowserRouter>
        <SnackbarProvider autoHideDuration={3000}>
          <App />
        </SnackbarProvider>
      </BrowserRouter>
    </Provider>
  </React.Fragment>,
  document.getElementById('root')
)

reportWebVitals()

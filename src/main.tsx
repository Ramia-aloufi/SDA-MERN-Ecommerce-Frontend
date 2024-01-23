import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './App'
import './index.css'
import { ToastContainer } from 'react-toastify'
import store from './redux/store'

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
    <ToastContainer />
  </Provider>
)

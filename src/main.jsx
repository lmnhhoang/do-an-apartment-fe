import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import "easymde/dist/easymde.min.css";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import "easymde/dist/easymde.min.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={ store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)

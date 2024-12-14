import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router";
import './index.css';
import App from './app';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from './app/store'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <AuthProvider>
    <Provider store={store}>
      <App />
      </Provider>
    </AuthProvider>
    <ToastContainer />
  </BrowserRouter>
);

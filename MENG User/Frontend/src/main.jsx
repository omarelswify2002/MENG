import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ShopContextProvider from './context/ShopContextProvider.jsx'
// import { persistor, store } from './redux/store.js';
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react'
// import { GoogleOAuthProvider } from '@react-oauth/google';

// يجب استبدال هذا بمعرف العميل الفعلي من Google Cloud Console
// const clientId =import.meta.env.REACT_APP_GOOGLE_CLIENT_ID || "531565116225-27kljbfqosd8b131nmcisef9m1m0olso.apps.googleusercontent.com";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ShopContextProvider>
      {/* <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GoogleOAuthProvider clientId={clientId}> */}
            <App />
          {/* </GoogleOAuthProvider>
        </PersistGate>
      </Provider>   */}
    </ShopContextProvider>
  </BrowserRouter>
)
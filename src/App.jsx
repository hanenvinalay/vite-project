import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

import Layout from './components/Layout'
import Login from './pages/Login'
import HomeCase from './pages/Home'
import Home from './components/Home'
import OrderView from './pages/OrderView'
import TransferFormPage from './pages/TransferForm'
import Orders from './pages/Orders'
import TransferAccept from './pages/TransferRecipient'
import TransferSuccess from './pages/TransferSuccess'
import DDynamicPDF417 from './pages/Ssnbox'
import Profile from './pages/Profile'
import WebView from './pages/webView'
import OrderAppView from './pages/Events'
import RecipientApp from './pages/Recipient'
import NewTransferFormPage from './pages/Form'
function App () {
  return (
    <Router>
      <Routes>
        {/* Ruta pública */}
        <Route path='/login' element={<Login />} />
          <Route path='/app/user/order/:orderNumber/view' element={<OrderAppView />} />
           <Route
            path='/app/user/order/:orderNumber/received'
            element={<RecipientApp />}
          />
                    <Route path='/user/order/webview/:orderNumber' element={<WebView />} />

          <Route
            path='/app/user/order/:orderNumber/transfer'
            element={<NewTransferFormPage />}
          />
          

        {/* Layout */}
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='user/orders' element={<Orders />} />
          <Route path='user/order/:orderNumber/view' element={<OrderView />} />
          <Route
            path='user/order/:orderNumber/transfer'
            element={<TransferFormPage />}
          />
          <Route
            path='/user/order/:transferNumber/recipient'
            element={<TransferAccept />}
          />
          <Route
            path='/user/order/:orderNumber/transfer/success'
            element={<TransferSuccess />}
          />
          <Route path='/sandbox' element={<DDynamicPDF417 />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/user/order/webview/:orderNumber' element={<WebView />} />

          {/* Redirección para rutas no definidas */}
          <Route path='*' element={<Navigate to='/' replace />} />
        </Route>

        {/* Catch-all */}
      </Routes>
    </Router>
  )
}

export default App

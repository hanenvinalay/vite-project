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
import WebViewPage from './pages/WebView'
function App () {
  return (
    <Router>
      <Routes>
        {/* Ruta pública */}
        <Route path='/login' element={<Login />} />

        {/* Layout */}
        <Route element={<Layout />}>
          <Route path='/' element={<HomeCase />} />
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
          <Route path='/user/order/webview/:orderNumber' element={<WebViewPage />} />

          {/* Redirección para rutas no definidas */}
          <Route path='*' element={<Navigate to='/' replace />} />
        </Route>

        {/* Catch-all */}
      </Routes>
    </Router>
  )
}

export default App


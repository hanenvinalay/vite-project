import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../css/TransferirBoletos.css'
import './receipent.css'
import { AccordionLat } from '../components/NavBar'
import { authenticatedRequest, getUser, getOrder } from '../api/index'
import Modal from '../components/Modal'
import { API_URL } from '../api/index'
export default function RecipientApp () {
  const { orderNumber } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    document.title = 'Transferir Boletos - Ticketmaster'
  }, [])

  const user = getUser()

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      try {
        const result = await authenticatedRequest('/orders/' + orderNumber)

        if (!result) {
          throw new Error('La respuesta no es valida')
        }

        if (isMounted) setOrder(result)
      } catch (err) {
        if (isMounted) setError(err.message)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [])



 

  if (loading) {
    return <Modal isOpen text='Espera, estamos trabajando en tu solicitud.' />
  }

  if (error || !order) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h2 className='text-xl font-semibold mb-2 text-red-600'>Error</h2>
          <p className='text-gray-600'>{error || 'Orden no encontrada'}</p>
          <button
            onClick={() => navigate('/user/orders')}
            className='mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
          >
            Volver a Mis Boletos
          </button>
        </div>
      </div>
    )
  }
const time = order?.event?.formattedDate?.time


return (
  <div className='j'>
    {loading ? (
<></>    ) : (
        <div className='sc-12r1da7-0 efoHKt'>
      <div className='sc-12r1da7-1 beLWZo'>
        <div className='sc-12r1da7-2 ksJoti'>
          <div className='sc-a655db-0 jxczVS sc-1lei1ts-1 qXwvy'>
            <div
              className='sc-a655db-1 gxhkGK'
              style={{
                backgroundImage: `url(${
                  order?.event?.poster || '/placeholder.svg'
                })`
              }}
            />
            <div className='sc-a655db-2 kGlGTT' />
            <div className='sc-a655db-3 fUvnFH' />
          </div>
        </div>
        <div className='sc-12r1da7-5 kVpbfe'>
          <div className='sc-12r1da7-6 hOAGVs'>
            <div className='sc-12r1da7-12 hByXSe'>
              <nav aria-label='Breadcrumb'>
                <ol data-testid='breadcrumb' className='sc-1loturx-0 gozBND'>
                  <li className='sc-1loturx-1 fUOijd'>
                    <a
                      aria-current='false'
                      className='sc-jfe99z-1 cKVhWb sc-1loturx-4 cDhlqi'
                      href='/'
                    >
                      Inicio
                    </a>
                    <span
                      role='presentation'
                      aria-hidden='true'
                      className='sc-1loturx-2 kJBquy'
                    />
                  </li>
                  <li className='sc-1loturx-1 fUOijd'>
                    <a
                      aria-current='false'
                      className='sc-jfe99z-1 cKVhWb sc-1loturx-4 cDhlqi'
                      href='#'
                      onClick={e => {
                        e.preventDefault()
                        navigate('/user/orders')
                      }}
                    >
                      Mis boletos
                    </a>
                    <span
                      role='presentation'
                      aria-hidden='true'
                      className='sc-1loturx-2 kJBquy'
                    />
                  </li>
                  <li className='sc-1loturx-1 fUOijd'>
                    <a
                      aria-current='false'
                      className='sc-jfe99z-1 cKVhWb sc-1loturx-4 cDhlqi'
                      href='#'
                      onClick={e => {
                        e.preventDefault()
                        navigate(`/user/order/${orderNumber}/view`)
                      }}
                    >
                      {order?.event?.event || 'Evento'}
                    </a>
                    <span
                      role='presentation'
                      aria-hidden='true'
                      className='sc-1loturx-2 kJBquy'
                    />
                  </li>
                  <li className='sc-1loturx-1 fUOijd'>
                    <span aria-current='page' className='sc-1loturx-5 jDteSL'>
                      Recibo de mi compra
                    </span>
                  </li>
                </ol>
              </nav>
              {/* Event info header */}
              <div className='sc-t48uod-0 kMfWDd'>
                <div className='sc-t48uod-1 dFONlU'>
                
                </div>
                <div className='sc-t48uod-2 cSmcrp'>
                  <div className='sc-1xcba17-1 kQBTiV'>
                   
                    <div className='sc-1xcba17-2 buEEof'>
                     
                      <div>
                        <h1     style={{ fontSize: '34px', fontWeight: 'bold' }} className='sc-1xcba17-4 inPRYG'>
                         Recibo de mi compra
                        </h1>
                      
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='sc-12r1da7-3 hkfycW'>
        <svg
          className='BaseSvg-sc-yh8lnd-0 TicketmasterTIcon___StyledBaseSvg-sc-14ttjcp-0 ckLyyv sc-12r1da7-4 ifQjSN'
          viewBox='0 0 24 24'
          width='1.5em'
          height='1.5em'
          aria-hidden='true'
          focusable='false'
        >
          <path d='M11.23 17.47c0-.59.1-1.12.18-1.47l1.45-6.62h3.57l.63-2.88h-3.57l.98-4.5-4.28 1.38-.68 3.12H6.62L6 9.38h2.88L7.75 14.5a16 16 0 0 0-.5 3.52c0 2.92 1.9 3.98 4.6 3.98.69 0 1.46-.21 2.15-.36l.68-3.06c-.5.21-1.22.36-1.93.36-.9 0-1.52-.56-1.52-1.47' />
        </svg>
        <div className='sc-19fgctb-0 kPTTFr sc-12r1da7-13 kxIlgt'>
          <p className='sc-19fgctb-1 bEa-Det'>
            <span className='sc-19fgctb-2 uriLe'>¡Bienvenido de vuelta!</span>{' '}
            <span data-cs-mask='true' className='sc-19fgctb-3 kKgqHA'>
              {user?.name || 'Usuario'}
            </span>
          </p>
        </div>
      </div>
      <div className='sc-12r1da7-7 khmaYE'>
        <AccordionLat />
      </div>

      <div className='sc-12r1da7-10 jRKBxK'>
    


        <form
          id='mi-formulario'
          className='sc-1nmwc0i-1 sc-xfnp0f-0 itIEIv iDDVVu'
        
        >
          <div className='sc-1nmwc0i-0 lkTCwgt'>
           
          
            <div className="sc-4fd5298b-0 jUmYIm">
  <div className="indexstyles__Card-sc-cvxwg8-0 sc-176f09a7-11 cfGQrC fIjlcc">
    <h2 className="indexstyles__Title-sc-cvxwg8-1 sc-176f09a7-0 cSqFpp iYBBdI">
      Compra #76-{order?.id || 'XXXX'}/MXC
    </h2>
    <div className="indexstyles__Body-sc-cvxwg8-2 sc-176f09a7-9 eguRCZ bhFDSu">
      <div className="sc-176f09a7-1 sc-176f09a7-10 kGLqZZ ibgvXd">
        <div className="sc-176f09a7-2 gkuqiK">
          <div className="sc-176f09a7-4 eLPJDU">
            <dl className="sc-176f09a7-5 ZMlsV">
              <dt className="sc-176f09a7-6 bCpYvW">Fecha de compra</dt>
              <dd className="sc-176f09a7-7 ffGxIw">
                <span>23/01/26</span>
              </dd>
            </dl>
          </div>
          <div className="sc-176f09a7-4 eLPJDU">
            <dl className="sc-176f09a7-5 ZMlsV">
              <dt className="sc-176f09a7-6 bCpYvW">Entrega</dt>
              <dd className="sc-176f09a7-7 ffGxIw">Móvil</dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="sc-faaad1da-0 cjXqde">
        <h3 className="sc-faaad1da-1 ghHiyi">{order?.event?.event || 'Evento'}</h3>
        <div className="sc-faaad1da-2 iXXWZT">
          <p className="sc-faaad1da-3 bJNtzu">
{order?.event?.venue || 'Lugar del evento'}          </p>
          <p className="sc-faaad1da-3 bJNtzu">
            <span>09/05/26</span> - <span>{time}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
  <div data-testid="order-ticket-details-card">
    <div className="indexstyles__Card-sc-cvxwg8-0 sc-a0d824b6-0 cfGQrC biyxxa">
      <div className="sc-e186bf6c-0 gTAewp">
        <h2 className="indexstyles__Title-sc-cvxwg8-1 sc-e186bf6c-1 cSqFpp jIXjzf">
          Order Date: <span>23/01/26</span>
        </h2>
        <h3 className="sc-e186bf6c-3 hdIrFu">Boletos</h3>
        <ul className="sc-e186bf6c-2 hhmLVQ">


          {
            order.tickets.map(ticket => (
               <li
            data-testid="ticket-info-card-ticket"
            className="sc-e186bf6c-4 esXwZo"
          >
            <dl className="sc-e186bf6c-5 qHAEk">
              <dt className="sc-e186bf6c-6 gxiGIP">{ticket.type || 'Boleto normal'}</dt>
              <dd className="sc-e186bf6c-8 jRIFXi">
                <div className="sc-e186bf6c-13 OUzhm">
                  <div
                    data-testid="seat-info"
                    className="sc-e186bf6c-14 lcajoo"
                  >
                   {ticket?.info}
                  </div>
                </div>
              </dd>
            </dl>
            <p className="sc-e186bf6c-9 npVvu">
              <span>$1,250.00</span>
            </p>
          </li>
              ))
          }
        
         
        </ul>
      </div>
      <div data-testid="total-costs">
        <div data-testid="subtotal">
          <div className="sc-949ce72-3 sc-8c5c2588-0 iasIGi kjaOMa">
            <p className="sc-949ce72-0 kCnmqJ">Subtotal</p>
            <p className="sc-949ce72-5 sc-8c5c2588-7 jYyXVm eojVTO">
              <span className="sc-8c5c2588-4 klhKBJ">MXN</span>
              <span>$2,500.00</span>
            </p>
          </div>
        </div>
        <div data-testid="additionalLineItems" className="sc-8c5c2588-3 dGKHnr">
          <p className="sc-949ce72-2 cISCOK">Cargos</p>
          <div className="sc-949ce72-3 sc-f4a89edb-0 iasIGi cjTwCn">
            <div className="sc-949ce72-1 fABVQk">
              <p className="sc-949ce72-0 kCnmqJ">
                Cargos por Servicio: <span>$300</span> x 2
              </p>
              <p className="sc-949ce72-5 jYyXVm">
                <span>$600.00</span>
              </p>
            </div>
          </div>
          <div className="sc-949ce72-3 iasIGi">
            <p className="sc-949ce72-0 kCnmqJ">Gastos de gestión</p>
            <p className="sc-949ce72-5 jYyXVm">
              <span>$50.00</span>
            </p>
          </div>
          <p className="sc-949ce72-2 cISCOK">Cargo por Envío:</p>
          <div className="sc-949ce72-1 fABVQk">
            <p className="sc-949ce72-0 kCnmqJ">Móvil</p>
            <p className="sc-949ce72-5 sc-8c5c2588-5 jYyXVm emPqux">Gratis</p>
          </div>
        </div>
        <div data-testid="total" className="sc-8c5c2588-13 hToRaT">
          <div className="sc-8c5c2588-1 bsQvET">
            <p className="sc-949ce72-0 sc-8c5c2588-14 kCnmqJ hoEXzO">Total</p>
            <div className="sc-8c5c2588-2 fJkSva">
              <div className="sc-8c5c2588-15 hfmsK">
                <p className="sc-949ce72-5 jYyXVm">
                  <span className="sc-8c5c2588-4 klhKBJ">MXN</span>
                  <span>$3,150.00</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sc-e6bc7716-0 dpZbKc" />
      <div className="sc-e6bc7716-1 kaCSzk">
        <h3 className="sc-e6bc7716-2 lataHv">Pago</h3>
        <div className="sc-e6bc7716-9 jUtzuP">
          <div className="sc-e6bc7716-8 gnderY">
            <dl className="sc-e6bc7716-10 eXpCZs">
              <dt className="sc-e6bc7716-6 sc-e6bc7716-7 eFgeNN a-dnLe">
                Fecha
              </dt>
              <dd className="sc-e6bc7716-3 ldXIuB">
                <span>23/01/26</span>
              </dd>
            </dl>
            <dl className="sc-e6bc7716-10 eXpCZs">
              <dt className="sc-e6bc7716-6 sc-e6bc7716-7 eFgeNN a-dnLe">
                Método de pago
              </dt>
              <dd className="sc-e6bc7716-3 ldXIuB">
                <div>
                  <p className="sc-e6bc7716-4 kGFtzk">
                    Mastercard
                    <span className="sc-e6bc7716-5 jJrXHk">
                      <span aria-hidden="true">****</span>
                      <span>3975</span>
                    </span>
                  </p>
                </div>
              </dd>
            </dl>
            <dl className="sc-e6bc7716-10 eXpCZs">
              <dt className="sc-e6bc7716-6 sc-e6bc7716-7 eFgeNN uRMft">
                Total
              </dt>
              <dd className="sc-e6bc7716-3 ldXIuB">
                <div>
                  <span className="sc-e6bc7716-11 kdxXnp">MXN</span>
                  <span>$3,150.00</span>
                </div>
              </dd>
            </dl>
          </div>
          <dl>
            <dt className="sc-e6bc7716-6 eFgeNN">Nombre</dt>
            <dd className="sc-e6bc7716-3 ldXIuB">Mendez Ornelas</dd>
            <dt className="sc-e6bc7716-6 eFgeNN">Dirección de facturación</dt>
            <dd className="sc-e6bc7716-3 ldXIuB">
           Rio Misisipi 34 Del valle Nuevo Leon 64100
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</div>

          </div>

       



          <div className='sc-1nmwc0i-4 Imfyot'>
              <div className="indexstyles__Card-sc-cvxwg8-0 sc-4235fe78-6 cfGQrC ccfVdD">
        <h2 className="indexstyles__Title-sc-cvxwg8-1 cSqFpp">
          This is not a ticket
        </h2>
        <div className="indexstyles__Body-sc-cvxwg8-2 sc-4235fe78-4 eguRCZ dxrxPH">
          <p className="sc-4235fe78-5 ikIbQ">
            Please be aware, this page cannot be used for entry to an event
          </p>
          <button
            type="button"
            className="indexstyles__StyledButton-sc-83qv1q-0 OXsGj"
          >
            <span className="indexstyles__FlexWrapper-sc-83qv1q-1 hJuAcy">
              <span>Print Receipt</span>
            </span>
          </button>
        </div>
      </div>
            <div className='indexstyles__Card-sc-cvxwg8-0 dHWtvF'>
             
            </div>
          </div>

        </form>
      </div>
    </div>
    )}
  </div>
)


 
}

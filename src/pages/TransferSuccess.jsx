import { useEffect, useState } from 'react'
import '../css/Transfersucess.css'
import Modal from '../components/Modal'
import { AccordionList } from '../components/NavBar'
import { getUser } from '../api'
import { useLocation, useParams, useNavigate } from 'react-router-dom'

export default function TransferSuccess () {
  const navigate = useNavigate()
  const location = useLocation()
  const user = getUser()
  const { orderNumber } = useParams()

  const [transfer, setTransfer] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = 'Mi cuenta - Transferencia exitosa'

    // 🔹 La respuesta viene SOLO desde navigate(state)
    const stateTransfer = location.state?.transfer

    if (!stateTransfer) {
      // Entrada directa por URL o refresh
      navigate('/user/orders', { replace: true })
      return
    }

    setTransfer(stateTransfer)
    setLoading(false)
  }, [location.state, navigate])

  if (loading || !transfer) {
    return <Modal isOpen text='Espera, estamos trabajando en tu solicitud.' />
  }
  const event = transfer?.event || {}
  const tickets = transfer?.tickets || []

  return (
    <main id='main-content' className='snipcss-7zbHI'>
      <div className='sc-12r1da7-0 efoHKt'>
        <div className='sc-12r1da7-1 beLWZo'>
          <div className='sc-12r1da7-2 ksJoti'>
            <div className='sc-a655db-0 jxczVS sc-1lei1ts-1 qXwvy'>
              <div
                className='sc-a655db-1 bSSjWM'
                style={{
                  backgroundImage:
                    event && event.poster ? `url(${event.poster})` : 'none'
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
                        href='/user/orders'
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
                      >
                        {event?.name || event?.artist || 'Evento'}
                      </a>
                      <span
                        role='presentation'
                        aria-hidden='true'
                        className='sc-1loturx-2 kJBquy'
                      />
                    </li>
                    <li className='sc-1loturx-1 fUOijd'>
                      <span aria-current='page' className='sc-1loturx-5 jDteSL'>
                        Transferencia de Boletos
                      </span>
                    </li>
                  </ol>
                </nav>
                <div className='sc-t48uod-0 kMfWDd'>
                  <div className='sc-t48uod-1 dFONlU'>
                    <img
                      src={event?.poster || '/placeholder.svg'}
                      alt='Poster del evento'
                      className='sc-t48uod-3 ddIAlU'
                    />
                  </div>
                  <div className='sc-t48uod-2 cSmcrp'>
                    <div className='sc-1xcba17-1 kQBTiV'>
                      <span className='VisuallyHidden-sc-8buqks-0 lmhoCy'>
                        <span>
                          {event?.formattedate?.shortDate || 'Fecha del evento'}
                        </span>
                      </span>
                      <span aria-hidden='true'>
                        <div aria-hidden='true' className='sc-1eisn46-0 hPSPJL'>
                          <span className='sc-1eisn46-1 chthMZ'>
                            {event?.formattedDate?.month || 'ENE'}
                          </span>
                          <span className='sc-1eisn46-2 iRCDqS'>
                            {event?.formattedDate?.day || '01'}
                          </span>
                          <span className='sc-1eisn46-3 fFbPas' />
                        </div>
                      </span>
                      <div className='sc-1xcba17-2 buEEof'>
                        <div className='sc-1xcba17-3 iYOCcf'>
                          <span className='VisuallyHidden-sc-8buqks-0 lmhoCy'>
                            <span>
                              {event?.formattedDate?.shortDate ||
                                'Información del evento'}
                            </span>
                          </span>
                          <span aria-hidden='true'>
                            <div aria-hidden='true' className='sc-hkg1cn-0'>
                              <span className='sc-hkg1cn-1 khlcWQ'>
                                {event?.formattedDate?.shortDate ||
                                  'Información del evento'}
                              </span>
                            </div>
                          </span>
                        </div>
                        <div>
                          <p className='sc-1xcba17-4 inPRYG'>
                            {event?.name ||
                              event?.artist ||
                              'Nombre del evento'}
                          </p>
                          <p className='sc-1xcba17-5 PvcYX'>
                            {event?.venue || 'Venue del evento'}
                          </p>
                          <div className='sc-1xcba17-0 jihcxv' />
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
          <AccordionList />
        </div>
        <div className='sc-12r1da7-8 UohSU'>
          <div className='sc-1lei1ts-2 evYqPa' />
        </div>
        <div className='sc-12r1da7-10 jRKBxK'>
          <div className='sc-12r1da7-12 sc-1lei1ts-0 hByXSe'>
            <div className='sc-1nmwc0i-3 sc-13t69ws-0 hLArtP hvPOjw'>
              <div
                role='alert'
                aria-live='polite'
                aria-atomic='true'
                className='indexstyles__Card-sc-cvxwg8-0 sc-tota5i-0 dHWtvF blSXjT'
              >
                <div className='Stack-sc-br1alc-0 deKrdu'>
                  <div className='sc-tota5i-1 hbTXqm'>
                    <svg
                      viewBox='0 0 24 24'
                      width='3em'
                      height='3em'
                      aria-hidden='true'
                      focusable='false'
                      className='BaseSvg-sc-yh8lnd-0 CheckmarkCircledFilledIcon___StyledBaseSvg-sc-8x9s3w-0 cXMMus'
                    >
                      <path d='M23 12a11 11 0 1 1-22 0 11 11 0 0 1 22 0m-12.96 5.1 7.52-8.6-1.12-1-6.48 7.4-2.43-2.43-1.06 1.06z' />
                    </svg>
                  </div>
                  <div id='namesito' className='sc-tota5i-2 koWrfQ'>
                    <h1 className='sc-tota5i-2 koWrfQ'>
                      ¡Enviaste {tickets.length || 0} boleto(s) a{' '}
                      {transfer?.recipient_name || 'Usuario'}!
                    </h1>
                  </div>
                  <p id='mailo' className='sc-tota5i-3 eDIwjU'>
                    {transfer?.recipient_email || transfer.recipient_email}
                  </p>
                  <p className='sc-tota5i-3 eDIwjU'>
                    {transfer?.recipient_name || transfer.recipient_name}{' '}
                    {transfer?.recipient_lastname ||
                      transfer.recipient_lastname}
                  </p>

                  <div id='ticket-container'>
                    {tickets && tickets.length > 0 ? (
                      <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {tickets.map((ticket, idx) =>
                          ticket.section === 'PISTA' ||
                          ticket.section === 'GRAL' ? (
                            // Template para boletos de PISTA o GRAL-B
                            <li
                              key={ticket.id || idx}
                              style={{ marginBottom: '0.5rem' }}
                            >
                              <div className='TicketCardv2__Card-sc-1akc5v-0 kxlGTJ'>
                                <div className='TicketCardv2__TicketHeaderBorderContainer-sc-1akc5v-2 hiRXqo' />
                                <div className='TicketCardv2__ChildrenWrapper-sc-1akc5v-1 cWeWMl'>
                                  <div className='TicketTopSection__TopSectionWrapper-sc-11bz39i-0 kAoiSe'>
                                    <div className='TicketInfoHeader__HeaderContainer-sc-101wb79-0 ctixpn'>
                                      <h2
                                        translate='no'
                                        className='TicketInfoHeader__HeaderTitle-sc-101wb79-1 sbbQd'
                                        style={{}}
                                      >
                                        {ticket.type || 'Boleto de pista'}
                                      </h2>
                                    </div>
                                    <div className='TicketTopSectionGeneric__MainTextWrapper-sc-1sfa0cb-0 cDtTZX'>
                                      <p className='TicketTopSectionGeneric__BodyText-sc-1sfa0cb-1 eQWkMw'>
                                        ENTRADA GENERAL / REF:
                                      </p>
                                      <p
                                        translate='no'
                                        className='TicketTopSectionGeneric__Reference-sc-1sfa0cb-2 iBOGvu'
                                      >
                                        REFERENCIA {ticket.section}-G0-3
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ) : (
                            // Template para boletos normales
                            <li
                              key={ticket.id || idx}
                              style={{ marginBottom: '0.5rem' }}
                            >
                              <div className='TicketCardv2__Card-sc-1akc5v-0 kxlGTJ'>
                                <div className='TicketCardv2__TicketHeaderBorderContainer-sc-1akc5v-2 hiRXqo' />
                                <div
                                  style={{ display: 'block' }}
                                  className='TicketCardv2__ChildrenWrapper-sc-1akc5v-1 cWeWMl'
                                ></div>
                                <div
                                  style={{ display: 'block' }}
                                  className='sc-uu0a5r-0 bsJLZE'
                                >
                                  <div className='bHIhNV snipcss-W5hsS'>
                                    <div className='ctixpn'>
                                      <h2 className='cTdnwj'>
                                        {ticket.type || 'Boleto de pista'}
                                      </h2>
                                    </div>
                                    <div className='ficefJ'>
                                      <div className='SeatInfov2__Row-sc-hzxzxj-0 hXYMZK'>
                                        <div className='ftTdK'>
                                          <p className='dXJLXg'>Sección</p>
                                          <p translate='no' className='ia-dyIj'>
                                            {ticket.section}
                                          </p>
                                        </div>
                                        <div className='jPmdZv'>
                                          <p className='dXJLXg'>Fila</p>
                                          <p translate='no' className='cRtdJv'>
                                            {ticket.row}
                                          </p>
                                        </div>
                                        <div className='dkuubl'>
                                          <p className='dXJLXg'>Asiento(s)</p>
                                          <p translate='no' className='elGusI'>
                                            {ticket.seat}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          )
                        )}
                      </ul>
                    ) : (
                      <div>No hay boletos seleccionados.</div>
                    )}
                  </div>
                  <p
                    style={{
                      marginTop: '16px',
                      padding: '12px',
                      backgroundColor: '#ffffff',
                      borderRadius: '4px'
                    }}
                  >
                    <strong>Importante:</strong> Una vez que el destinatario
                    acepte la transferencia, el(los) boleto(s) no estará(n)
                    disponible(s) en tu cuenta.
                  </p>
                  <hr />
                  <div className='sc-1ss8sxt-0 ixDTnq'>
                    <a
                      className='sc-jfe99z-1 cKVhWb indexstyles__StyledButton-sc-83qv1q-0 bnRBHg sc-1ss8sxt-1 frSXiK'
                      href={`/user/order/${orderNumber}/view`}
                    >
                      <span className='indexstyles__FlexWrapper-sc-83qv1q-1 kCQEIv'>

                        <span className='indexstyles__Text-sc-83qv1q-2 jHTUWf'>
                          Regresar a mis boletos
                        </span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
              <div className='indexstyles__Card-sc-cvxwg8-0 sc-u5xtv4-0 dHWtvF eETNjj sc-1v19m9j-0 knvLKX'>
                <h2 className='sc-u5xtv4-1 grVhyd'>¿Qué sucede después?</h2>
                <div className='sc-u5xtv4-2 hnDCuW'>
                  <div className='sc-u5xtv4-3 kawtcn'>
                    <svg
                      className='BaseSvg-sc-yh8lnd-0 InfoICircledIcon___StyledBaseSvg-sc-abq1mc-0 ckLyyv sc-1v19m9j-2 fMHdKF'
                      viewBox='0 0 24 25'
                      width='1.5em'
                      height='1.5em'
                      aria-hidden='true'
                      focusable='false'
                    >
                      <path d='M12 22a9.5 9.5 0 1 1 0-19 9.5 9.5 0 0 1 0 19m0 1.5a11 11 0 1 0 0-22 11 11 0 0 0 0 22 M11 6.5v2h2v-2zm.5 5v7H13V10h-2.75v1.5z' />
                    </svg>
                  </div>
                  <div>
                    <h3>El destinatario recibirá un email</h3>
                    <p>
                      {transfer.recipient_name || transfer.recipient_name}{' '}
                      recibirá un correo electrónico en{' '}
                      {transfer.recipient_email || transfer.recipient_email} con
                      instrucciones para aceptar la transferencia.
                    </p>
                  </div>
                </div>
                <div className='sc-u5xtv4-2 hnDCuW'>
                  <div className='sc-u5xtv4-3 kawtcn'>
                    <svg
                      className='BaseSvg-sc-yh8lnd-0 ClockIcon___StyledBaseSvg-sc-vpi5w8-0 ckLyyv sc-1v19m9j-1 icOwJa'
                      viewBox='0 0 24 24'
                      width='1.5em'
                      height='1.5em'
                      aria-hidden='true'
                      focusable='false'
                    >
                      <path d='M23 1H1v22h16.31L23 17.31zM2.5 21.5v-19h19v14.19l-4.81 4.81zM12.75 4.75h-1.5v7.68l4.25 3.82 1-1.1-3.75-3.39z' />
                    </svg>
                  </div>
                  <div>
                    <h3>Revisa el estado de tu transferencia</h3>
                    <p>
                      Puedes verificar el estado de tu transferencia en
                      cualquier momento desde tu cuenta.
                    </p>
                    <a
                      className='sc-jfe99z-1 cKVhWb indexstyles__StyledButton-sc-83qv1q-0 jxBtQI sc-u5xtv4-5 cwTSCJ'
                      href='/user/orders'
                    >
                      <span className='indexstyles__FlexWrapper-sc-83qv1q-1 kCQEIv'>
                        <span className='indexstyles__Text-sc-83qv1q-2 jHTUWf'>
                          Ver mis boletos
                        </span>
                      </span>
                    </a>
                  </div>
                </div>
                <div className='sc-u5xtv4-2 hnDCuW'>
                  <div className='sc-u5xtv4-3 kawtcn'>
                    <svg
                      className='BaseSvg-sc-yh8lnd-0 ClockIcon___StyledBaseSvg-sc-vpi5w8-0 ckLyyv sc-1v19m9j-1 icOwJa'
                      viewBox='0 0 24 24'
                      width='1.5em'
                      height='1.5em'
                      aria-hidden='true'
                      focusable='false'
                    >
                      <path d='M23 1H1v22h16.31L23 17.31zM2.5 21.5v-19h19v14.19l-4.81 4.81zM12.75 4.75h-1.5v7.68l4.25 3.82 1-1.1-3.75-3.39z' />
                    </svg>
                  </div>
                  <div>
                    <h3>¿Cambiaste de parecer?</h3>
                    <p>
                      Hasta que el destinatario acepte el(los) boleto(s), puedes
                      cancelar la transferencia desde tu cuenta.
                    </p>
                    <button
                      className='indexstyles__StyledButton-sc-83qv1q-0 jTDNmo sc-u5xtv4-5 cwTSCJ'
                      type='button'
                      onClick={() => {
                        // Limpiar datos de transferencia y regresar
                        localStorage.removeItem('transferFormData')
                        navigate('/user/orders')
                      }}
                    >
                      <span className='indexstyles__FlexWrapper-sc-83qv1q-1 kCQEIv'>
                        <span className='indexstyles__Text-sc-83qv1q-2 jHTUWf'>
                          Ir a mis boletos
                        </span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='sc-12r1da7-11 fJviFQ'>
          <div className='sc-1fhsjif-0 jSgUsv'>
            <div role='status' className='sc-1qrebct-0 emUgsl' />
          </div>
        </div>
      </div>
    </main>
  )
}

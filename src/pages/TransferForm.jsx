import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../css/TransferirBoletos.css'
import { AccordionLat } from '../components/NavBar'
import { authenticatedRequest, getUser, getOrder } from '../api/index'
import Modal from '../components/Modal'
import { API_URL } from '../api/index'
export default function TransferFormPage () {
  const { orderNumber } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    recipient_email: '',
    recipient_name: '',
    recipient_lastname: '',
    ticket_ids: [],
    event_id: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

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

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleTicketChange = ticketId => {
    setForm(prev => {
      const alreadySelected = prev.ticket_ids.includes(ticketId)
      return {
        ...prev,
        ticket_ids: alreadySelected
          ? prev.ticket_ids.filter(id => id !== ticketId)
          : [...prev.ticket_ids, ticketId]
      }
    })
  }

  const handleSelectAll = () => {
    setForm(prev => ({
      ...prev,
      ticket_ids: order.tickets.map(t => t.id)
    }))
  }

  const handleUnselectAll = () => {
    setForm(prev => ({ ...prev, ticket_ids: [] }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')

    const token = localStorage.getItem('token')
    if (!token) {
      setSubmitError('No se encontró token de autenticación')
      setIsSubmitting(false)
      return
    }

    const payload = {
      recipient_email: form.recipient_email,
      recipient_name: form.recipient_name,
      recipient_lastname: form.recipient_lastname,
      ticket_ids: form.ticket_ids,
      origin_order_id: order.id,
      event_id: order.event.id,
      ...(form.message?.trim() && { message: form.message })
    }

    try {
      const response = await fetch(`${API_URL}/transfers`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token')
          navigate('/login')
          return
        }

        const errorData = await response.json().catch(() => ({}))
        throw new Error(
          errorData.message ||
            `Error ${response.status}: ${response.statusText}`
        )
      }

      const result = await response.json()

      navigate(`/user/order/${orderNumber}/transfer/success`, {
        replace: true,
        state: {
          transfer: result
        }
      })
    } catch (err) {
      console.error(err)
      setSubmitError(err.message || 'Error al procesar la transferencia')
    } finally {
      setIsSubmitting(false)
    }
  }

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

  const selectedTickets =
    order.tickets?.filter(t => form.ticket_ids.includes(t.id)) || []
  const isFormValid =
    form.recipient_email.trim() &&
    form.recipient_name.trim() &&
    form.recipient_lastname.trim() &&
    form.ticket_ids.length > 0

  return (
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
                      Transferencia de Boletos
                    </span>
                  </li>
                </ol>
              </nav>
              {/* Event info header */}
              <div className='sc-t48uod-0 kMfWDd'>
                <div className='sc-t48uod-1 dFONlU'>
                  <img
                    src={order?.event?.poster || '/placeholder.svg'}
                    alt='Poster del evento'
                    className='sc-t48uod-3 ddIAlU'
                  />
                </div>
                <div className='sc-t48uod-2 cSmcrp'>
                  <div className='sc-1xcba17-1 kQBTiV'>
                    <span aria-hidden='true'>
                      <div aria-hidden='true' className='sc-1eisn46-0 hPSPJL'>
                        <span className='sc-1eisn46-1 chthMZ'>
                          {order?.event?.formattedDate?.month || 'ENE'}
                        </span>
                        <span className='sc-1eisn46-2 iRCDqS'>
                          {order?.event?.formattedDate?.day || '01'}
                        </span>
                      </div>
                    </span>
                    <div className='sc-1xcba17-2 buEEof'>
                      <div className='sc-1xcba17-3 iYOCcf'>
                        <span aria-hidden='true'>
                          <div aria-hidden='true' className='sc-hkg1cn-0'>
                            <span className='sc-hkg1cn-1 khlcWQ'>
                              {order?.event?.formattedDate?.shortDate ||
                                order?.event?.info ||
                                'Información del evento'}
                            </span>
                          </div>
                        </span>
                      </div>
                      <div>
                        <h1 className='sc-1xcba17-4 inPRYG'>
                          {order?.event?.event ||
                            order?.event?.name ||
                            'Nombre del evento'}
                        </h1>
                        <p className='sc-1xcba17-5 PvcYX'>
                          {order?.event?.venue || 'Venue del evento'}
                        </p>
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
          onSubmit={handleSubmit}
        >
          <div className='sc-1nmwc0i-0 lkTCwg'>
            <a
              className='sc-jfe99z-1 cKVhWb sc-1nmwc0i-6 gxwRVh'
              href='#'
              onClick={e => {
                e.preventDefault()
                navigate(`/user/order/${orderNumber}/view`)
              }}
            >
              <svg
                viewBox='0 0 24 24'
                width='1.5em'
                height='1.5em'
                rotate={90}
                aria-hidden='true'
                focusable='false'
                className='BaseSvg-sc-yh8lnd-0 ChevronIcon___StyledBaseSvg-sc-1y4em6t-0 ggZsDW'
              >
                <path d='M3.47 8.26 4.53 7.2 12 14.67l7.47-7.47 1.06 1.06L12 16.8z' />
              </svg>
              Volver
              <span className='VisuallyHidden-sc-8buqks-0 lmhoCy'>
                hacia Mis boletos
              </span>
            </a>
            <h1 className='SectionHeading-sc-afo3kg-0 brztXD'>
              Transferencia de Boletos
            </h1>
            <p className='sc-1nmwc0i-2 iXiYSo'>
              Envía los boletos a tus acompañantes. Es rápido y gratis.{' '}
              <a
                href='https://help.ticketmaster.com.mx/hc/en-us/articles/12466606149777'
                target='_blank'
                rel='noopener noreferrer'
                className='Link__StyledLink-sc-pudy0l-0 coVzbUbb'
              >
                Ver Preguntas Frecuentes
                <span className='VisuallyHidden-sc-8buqks-0 lmhoCy'>
                  (Abre una nueva pestaña)
                </span>
              </a>
            </p>
          </div>

          {/* Error de envío */}
          {submitError && (
            <div
              className='error-message'
              style={{
                backgroundColor: '#fee',
                border: '1px solid #fcc',
                color: '#c33',
                padding: '12px',
                borderRadius: '4px',
                margin: '16px 0'
              }}
            >
              <strong>Error:</strong> {submitError}
            </div>
          )}

          <div className='sc-1nmwc0i-3 hLArtP'>
            <div className='titulo_boton'></div>
            <div className='indexstyles__Card-sc-cvxwg8-0 dHWtvF'>
              <fieldset
                aria-describedby=':r7: '
                className='sc-13nq4pk-7 gyZYgo'
              >
                <legend
                  id=':r7:'
                  className='indexstyles__Title-sc-cvxwg8-1 sc-13nq4pk-1 cSqFpp bpoFTf'
                >
                  Selecciona los boletos a transferir
                </legend>
                <div className='sc-13nq4pk-0 bdRfKv'>
                  <div className='sc-xfnp0f-1 erodjV'>
                    <button
                      onClick={handleSelectAll}
                      className='indexstyles__StyledButton-sc-83qv1q-0 bufHrA sc-xfnp0f-2 gmxpNW'
                      type='button'
                    >
                      <span className='indexstyles__FlexWrapper-sc-83qv1q-1 kCQEIv'>
                        <span className='indexstyles__Text-sc-83qv1q-2 jHTUWf'>
                          Seleccionar todo
                        </span>
                      </span>
                    </button>
                    <button
                      onClick={handleUnselectAll}
                      className='indexstyles__StyledButton-sc-83qv1q-0 bufHrA sc-xfnp0f-2 gmxpNW'
                      type='button'
                    >
                      <span className='indexstyles__FlexWrapper-sc-83qv1q-1 kCQEIv'>
                        <span className='indexstyles__Text-sc-83qv1q-2 jHTUWf'>
                          Anular la selección de todo
                        </span>
                      </span>
                    </button>
                  </div>
                </div>
                <div className='indexstyles__Body-sc-cvxwg8-2 sc-13nq4pk-2 eguRCZ fXJrRM'>
                  <ul id='ticket-container' className='sc-13nq4pk-3 iFkabA'>
                    {order.tickets?.map((ticket, index) =>
                      ticket.section === 'PISTA' ||
                      ticket.section === 'GRAL' ? (
                        // Plantilla para boletos de PISTA o GRAL-B
                        <li
                          className='sc-13nq4pk-4 evveoI'
                          key={ticket.id || index}
                        >
                          <div
                            id=':r5:-0x04000038'
                            className='indexstyles__InputField-sc-ruvmzp-0 gANCYS sc-13nq4pk-5 kGCbko'
                          >
                            <label
                              className='indexstyles__Label-sc-ruvmzp-1 kisObN Checkbox__Label-sc-14qdpwd-0 goXrLL'
                              htmlFor={`:r5:-${ticket.id}-input`}
                            >
                              <div
                                title=''
                                className='boton_mostrar style-qJXy7'
                                id='style-qJXy7'
                              >
                                <div className='Checkbox__CheckboxWrapper-sc-14qdpwd-2 bVujKI'>
                                  <input
                                    type='checkbox'
                                    value={ticket.id}
                                    data-secc={ticket.section}
                                    data-row={ticket.row}
                                    data-info={ticket.info}
                                    checked={form.ticket_ids.includes(
                                      ticket.id
                                    )}
                                    onChange={() =>
                                      handleTicketChange(ticket.id)
                                    }
                                    aria-invalid='false'
                                    id={`:r5:-${ticket.id}-input`}
                                    aria-describedby=':r5:-0x04000038-error'
                                    className='indexstyles__HiddenCheckbox-sc-ruvmzp-11 heuTWq'
                                  />
                                  <span className='indexstyles__CustomCheckbox-sc-ruvmzp-8 jnaavD'>
                                    <svg
                                      className='BaseSvg-sc-yh8lnd-0 CheckmarkIcon___StyledBaseSvg-sc-k5ogp5-0 ckLyyv indexstyles__Checkmark-sc-ruvmzp-9 etfdsX'
                                      viewBox='0 0 24 24'
                                      width='73%'
                                      height='73%'
                                      aria-hidden='true'
                                      focusable='false'
                                    >
                                      <path d='M23 3.2 7 22l-6-5.94 1.41-1.32 4.46 4.42L21.47 2z' />
                                    </svg>
                                  </span>
                                </div>
                              </div>
                              <span className='Checkbox__LabelText-sc-14qdpwd-1 rvQiF'>
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
                                          Boleto normal
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
                              </span>
                            </label>
                          </div>
                        </li>
                      ) : (
                        // Plantilla para boletos normales
                        <li
                          className='sc-13nq4pk-4 evveoI'
                          key={ticket.id || index}
                        >
                          <div
                            id=':r5:-0x04000038'
                            className='indexstyles__InputField-sc-ruvmzp-0 gANCYS sc-13nq4pk-5 kGCbko'
                          >
                            <label
                              className='indexstyles__Label-sc-ruvmzp-1 kisObN Checkbox__Label-sc-14qdpwd-0 goXrLL'
                              htmlFor={`:r5:-${ticket.id}-input`}
                            >
                              <div
                                title=''
                                className='boton_mostrar style-qJXy7'
                                id='style-qJXy7'
                              >
                                <div className='Checkbox__CheckboxWrapper-sc-14qdpwd-2 bVujKI'>
                                  <input
                                    type='checkbox'
                                    value={ticket.id}
                                    data-secc={ticket.section}
                                    data-row={ticket.row}
                                    data-info={ticket.info}
                                    data-seat={ticket.seat}
                                    checked={form.ticket_ids.includes(
                                      ticket.id
                                    )}
                                    onChange={() =>
                                      handleTicketChange(ticket.id)
                                    }
                                    aria-invalid='false'
                                    id={`:r5:-${ticket.id}-input`}
                                    aria-describedby=':r5:-0x04000038-error'
                                    className='indexstyles__HiddenCheckbox-sc-ruvmzp-11 heuTWq'
                                  />
                                  <span className='indexstyles__CustomCheckbox-sc-ruvmzp-8 jnaavD'>
                                    <svg
                                      className='BaseSvg-sc-yh8lnd-0 CheckmarkIcon___StyledBaseSvg-sc-k5ogp5-0 ckLyyv indexstyles__Checkmark-sc-ruvmzp-9 etfdsX'
                                      viewBox='0 0 24 24'
                                      width='73%'
                                      height='73%'
                                      aria-hidden='true'
                                      focusable='false'
                                    >
                                      <path d='M23 3.2 7 22l-6-5.94 1.41-1.32 4.46 4.42L21.47 2z' />
                                    </svg>
                                  </span>
                                </div>
                              </div>
                              <span className='Checkbox__LabelText-sc-14qdpwd-1 rvQiF'>
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
                                    <div className=' bHIhNV snipcss-W5hsS'>
                                      <>
                                        <div className='TicketInfoHeader__HeaderContainer-sc-101wb79-0 ctixpn'>
                                          <h2
                                            translate='no'
                                            className='TicketInfoHeader__HeaderTitle-sc-101wb79-1 sbbQd'
                                          >
                                            {ticket.type || 'Boleto Normal'}
                                          </h2>
                                        </div>
                                        <div className='TicketTopSection__SeatInfoWrapper-sc-11bz39i-1 ficefJ'>
                                          <dl className='SeatInfov2__RowList-sc-hzxzxj-0 gSZkIA'>
                                            <div className='SeatInfov2__RowItem-sc-hzxzxj-1 ftTdK'>
                                              <dt className='SeatInfov2__LocationLabel-sc-hzxzxj-2 cspToe'>
                                                Sección
                                              </dt>
                                              <dd
                                                translate='no'
                                                className='SeatInfov2__LocationDescription-sc-hzxzxj-3 jhAkDi'
                                              >
                                                {ticket.section}
                                              </dd>
                                            </div>
                                            <div className='SeatInfov2__RowItem-sc-hzxzxj-1 jPmdZv'>
                                              <dt className='SeatInfov2__LocationLabel-sc-hzxzxj-2 cspToe'>
                                                Fila
                                              </dt>
                                              <dd
                                                translate='no'
                                                className='SeatInfov2__LocationDescription-sc-hzxzxj-3 jfLFFl'
                                              >
                                                {ticket.row}
                                              </dd>
                                            </div>
                                            <div className='SeatInfov2__RowItem-sc-hzxzxj-1 dkuubl'>
                                              <dt className='SeatInfov2__LocationLabel-sc-hzxzxj-2 cspToe'>
                                                Asiento(s)
                                              </dt>
                                              <dd
                                                translate='no'
                                                className='SeatInfov2__LocationDescription-sc-hzxzxj-3 lNGlh'
                                              >
                                                {ticket.seat}
                                              </dd>
                                            </div>
                                          </dl>
                                        </div>
                                      </>
                                    </div>
                                  </div>
                                </div>
                              </span>
                            </label>
                          </div>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </fieldset>
            </div>

            <div className='indexstyles__Card-sc-cvxwg8-0 dHWtvF'>
              <fieldset aria-describedby=':r3:' className='sc-xfnp0f-6 fOVpZp'>
                <legend
                  id=':r3:'
                  className='indexstyles__Title-sc-cvxwg8-1 sc-xfnp0f-7 cSqFpp gEYbj'
                >
                  Ingresa los datos del receptor
                </legend>
                <div className='indexstyles__Body-sc-cvxwg8-2 eguRCZ'>
                  <div className='Stack-sc-br1alc-0 deKrdu'>
                    <div
                      id='RecipientDetailsFormFirstName'
                      className='indexstyles__InputField-sc-ruvmzp-0 gANCYS'
                    >
                      <label
                        htmlFor='RecipientDetailsFormFirstName-input'
                        className='indexstyles__Label-sc-ruvmzp-1 kisObN'
                      >
                        Nombre <span style={{ color: 'red' }}>*</span>
                      </label>
                      <div className='indexstyles__Row-sc-ruvmzp-2 xKMYf'>
                        <input
                          aria-invalid='false'
                          placeholder='Introduce el nombre'
                          name='recipient_name'
                          value={form.recipient_name}
                          onChange={handleChange}
                          required
                          id='RecipientDetailsFormFirstName-input'
                          aria-describedby='RecipientDetailsFormFirstName-error RecipientDetailsFormFirstName-success'
                          className='indexstyles__Input-sc-ruvmzp-6 fUTXqV'
                        />
                      </div>
                    </div>
                    <div
                      id='RecipientDetailsFormLastName'
                      className='indexstyles__InputField-sc-ruvmzp-0 gANCYS'
                    >
                      <label
                        htmlFor='RecipientDetailsFormLastName-input'
                        className='indexstyles__Label-sc-ruvmzp-1 kisObN'
                      >
                        Apellido <span style={{ color: 'red' }}>*</span>
                      </label>
                      <div className='indexstyles__Row-sc-ruvmzp-2 xKMYf'>
                        <input
                          aria-invalid='false'
                          type='text'
                          placeholder='Introduce el apellido'
                          name='recipient_lastname'
                          value={form.recipient_lastname}
                          onChange={handleChange}
                          required
                          id='RecipientDetailsFormLastName-input'
                          aria-describedby='RecipientDetailsFormLastName-error RecipientDetailsFormLastName-success'
                          className='indexstyles__Input-sc-ruvmzp-6 fUTXqV'
                        />
                      </div>
                    </div>
                    <div
                      id='RecipientDetailsFormEmail'
                      className='indexstyles__InputField-sc-ruvmzp-0 gANCYS'
                    >
                      <label
                        htmlFor='RecipientDetailsFormEmail-input'
                        className='indexstyles__Label-sc-ruvmzp-1 kisObN'
                      >
                        Correo electrónico{' '}
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                      <div className='indexstyles__Row-sc-ruvmzp-2 xKMYf'>
                        <input
                          aria-invalid='false'
                          type='email'
                          placeholder='ejemplo@correo.com'
                          name='recipient_email'
                          value={form.recipient_email}
                          onChange={handleChange}
                          required
                          id='RecipientDetailsFormEmail-input'
                          aria-describedby='RecipientDetailsFormEmail-error RecipientDetailsFormEmail-success'
                          className='indexstyles__Input-sc-ruvmzp-6 fUTXqV'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>

            <div className='indexstyles__Card-sc-cvxwg8-0 sc-xfnp0f-4 dHWtvF iRiGkP'>
              <fieldset aria-describedby=':r4:' className='sc-xfnp0f-6 fOVpZp'>
                <legend
                  id=':r4:'
                  className='indexstyles__Title-sc-cvxwg8-1 cSqFpp'
                >
                  Agregar un mensaje
                  <span className='sc-xfnp0f-5 iDPUCS'>(Opcional)</span>
                </legend>
                <div className='indexstyles__Body-sc-cvxwg8-2 eguRCZ'>
                  <div>
                    <div
                      id='RecipientDetailsFormMessage'
                      className='indexstyles__InputField-sc-ruvmzp-0 gANCYS'
                    >
                      <label
                        htmlFor='RecipientDetailsFormMessage-input'
                        className='indexstyles__Label-sc-ruvmzp-1 kisObN'
                      >
                        <span className='VisuallyHidden-sc-8buqks-0 lmhoCy'>
                          Agregar un mensaje{' '}
                          <span className='sc-16sdm0x-0 bODCUU'>
                            (Opcional)
                          </span>
                        </span>
                      </label>
                      <div className='indexstyles__Row-sc-ruvmzp-2 xKMYf'>
                        <textarea
                          aria-invalid='false'
                          placeholder='Disfruta el espectáculo...'
                          name='message'
                          value={form.message}
                          onChange={handleChange}
                          rows={3}
                          maxLength={140}
                          id='RecipientDetailsFormMessage-input'
                          aria-describedby='RecipientDetailsFormMessage-error RecipientDetailsFormMessage-success characterCount'
                          className='indexstyles__Textarea-sc-ruvmzp-7 hCwmse'
                        />
                      </div>
                    </div>
                    <div id='characterCount' aria-live='polite'>
                      <div
                        color='text.secondary'
                        className='indexstyles__CharacterCounter-sc-1lq2izf-0 kcFmrl'
                      >
                        Caracteres restantes: {140 - form.message.length}
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
            <div className='indexstyles__Card-sc-cvxwg8-0 cfGQrC'>
              <h2 className='indexstyles__Title-sc-cvxwg8-1 cSqFpp'>
                Términos y condiciones
              </h2>
              <div className='indexstyles__Body-sc-cvxwg8-2 eguRCZ'>
                <p className='sc-edee8974-6 hIsgUF'>transfer</p>
              </div>
            </div>
          </div>

          <div className='sc-1nmwc0i-4 Imfyo'>
            <div className='indexstyles__Card-sc-cvxwg8-0 dHWtvF'>
              <div>
                <header
                  role='status'
                  aria-live='polite'
                  className='sc-5kfm3z-0 eiGHUP'
                >
                  <h2 className='sc-5kfm3z-1 btYCvk'>
                    Los boletos se están enviando
                  </h2>
                  <span className='sc-5kfm3z-2 eqXODz' />
                </header>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  {selectedTickets.length === 0 ? (
                    <li className='text-center py-4 text-gray-500'>
                      Selecciona boletos para transferir
                    </li>
                  ) : (
                    selectedTickets.map((ticket, index) => (
                      <li
                        key={ticket.id || index}
                        className='sc-5kfm3z-4 fPBYfi'
                      >
                        <div className='sc-5kfm3z-5 dSaZMc'>
                          <svg
                            viewBox='0 0 24 24'
                            width='1.5em'
                            height='1.5em'
                            aria-hidden='true'
                            focusable='false'
                            className='BaseSvg-sc-yh8lnd-0 TicketIcon___StyledBaseSvg-sc-qlvy2z-0 ckLyyv'
                          >
                            <path d='M3.25 1h17.5v18.95L17.95 23H3.24zm1.5 1.5v19h12.54l1.96-2.13V2.5zM16 16.75H6v-1.5h10zm-10 3h7.5v-1.5H6zm0-12.5h12v6.5H6zm1.5 1.5v3.5h9v-3.5zm1.5 2.5h6v-1.5H9z' />
                          </svg>
                        </div>
                        <span className='sc-5kfm3z-6 fsmqmg'>
                          {ticket.info ||
                            `${ticket.section} - Fila ${ticket.row} - Asiento ${ticket.seat}`}
                        </span>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </div>

          <div className='sc-1nmwc0i-5 sc-xfnp0f-3 TivJP ihfeZX'>
            <button
              type='submit'
              className='indexstyles__StyledButton-sc-83qv1q-0 htmPxx'
              disabled={!isFormValid || isSubmitting}
              style={{
                opacity: !isFormValid || isSubmitting ? 0.6 : 1,
                cursor: !isFormValid || isSubmitting ? 'not-allowed' : 'pointer'
              }}
            >
              {isSubmitting ? 'Enviando...' : 'Confirmar transferencia'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../css/TransferirBoletos.css'
import { AccordionLat } from '../components/NavBar'
import { authenticatedRequest, getUser, getOrder } from '../api/index'
import '../css/Loading.css'
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
    <form
      noValidate=''
      className=' jSbLRX'
      style={{}}
    >
      <div className='sc-3bfb48cf-1 gmGnJW' style={{}}>
        <a
          className='sc-5ff3f33f-1 jVrMWe indexstyles__StyledButton-sc-83qv1q-0 qRDmu'
          href='/user/order/iDYQdeHube14_zGuovmkrHn1d0lZUQsCpfmVwg%3D%3D/1400642CF26E8951/view'
          style={{}}
        >
          <span className='indexstyles__FlexWrapper-sc-83qv1q-1 hJuAcy'>
            <svg
              viewBox='0 0 24 24'
              width='1.5em'
              height='1.5em'
              rotate={90}
              aria-hidden='true'
              focusable='false'
              className='BaseSvg-sc-yh8lnd-0 ChevronIcon___StyledBaseSvg-sc-1y4em6t-0 ggZsDW'
            >
              <path
                d='M3.47 8.26 4.53 7.2 12 14.67l7.47-7.47 1.06 1.06L12 16.8z'
                className=''
              />
            </svg>
            <span className='' style={{}}>
              Volver
              <span className='VisuallyHidden-sc-8buqks-0 lmhoCy'>
                hacia Mis boletos
              </span>
            </span>
          </span>
        </a>
        <h1 className='sc-3bfb48cf-0 jdKeNe' style={{}}>
          Transferir Boletos
        </h1>
        <p className='sc-3bfb48cf-3 dpJAji' style={{}}>
          Envía los boletos a las personas con las que asistirás al evento. Es
          rápido y completamente gratis.{' '}
          <a
            href='https://help.ticketmaster.com.mx/hc/en-us/articles/12466606149777'
            target='_blank'
            rel='noopener noreferrer'
            className='Link__StyledLink-sc-pudy0l-0 coVzbU'
            style={{}}
          >
            Ver Preguntas Frecuentes.
            <span className='VisuallyHidden-sc-8buqks-0 sc-9ee55a92-0 lmhoCy bScnHS'>
              (Abre una nueva pestaña)
            </span>
          </a>
        </p>
      </div>
      <div className='sc-3bfb48cf-4 jukxf' style={{}}>
        <div className='indexstyles__Card-sc-cvxwg8-0 cfGQrC' style={{}}>
          <fieldset
            aria-describedby=':rb:-legend '
            className='sc-a31fc2a4-3 hHxrCj'
          >
            <div className='sc-a31fc2a4-4 gknBof'>
              <legend
                id=':rb:-legend'
                className='indexstyles__Title-sc-cvxwg8-1 sc-a31fc2a4-5 cSqFpp jVyGlR'
              >
                Selecciona los boletos a transferir
              </legend>
              <div className='sc-a31fc2a4-7 fMftFT'>
                <button
                  type='button'
                  onClick={handleSelectAll}
                  className='indexstyles__StyledButton-sc-83qv1q-0 jRkCKq'
                >
                  <span className='indexstyles__FlexWrapper-sc-83qv1q-1 hJuAcy'>
                    <span className=''>Seleccionar todo</span>
                  </span>
                </button>
                <button
                  onClick={handleUnselectAll}
                  type='button'
                  className='indexstyles__StyledButton-sc-83qv1q-0 jRkCKq'
                >
                  <span className='indexstyles__FlexWrapper-sc-83qv1q-1 hJuAcy'>
                    <span className=''>Anular la selección de todo</span>
                  </span>
                </button>
              </div>
            </div>
            <div className='indexstyles__Body-sc-cvxwg8-2 sc-a31fc2a4-6 eguRCZ jSCLlh'>
                 <ul className='sc-a31fc2a4-8 cgXnmw'>
      {order.tickets?.map((ticket, index) =>
        ticket.section === 'PISTA' || ticket.section === 'GRAL' ? (
          // Plantilla para boletos de PISTA o GRAL-B
          <li className='sc-a31fc2a4-9 ftSRQm' key={ticket.id || index}>
            <div
              id=':rb:-checkboxes-${}'
              className='indexstyles__InputField-sc-ruvmzp-0 kMaRcL'
            >
              <label
                className='indexstyles__Label-sc-ruvmzp-1 cxfaUf sc-a31fc2a4-2 jCGzTY'
                htmlFor={`:r5:-${ticket.id}-input`}
              >
                <input
                  type='checkbox'
                  value={ticket.id}
                  data-secc={ticket.section}
                  data-row={ticket.row}
                  data-info={ticket.info}
                  checked={form.ticket_ids.includes(ticket.id)}
                  onChange={() => handleTicketChange(ticket.id)}
                  aria-invalid='false'
                  id={`:r5:-${ticket.id}-input`}
                  aria-describedby=':r5:-checkboxes-0x20060061~1400642CF26E8951~sold-error'
                  className='indexstyles__HiddenCheckbox-sc-ruvmzp-11 jGpkDd'
                />
                <span className='indexstyles__CustomCheckbox-sc-ruvmzp-8 jnGTME'>
                  <svg
                    className='BaseSvg-sc-yh8lnd-0 CheckmarkIcon___StyledBaseSvg-sc-k5ogp5-0 ckLyyv indexstyles__Checkmark-sc-ruvmzp-9 etfdsX'
                    viewBox='0 0 24 24'
                    width='73%'
                    height='73%'
                    aria-hidden='true'
                    focusable='false'
                  >
                    <path
                      d='M23 3.2 7 22l-6-5.94 1.41-1.32 4.46 4.42L21.47 2z'
                      className=''
                    />
                  </svg>
                  <svg
                    className='BaseSvg-sc-yh8lnd-0 MinusIcon___StyledBaseSvg-sc-1btgke4-0 ckLyyv indexstyles__IndeterminateMark-sc-ruvmzp-10 byeMCy'
                    viewBox='0 0 24 24'
                    width='73%'
                    height='73%'
                    aria-hidden='true'
                    focusable='false'
                  >
                    <path d='M1 11.25h22v1.5H1z' className='' />
                  </svg>
                </span>
                <div className='sc-a31fc2a4-0 fqcEuv'>
                  <div className='TicketCardv2__Card-sc-1akc5v-0 iUWdPG'>
                    <div className='TicketCardv2__TicketHeaderBorderContainer-sc-1akc5v-2 kXCNEZ' />
                    <div className='TicketCardv2__ChildrenWrapper-sc-1akc5v-1 cWeWMl'>
                      <div className='sc-7989aef4-1'>
                        <div className='TicketTopSection__TopSectionWrapper-sc-11bz39i-0 kAoiSe'>
                          <div className='TicketInfoHeader__HeaderContainer-sc-101wb79-0 ctixpn'>
                            <h3
                              translate='no'
                              className='TicketInfoHeader__HeaderTitle-sc-101wb79-1 sbbQd'
                            >
                              Boleto normal
                            </h3>
                          </div>
                          <div className='TicketTopSectionGeneric__MainTextWrapper-sc-1sfa0cb-0 cDtTZX'>
                            <p className='TicketTopSectionGeneric__BodyText-sc-1sfa0cb-1 eQWkMw'>
                              Entrada general / Ref:
                            </p>
                            <p
                              translate='no'
                              className='TicketTopSectionGeneric__Reference-sc-1sfa0cb-2 iBOGvu'
                            >
                              Entrada General / Ref: GRAL-C-G46-433
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </label>
            </div>
          </li>
        ) : (
          <li className='sc-a31fc2a4-9 ftSRQm' key={ticket.id || index}>
            <div
              id=':r20:-checkboxes-0x00000083~14006373AA8EB26E~sold'
              className='indexstyles__InputField-sc-ruvmzp-0 kMaRcL'
            >
              <label
                htmlFor={`:r5:-${ticket.id}-input`}
                className='indexstyles__Label-sc-ruvmzp-1 cxfaUf sc-a31fc2a4-2 jCGzTY'
              >
                <input
                  type='checkbox'
                  value={ticket.id}
                  data-secc={ticket.section}
                  data-row={ticket.row}
                  data-info={ticket.info}
                  data-seat={ticket.seat}
                  checked={form.ticket_ids.includes(ticket.id)}
                  onChange={() => handleTicketChange(ticket.id)}
                  aria-invalid='false'
                  id={`:r5:-${ticket.id}-input`}
                  aria-describedby=':r20:-checkboxes-0x00000083~14006373AA8EB26E~sold-error'
                  className='indexstyles__HiddenCheckbox-sc-ruvmzp-11 jGpkDd'
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
                <div className='sc-a31fc2a4-0 fqcEuv'>
                  <div className='TicketCardv2__Card-sc-1akc5v-0 iUWdPG'>
                    <div className='TicketCardv2__TicketHeaderBorderContainer-sc-1akc5v-2 kXCNEZ' />
                    <div className='TicketCardv2__ChildrenWrapper-sc-1akc5v-1 cWeWMl'>
                      <div className='sc-7989aef4-1'>
                        <div className='TicketTopSection__TopSectionWrapper-sc-11bz39i-0 kAoiSe'>
                          <div className='TicketInfoHeader__HeaderContainer-sc-101wb79-0 ctixpn'>
                            <h3
                              translate='no'
                              className='TicketInfoHeader__HeaderTitle-sc-101wb79-1 sbbQd'
                            >
                              {ticket.type ?? 'Boleto normal'} ??{' '}
                            </h3>
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
                                  {ticket.section}{' '}
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </label>
            </div>
          </li>
        )
      )}
    </ul>
            </div>
          </fieldset>
        </div>
        <div className='indexstyles__Card-sc-cvxwg8-0 cfGQrC'>
          <fieldset className='sc-39e3a99a-0 eBRMFR'>
            <legend className='indexstyles__Title-sc-cvxwg8-1 sc-39e3a99a-1 cSqFpp kkeLIz'>
              Transfer Via
            </legend>
            <div className='indexstyles__Body-sc-cvxwg8-2 sc-39e3a99a-2 eguRCZ crLXEI'>
              <div
                id=':rc:-email'
                className='indexstyles__InputField-sc-ruvmzp-0 kMaRcL'
              >
                <label
                  className='indexstyles__Label-sc-ruvmzp-1 cxfaUf sc-39e3a99a-5 dYxIoI'
                  htmlFor=':rc:-email-input'
                >
                  <input
                    type='radio'
                    name='deliveryMethod'
                    aria-describedby=':rc:-email-error'
                    required=''
                    id=':rc:-email-input'
                    className='indexstyles__HiddenRadio-sc-ruvmzp-13 jxHVkc'
                    defaultValue='email'
                  />
                  <span className='indexstyles__CustomRadio-sc-ruvmzp-12 hIzPnG' />
                  <span className='sc-39e3a99a-6 epbtow'>
                    <svg
                      viewBox='0 0 24 24'
                      width='1.5em'
                      height='1.5em'
                      aria-hidden='true'
                      focusable='false'
                      className='BaseSvg-sc-yh8lnd-0 EnvelopeClosedIcon___StyledBaseSvg-sc-1uqjuak-0 ckLyyv'
                    >
                      <path
                        d='M1 20.51h22v-17H1zM21.5 5.96V17l-6.17-5.6zm-7.31 6.44 6.87 6.24-9.07.15-9.03-.15 6.87-6.24L12 14.32zm-5.49-.99-6.2 5.63V5.93zm11.59-6.39-8.28 7.3-8.27-7.3z'
                        className=''
                      />
                    </svg>
                    Email Address
                  </span>
                </label>
              </div>
              <div className='sc-39e3a99a-7 iDTdHD'>
                <div className='Stack-sc-br1alc-0 bcKaUz'>
                  <div
                    id='RecipientDetailsFormFirstName'
                    className='indexstyles__InputField-sc-ruvmzp-0 kMaRcL'
                  >
                    <label
                      htmlFor='RecipientDetailsFormFirstName-input'
                      className='indexstyles__Label-sc-ruvmzp-1 cxfaUf'
                    >
                      Nombre{' '}
                    </label>
                    <div className='indexstyles__Row-sc-ruvmzp-2 coECkF'>
                      <input
                        aria-invalid='false'
                        placeholder='Ingresar nombre'
                        autoComplete='off'
                        name='recipientFirstName'
                        required=''
                        id='RecipientDetailsFormFirstName-input'
                        aria-describedby='RecipientDetailsFormFirstName-error RecipientDetailsFormFirstName-success'
                        className='indexstyles__Input-sc-ruvmzp-6 dlfnWm'
                      />
                    </div>
                    <div
                      id='RecipientDetailsFormFirstName-success'
                      className='indexstyles__Validation-sc-ruvmzp-15 kNxCsC'
                    />
                  </div>
                  <div
                    id='RecipientDetailsFormLastName'
                    className='indexstyles__InputField-sc-ruvmzp-0 kMaRcL'
                  >
                    <label
                      htmlFor='RecipientDetailsFormLastName-input'
                      className='indexstyles__Label-sc-ruvmzp-1 cxfaUf'
                    >
                      Apellido{' '}
                    </label>
                    <div className='indexstyles__Row-sc-ruvmzp-2 coECkF'>
                      <input
                        aria-invalid='false'
                        type='text'
                        placeholder='Ingresa apellido'
                        autoComplete='off'
                        name='recipientLastName'
                        required=''
                        id='RecipientDetailsFormLastName-input'
                        aria-describedby='RecipientDetailsFormLastName-error RecipientDetailsFormLastName-success'
                        className='indexstyles__Input-sc-ruvmzp-6 dlfnWm'
                      />
                    </div>
                    <div
                      id='RecipientDetailsFormLastName-success'
                      className='indexstyles__Validation-sc-ruvmzp-15 kNxCsC'
                    />
                  </div>
                  <div
                    id='RecipientDetailsFormEmail'
                    className='indexstyles__InputField-sc-ruvmzp-0 kMaRcL'
                  >
                    <label
                      htmlFor='RecipientDetailsFormEmail-input'
                      className='indexstyles__Label-sc-ruvmzp-1 cxfaUf'
                    >
                      Email Address{' '}
                    </label>
                    <div className='indexstyles__Row-sc-ruvmzp-2 coECkF'>
                      <input
                        aria-invalid='false'
                        type='email'
                        placeholder='Ingresa el correo electrónico'
                        autoComplete='off'
                        name='recipientEmailAddress'
                        required=''
                        id='RecipientDetailsFormEmail-input'
                        aria-describedby='RecipientDetailsFormEmail-error RecipientDetailsFormEmail-success'
                        className='indexstyles__Input-sc-ruvmzp-6 dlfnWm'
                      />
                    </div>
                    <div
                      id='RecipientDetailsFormEmail-success'
                      className='indexstyles__Validation-sc-ruvmzp-15 kNxCsC'
                    />
                  </div>
                  <div className=''>
                    <div
                      id='RecipientDetailsFormMessage'
                      className='indexstyles__InputField-sc-ruvmzp-0 kMaRcL'
                    >
                      <label
                        htmlFor='RecipientDetailsFormMessage-input'
                        className='indexstyles__Label-sc-ruvmzp-1 cxfaUf'
                      >
                        Agrega un mensaje{' '}
                        <span className='sc-ec210be5-0 bpYznG'>(Opcional)</span>
                      </label>
                      <div className='indexstyles__Row-sc-ruvmzp-2 coECkF'>
                        <textarea
                          aria-invalid='false'
                          placeholder='Disfruta el espectáculo...'
                          name='message'
                          aria-describedby='RecipientDetailsFormMessage-error RecipientDetailsFormMessage-success :rd:'
                          rows={3}
                          id='RecipientDetailsFormMessage-input'
                          className='indexstyles__Textarea-sc-ruvmzp-7 bfiORe'
                          defaultValue={''}
                        />
                      </div>
                      <div
                        id='RecipientDetailsFormMessage-error'
                        className='indexstyles__Validation-sc-ruvmzp-15 kNxCsC'
                      />
                    </div>
                    <div id=':rd:' aria-live='polite' className=''>
                      <div className='TextAreaLimited__CharacterCounter-sc-89126i-0 fMenar'>
                        Caracteres restantes: 140
                      </div>
                    </div>
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
            <p className='sc-7fd09d12-2 jBfXOB'>transfer</p>
          </div>
        </div>
      </div>
      <div className='sc-3bfb48cf-5 lndyNW'>
        <div className='indexstyles__Card-sc-cvxwg8-0 cfGQrC' style={{}}>
          <div className=''>
            <header
              role='status'
              aria-live='polite'
              className='sc-28d80590-0 cqUbyh'
            >
              <h2 className='sc-28d80590-1 cmlhed'>Boletos en Transferencia</h2>
              <span className='sc-28d80590-2 fhJJdp'>×0</span>
            </header>
            <div aria-hidden='true' className='sc-28d80590-8 fWdQac'>
              <span className=''>-</span>
              <span className=''>-</span>
            </div>
          </div>
        </div>
      </div>
      <div className='sc-3bfb48cf-6 sc-7fd09d12-1 hPgBev jrYNGM'>
        <button
          type='submit'
          className='indexstyles__StyledButton-sc-83qv1q-0 koySWx'
        >
          <span className='indexstyles__FlexWrapper-sc-83qv1q-1 hJuAcy'>
            <span className=''>Confirmar</span>
          </span>
        </button>
      </div>
    </form>
  )
}

export function Ul () {
  return (
              <ul className='sc-a31fc2a4-8 cgXnmw'>
      {order.tickets?.map((ticket, index) =>
        ticket.section === 'PISTA' || ticket.section === 'GRAL' ? (
          // Plantilla para boletos de PISTA o GRAL-B
          <li className='sc-a31fc2a4-9 ftSRQm' key={ticket.id || index}>
            <div
              id=':rb:-checkboxes-0x20060061~1400642CF26E8951~sold'
              className='indexstyles__InputField-sc-ruvmzp-0 kMaRcL'
            >
              <label
                className='indexstyles__Label-sc-ruvmzp-1 cxfaUf sc-a31fc2a4-2 jCGzTY'
                htmlFor={`:rb:-${ticket.id}-input`}
              >
                <input
                  type='checkbox'
                  value={ticket.id}
                  data-secc={ticket.section}
                  data-row={ticket.row}
                  data-info={ticket.info}
                  checked={form.ticket_ids.includes(ticket.id)}
                  onChange={() => handleTicketChange(ticket.id)}
                  aria-invalid='false'
                  id={`:rb:-${ticket.id}-input`}
                  aria-describedby=':rb:-checkboxes-0x20060061~1400642CF26E8951~sold-error'
                  className='indexstyles__HiddenCheckbox-sc-ruvmzp-11 jGpkDd'
                />
                <span className='indexstyles__CustomCheckbox-sc-ruvmzp-8 jnGTME'>
                  <svg
                    className='BaseSvg-sc-yh8lnd-0 CheckmarkIcon___StyledBaseSvg-sc-k5ogp5-0 ckLyyv indexstyles__Checkmark-sc-ruvmzp-9 etfdsX'
                    viewBox='0 0 24 24'
                    width='73%'
                    height='73%'
                    aria-hidden='true'
                    focusable='false'
                  >
                    <path
                      d='M23 3.2 7 22l-6-5.94 1.41-1.32 4.46 4.42L21.47 2z'
                      className=''
                    />
                  </svg>
                  <svg
                    className='BaseSvg-sc-yh8lnd-0 MinusIcon___StyledBaseSvg-sc-1btgke4-0 ckLyyv indexstyles__IndeterminateMark-sc-ruvmzp-10 byeMCy'
                    viewBox='0 0 24 24'
                    width='73%'
                    height='73%'
                    aria-hidden='true'
                    focusable='false'
                  >
                    <path d='M1 11.25h22v1.5H1z' className='' />
                  </svg>
                </span>
                <div className='sc-a31fc2a4-0 fqcEuv'>
                  <div className='TicketCardv2__Card-sc-1akc5v-0 iUWdPG'>
                    <div className='TicketCardv2__TicketHeaderBorderContainer-sc-1akc5v-2 kXCNEZ' />
                    <div className='TicketCardv2__ChildrenWrapper-sc-1akc5v-1 cWeWMl'>
                      <div className='sc-7989aef4-1'>
                        <div className='TicketTopSection__TopSectionWrapper-sc-11bz39i-0 kAoiSe'>
                          <div className='TicketInfoHeader__HeaderContainer-sc-101wb79-0 ctixpn'>
                            <h3
                              translate='no'
                              className='TicketInfoHeader__HeaderTitle-sc-101wb79-1 sbbQd'
                            >
                              Boleto normal
                            </h3>
                          </div>
                          <div className='TicketTopSectionGeneric__MainTextWrapper-sc-1sfa0cb-0 cDtTZX'>
                            <p className='TicketTopSectionGeneric__BodyText-sc-1sfa0cb-1 eQWkMw'>
                              Entrada general / Ref:
                            </p>
                            <p
                              translate='no'
                              className='TicketTopSectionGeneric__Reference-sc-1sfa0cb-2 iBOGvu'
                            >
                              Entrada General / Ref: GRAL-C-G46-433
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </label>
            </div>
          </li>
        ) : (
          <li className='sc-a31fc2a4-9 ftSRQm' key={ticket.id || index}>
            <div
              id=':r20:-checkboxes-0x00000083~14006373AA8EB26E~sold'
              className='indexstyles__InputField-sc-ruvmzp-0 kMaRcL'
            >
              <label
                htmlFor={`:r5:-${ticket.id}-input`}
                className='indexstyles__Label-sc-ruvmzp-1 cxfaUf sc-a31fc2a4-2 jCGzTY'
              >
                <input
                  type='checkbox'
                  value={ticket.id}
                  data-secc={ticket.section}
                  data-row={ticket.row}
                  data-info={ticket.info}
                  data-seat={ticket.seat}
                  checked={form.ticket_ids.includes(ticket.id)}
                  onChange={() => handleTicketChange(ticket.id)}
                  aria-invalid='false'
                  id={`:r20:-${ticket.id}-input`}
                  aria-describedby=':r20:-checkboxes-0x00000083~14006373AA8EB26E~sold-error'
                  className='indexstyles__HiddenCheckbox-sc-ruvmzp-11 jGpkDd'
                />
                <span className='indexstyles__CustomCheckbox-sc-ruvmzp-8 jnGTME'>
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
                  <svg
                    className='BaseSvg-sc-yh8lnd-0 MinusIcon___StyledBaseSvg-sc-1btgke4-0 ckLyyv indexstyles__IndeterminateMark-sc-ruvmzp-10 byeMCy'
                    viewBox='0 0 24 24'
                    width='73%'
                    height='73%'
                    aria-hidden='true'
                    focusable='false'
                  >
                    <path d='M1 11.25h22v1.5H1z' />
                  </svg>
                </span>
                <div className='sc-a31fc2a4-0 fqcEuv'>
                  <div className='TicketCardv2__Card-sc-1akc5v-0 iUWdPG'>
                    <div className='TicketCardv2__TicketHeaderBorderContainer-sc-1akc5v-2 kXCNEZ' />
                    <div className='TicketCardv2__ChildrenWrapper-sc-1akc5v-1 cWeWMl'>
                      <div className='sc-7989aef4-1'>
                        <div className='TicketTopSection__TopSectionWrapper-sc-11bz39i-0 kAoiSe'>
                          <div className='TicketInfoHeader__HeaderContainer-sc-101wb79-0 ctixpn'>
                            <h3
                              translate='no'
                              className='TicketInfoHeader__HeaderTitle-sc-101wb79-1 sbbQd'
                            >
                              {ticket.type ?? 'Boleto normal'} ??{' '}
                            </h3>
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
                                  {ticket.section}{' '}
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </label>
            </div>
          </li>
        )
      )}
    </ul>
  )
}

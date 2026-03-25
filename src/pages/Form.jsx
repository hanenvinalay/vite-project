import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../css/TransferirBoletos.css'
import './form.css'
import { AccordionLat } from '../components/NavBar'
import { authenticatedRequest, getUser, getOrder } from '../api/index'
import Modal from '../components/Modal'
import { API_URL } from '../api/index'

import { AsideModal } from '../components/Aside'
export default function NewTransferFormPage() {
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
            <AsideModal onConfirm={() => {}} />
            <div className='sc-12r1da7-1 beLWZo'>
                <div className='sc-12r1da7-2 ksJoti'>
                    <div className='sc-a655db-0 jxczVS sc-1lei1ts-1 qXwvy'>
                        <div
                            className='sc-a655db-1 gxhkGK'
                            style={{
                                backgroundImage: `url(${order?.event?.poster || '/placeholder.svg'
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
                                            Home
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
                                         My  Tickets
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
Transfer                                        </span>
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

            <div className="sc-c5823f72-10 jUtEHQ">
                <div className="sc-c5823f72-12 sc-955aefc2-0 euvicg">
                    <div id="mfa-wrapper" />
                    <form 
                              onSubmit={handleSubmit}
className="sc-3bfb48cf-2 sc-eae37d99-0 covozP kLzZRB">
                        <div className="sc-3bfb48cf-1 gmGnJW">
                            <a
              className='sc-jfe99z-1 cKVhWb sc-1nmwc0i-6 gxwRVh'
              href='#'
              onClick={e => {
                e.preventDefault()
                navigate(`app/user/order/${orderNumber}/view`)
              }}
            >
                                <span className="indexstyles__FlexWrapper-sc-83qv1q-1 hJuAcy">
                                    <svg
                                        viewBox="0 0 24 24"
                                        width="1.5em"
                                        height="1.5em"
                                        rotate={90}
                                        aria-hidden="true"
                                        focusable="false"
                                        className="BaseSvg-sc-yh8lnd-0 ChevronIcon___StyledBaseSvg-sc-1y4em6t-0 ggZsDW"
                                    >
                                        <path d="M3.47 8.26 4.53 7.2 12 14.67l7.47-7.47 1.06 1.06L12 16.8z" />
                                    </svg>
                                    <span>
                                        Back
                                        <span className="VisuallyHidden-sc-8buqks-0 lmhoCy">
                                            to My Tickets
                                        </span>
                                    </span>
                                </span>
                            </a>
                            <h1 className="sc-3bfb48cf-0 jdKeNe">Transfer Tickets</h1>
                            <p className="sc-3bfb48cf-3 dpJAji">
                                Send tickets to the people you will attend the event with. It's fast
                                and completely free.{" "}
                            </p>
                        </div>
                        <div className="sc-3bfb48cf-4 jukxf">
                            <div className="indexstyles__Card-sc-cvxwg8-0 cfGQrC">
                                <fieldset
                                    aria-describedby=":rd:-legend "
                                    className="sc-a31fc2a4-3 hHxrCj"
                                >
                                    <div className="sc-a31fc2a4-4 gknBof">
                                        <legend
                                            id=":rd:-legend"
                                            className="indexstyles__Title-sc-cvxwg8-1 sc-a31fc2a4-5 cSqFpp jVyGlR"
                                        >
                                            Select Tickets To Transfer
                                        </legend>
                                        <div className="sc-a31fc2a4-7 fMftFT">
                                            <button
                                                type="button"
                                                onClick={handleSelectAll}

                                                className="indexstyles__StyledButton-sc-83qv1q-0 jRkCKq"
                                            >
                                                <span className="indexstyles__FlexWrapper-sc-83qv1q-1 hJuAcy">
                                                    <span>Select All</span>
                                                </span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleUnselectAll}
                                                className="indexstyles__StyledButton-sc-83qv1q-0 jRkCKq"
                                            >
                                                <span className="indexstyles__FlexWrapper-sc-83qv1q-1 hJuAcy">
                                                    <span>Deselect All</span>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="indexstyles__Body-sc-cvxwg8-2 sc-a31fc2a4-6 eguRCZ jSCLlh">
                                        <ul className="sc-a31fc2a4-8 cgXnmw">



                                            {order.tickets?.map((ticket, index) =>

                                                <li
                                                    key={ticket.id || index}


                                                    className="sc-a31fc2a4-9 ftSRQm">
                                                    <div
                                                        id={`:r5:-${ticket.id}-checkbox`}
                                                        className="indexstyles__InputField-sc-ruvmzp-0 kMaRcL"
                                                    >
                                                        <label
                                                            htmlFor={`:r5:-${ticket.id}-input`}
                                                            className="indexstyles__Label-sc-ruvmzp-1 cxfaUf sc-a31fc2a4-2 jCGzTY"
                                                        >
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
                                                                aria-describedby=":rd:-checkboxes-0x08030065~3D006454D5015B41~sold-error"
                                                                className="indexstyles__HiddenCheckbox-sc-ruvmzp-11 jGpkDd"
                                                            />
                                                            <span className="indexstyles__CustomCheckbox-sc-ruvmzp-8 jnGTME">
                                                                <svg
                                                                    className="BaseSvg-sc-yh8lnd-0 CheckmarkIcon___StyledBaseSvg-sc-k5ogp5-0 ckLyyv indexstyles__Checkmark-sc-ruvmzp-9 etfdsX"
                                                                    viewBox="0 0 24 24"
                                                                    width="73%"
                                                                    height="73%"
                                                                    aria-hidden="true"
                                                                    focusable="false"
                                                                >
                                                                    <path d="M23 3.2 7 22l-6-5.94 1.41-1.32 4.46 4.42L21.47 2z" />
                                                                </svg>
                                                                <svg
                                                                    className="BaseSvg-sc-yh8lnd-0 MinusIcon___StyledBaseSvg-sc-1btgke4-0 ckLyyv indexstyles__IndeterminateMark-sc-ruvmzp-10 byeMCy"
                                                                    viewBox="0 0 24 24"
                                                                    width="73%"
                                                                    height="73%"
                                                                    aria-hidden="true"
                                                                    focusable="false"
                                                                >
                                                                    <path d="M1 11.25h22v1.5H1z" />
                                                                </svg>
                                                            </span>
                                                            <div className="sc-a31fc2a4-0 fqcEuv">
                                                                <div className="TicketCardv2__Card-sc-1akc5v-0 iUWdPG">
                                                                    <div className="TicketCardv2__TicketHeaderBorderContainer-sc-1akc5v-3 hZnNuf" />
                                                                    <div className="TicketCardv2__ChildrenWrapper-sc-1akc5v-1 cWeWMl">
                                                                        <div className="sc-7989aef4-1">
                                                                            <div className="TicketTopSection__TopSectionWrapper-sc-11bz39i-0 kAoiSe">
                                                                                <div className="TicketInfoHeader__HeaderContainer-sc-101wb79-0 ctixpn">
                                                                                    <h3
                                                                                        translate="no"
                                                                                        className="TicketInfoHeader__HeaderTitle-sc-101wb79-1 sbbQd"
                                                                                    >
                                                                                        {ticket.type || 'Boleto normal'}
                                                                                    </h3>
                                                                                </div>
                                                                                <div className="TicketTopSection__SeatInfoWrapper-sc-11bz39i-1 ficefJ">
                                                                                    <dl className="SeatInfov2__RowList-sc-hzxzxj-0 gSZkIA">
                                                                                        <div className="SeatInfov2__RowItem-sc-hzxzxj-1 ftTdK">
                                                                                            <dt className="SeatInfov2__LocationLabel-sc-hzxzxj-2 cspToe">
                                                                                                Section
                                                                                            </dt>
                                                                                            <dd
                                                                                                translate="no"
                                                                                                className="SeatInfov2__LocationDescription-sc-hzxzxj-3 jhAkDi"
                                                                                            >
                                                                                                {ticket.section || 'N/A'}
                                                                                            </dd>
                                                                                        </div>
                                                                                        <div className="SeatInfov2__RowItem-sc-hzxzxj-1 jPmdZv">
                                                                                            <dt className="SeatInfov2__LocationLabel-sc-hzxzxj-2 cspToe">
                                                                                                Row
                                                                                            </dt>
                                                                                            <dd
                                                                                                translate="no"
                                                                                                className="SeatInfov2__LocationDescription-sc-hzxzxj-3 jfLFFl"
                                                                                            >
                                                                                                {ticket.row || 'N/A'}
                                                                                            </dd>
                                                                                        </div>
                                                                                        <div className="SeatInfov2__RowItem-sc-hzxzxj-1 dkuubl">
                                                                                            <dt className="SeatInfov2__LocationLabel-sc-hzxzxj-2 cspToe">
                                                                                                Seat
                                                                                            </dt>
                                                                                            <dd
                                                                                                translate="no"
                                                                                                className="SeatInfov2__LocationDescription-sc-hzxzxj-3 lNGlh"
                                                                                            >
                                                                                                {ticket.seat || 'N/A'}
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
                                            )}

                                           
                                        </ul>
                                    </div>
                                </fieldset>
                            </div>
                            <div className="indexstyles__Card-sc-cvxwg8-0 cfGQrC">
                                <fieldset className="sc-f584c16-0 jucNMi">
                                    <legend className="indexstyles__Title-sc-cvxwg8-1 sc-f584c16-1 cSqFpp dfqGYU">
                                        Enter Recipient Details
                                    </legend>
                                    <div className="indexstyles__Body-sc-cvxwg8-2 sc-f584c16-2 eguRCZ gNeSxH">
                                        <div className="sc-f584c16-7 cdMHhk">
                                            <div className="Stack-sc-br1alc-0 bcKaUz">
                                                <div
                                                    id="RecipientDetailsFormFirstName"
                                                    className="indexstyles__InputField-sc-ruvmzp-0 kMaRcL"
                                                >
                                                    <label
                                                        htmlFor="RecipientDetailsFormFirstName-input"
                                                        className="indexstyles__Label-sc-ruvmzp-1 cxfaUf"
                                                    >
                                                        First Name{" "}
                                                    </label>
                                                    <div className="indexstyles__Row-sc-ruvmzp-2 coECkF">
                                                        <input
                                                            type='text'
                                                            name='recipient_name'
                                                            value={form.recipient_name}
                                                            onChange={handleChange}
                                                            required
                                                            id='RecipientDetailsFormFirstName-input'
                                                            aria-invalid="false"
                                                            placeholder="Enter first name"
                                                            autoComplete="off"

                                                            aria-describedby="RecipientDetailsFormFirstName-error RecipientDetailsFormFirstName-success"
                                                            className="indexstyles__Input-sc-ruvmzp-6 dlfnWm"
                                                        />
                                                    </div>
                                                    <div
                                                        id="RecipientDetailsFormFirstName-success"
                                                        className="indexstyles__Validation-sc-ruvmzp-15 kNxCsC"
                                                    />
                                                </div>
                                                <div
                                                    id="RecipientDetailsFormLastName"
                                                    className="indexstyles__InputField-sc-ruvmzp-0 kMaRcL"
                                                >
                                                    <label
                                                        htmlFor="RecipientDetailsFormLastName-input"
                                                        className="indexstyles__Label-sc-ruvmzp-1 cxfaUf"
                                                    >
                                                        Last Name{" "}
                                                    </label>
                                                    <div className="indexstyles__Row-sc-ruvmzp-2 coECkF">
                                                        <input
                                                            name='recipient_lastname'
                                                            value={form.recipient_lastname}
                                                            onChange={handleChange}
                                                            aria-invalid="false"
                                                            type="text"
                                                            placeholder="Enter last name"
                                                            autoComplete="off"

                                                            required
                                                            id="RecipientDetailsFormLastName-input"
                                                            aria-describedby="RecipientDetailsFormLastName-error RecipientDetailsFormLastName-success"
                                                            className="indexstyles__Input-sc-ruvmzp-6 dlfnWm"
                                                        />
                                                    </div>
                                                    <div
                                                        id="RecipientDetailsFormLastName-success"
                                                        className="indexstyles__Validation-sc-ruvmzp-15 kNxCsC"
                                                    />
                                                </div>
                                                <div
                                                    id="RecipientDetailsFormEmail"
                                                    className="indexstyles__InputField-sc-ruvmzp-0 kMaRcL"
                                                >
                                                    <label
                                                        htmlFor="RecipientDetailsFormEmail-input"
                                                        className="indexstyles__Label-sc-ruvmzp-1 cxfaUf"
                                                    >
                                                        Email Address{" "}
                                                    </label>
                                                    <div className="indexstyles__Row-sc-ruvmzp-2 coECkF">
                                                        <input
                                                            type='email'
                                                            name='recipient_email'
                                                            value={form.recipient_email}
                                                            onChange={handleChange}
                                                            aria-invalid="false"
                                                            placeholder="Enter email"
                                                            autoComplete="off"

                                                            required
                                                            id="RecipientDetailsFormEmail-input"
                                                            aria-describedby="RecipientDetailsFormEmail-error RecipientDetailsFormEmail-success"
                                                            className="indexstyles__Input-sc-ruvmzp-6 dlfnWm"
                                                        />
                                                    </div>
                                                    <div
                                                        id="RecipientDetailsFormEmail-success"
                                                        className="indexstyles__Validation-sc-ruvmzp-15 kNxCsC"
                                                    />
                                                </div>
                                                <div>
                                                    <div
                                                        id="RecipientDetailsFormMessage"
                                                        className="indexstyles__InputField-sc-ruvmzp-0 kMaRcL"
                                                    >
                                                        <label
                                                            htmlFor="RecipientDetailsFormMessage-input"
                                                            className="indexstyles__Label-sc-ruvmzp-1 cxfaUf"
                                                        >
                                                            Enter a Message{" "}
                                                            <span className="sc-ec210be5-0 bpYznG">(Optional)</span>
                                                        </label>
                                                        <div className="indexstyles__Row-sc-ruvmzp-2 coECkF">
                                                            <textarea
                                                                aria-invalid='false'
                                                                type='text'
                                                                placeholder='Enter a message to the recipient (optional)'
                                                                name='recipient_message'
                                                                value={form.recipient_message}
                                                                onChange={handleChange}
                                                                id='RecipientDetailsFormMessage-input'


                                                                aria-describedby='RecipientDetailsFormMessage-error RecipientDetailsFormMessage-success'
                                                                rows={3}

                                                                className="indexstyles__Textarea-sc-ruvmzp-7 bfiORe"
                                                                defaultValue={""}
                                                            />
                                                        </div>
                                                        <div
                                                            id="RecipientDetailsFormMessage-error"
                                                            className="indexstyles__Validation-sc-ruvmzp-15 kNxCsC"
                                                        />
                                                    </div>
                                                    <div id=":rf:" aria-live="polite">
                                                        <div className="TextAreaLimited__CharacterCounter-sc-89126i-0 fMenar">
                                                            Characters Remaining: 140
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                            <div className="indexstyles__Card-sc-cvxwg8-0 cfGQrC">
                                <h2 className="indexstyles__Title-sc-cvxwg8-1 cSqFpp">
                                    Terms &amp; Conditions
                                </h2>
                                <div className="indexstyles__Body-sc-cvxwg8-2 eguRCZ">
                                    <p className="sc-eae37d99-2 gCJmr">
                                        Transfer is only available for select tickets, products, services,
                                        and extras (each a “Product” and collectively “Products”). Once a
                                        recipient has accepted a transfer, the transfer cannot be
                                        cancelled or reversed. If a Product is transferred multiple times
                                        using Transfer, only the Product from the most recent Transfer
                                        will be valid for entry or redemption; all previous barcodes will
                                        be cancelled. Only the original purchaser of a Product is eligible
                                        for refunds or credits—not the recipient of a Product Transfer.
                                        For cancelled events, the original purchaser will receive any
                                        available refund or credit, and no action is needed from the
                                        recipient of the transferred Product. For postponed, rescheduled,
                                        or moved events, recipients of the transferred Products will need
                                        to transfer the Products back to the original purchaser to enable
                                        the original purchaser to take advantage of any available refund
                                        and/or credit options. Once the Products have been transferred
                                        back to the original purchaser, the original purchaser will need
                                        to contact Fan Support to complete their request. If you transfer
                                        a Product you resold outside our Marketplace, you will need to
                                        contact the resale point of sale for any refund and/or credit
                                        options, if available. By transferring these Products, you agree
                                        to these terms, our{" "}
                                        <a
                                            href="https://help.ticketmaster.com.mx/hc/es-mx/articles/12682192759825-Condiciones-de-Uso"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="Link__StyledLink-sc-pudy0l-0 coVzbU"
                                        >
                                            Terms of Use
                                            <span className="VisuallyHidden-sc-8buqks-0 sc-9ee55a92-0 lmhoCy bScnHS">
                                                (Opens in new tab)
                                            </span>
                                        </a>{" "}
                                        and our{" "}
                                        <a
                                            href="https://help.ticketmaster.com.mx/hc/en-us/articles/6120032009745-Purchase-Policy"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="Link__StyledLink-sc-pudy0l-0 coVzbU"
                                        >
                                            Purchase Policy
                                            <span className="VisuallyHidden-sc-8buqks-0 sc-9ee55a92-0 lmhoCy bScnHS">
                                                (Opens in new tab)
                                            </span>
                                        </a>{" "}
                                        (collectively, the “Terms”). We may cancel the Products at any
                                        time without notice if they were obtained or transferred
                                        fraudulently or in violation of the Terms.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="sc-3bfb48cf-5 lndyNW">
                            <div className="indexstyles__Card-sc-cvxwg8-0 cfGQrC">
                                <div>
                                    <header className="sc-cfca419-0 eJqLHY">
                                        <h2 className="sc-cfca419-1 bnbRGs">                                              Tickets Being Transferred
</h2>
                                       <span className="sc-cfca419-2 eJwBEY">x

  {selectedTickets.length} {selectedTickets.length === 1 }
</span>
                                    </header>
                                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                                        {selectedTickets.length === 0 ? (
                                            <li className='text-center py-4 text-gray-500'>
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
                                                            `${ticket.section} - Row ${ticket.row} - Seat ${ticket.seat}`}
                                                    </span>
                                                </li>
                                            ))
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="sc-3bfb48cf-6 sc-eae37d99-1 hPgBev bGBcXy">
                            <button
                                type="submit"
                                className="indexstyles__StyledButton-sc-83qv1q-0 koySWx"
                            >
                                <span className="indexstyles__FlexWrapper-sc-83qv1q-1 hJuAcy">
                                    <span>Confirm</span>
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

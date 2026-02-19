import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../css/Aceptar.css'
import { API_URL, getUser, authenticatedRequest } from '../api/index'
import { AccordionList } from '../components/NavBar'
import useRequireAuth from '../hooks/userAuth'
import Modal from '../components/Modal'

export default function TransferAccept () {
  const { transferNumber } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const [transfer, setTransfer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isAccepting, setIsAccepting] = useState(false)

  const user = getUser()

  useEffect(() => {
    document.title = 'Aceptar Transferencia - Ticketmaster'
  }, [])

  useEffect(() => {
    if (!transferNumber) {
      setError('Transferencia inválida')
      setLoading(false)
      return
    }

    const token = localStorage.getItem('token')

    // 🔴 NO LOGUEADO → login primero
    if (!token) {
      localStorage.setItem(
        'redirect_after_login',
        location.pathname + location.search
      )
      navigate('/login', { replace: true })
      return
    }

    let isMounted = true

    const fetchTransfer = async () => {
      try {
        const result = await authenticatedRequest(
          `/transfers/${transferNumber}`
        )

        if (!result) {
          throw new Error('Transferencia no encontrada')
        }

        if (isMounted) setTransfer(result)
      } catch (err) {
        if (isMounted) setError(err.message)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchTransfer()

    return () => {
      isMounted = false
    }
  }, [transferNumber, location.pathname, navigate])

  const handleAccept = async () => {
    if (isAccepting) return // Prevenir múltiples clics
    
    setIsAccepting(true)
    try {
      await authenticatedRequest(`/transfers/${transferNumber}`, {
        method: 'PATCH'
      })

      navigate('/user/orders', { replace: true })
    } catch (err) {
      alert(err.message || 'Error al aceptar la transferencia')
      setIsAccepting(false)
    }
  }

  // ⏳ LOADING
  if (loading || isAccepting) {
    return <Modal isOpen text='Espera, estamos trabajando en tu solicitud.' />
  }

  if (error) {
    return <Modal isOpen text='Transferencia no encontrada' />
  }

  // 🟢 DATA OK
  const event = transfer.event
  const tickets = transfer.tickets || []

  return (
    <div className='sc-7e332ac7-0 iANLom snipcss-2Zfwd'>
      <div className='sc-7e332ac7-1 eQlytX'>
        <div className='sc-7e332ac7-2 hFnnUB'>
          <div className='sc-d52cdb9b-0 bmUOnl sc-2fe5fa42-0 CZZvl'>
            <div
              className='sc-d52cdb9b-1 cyqnkL'
              style={{
                backgroundImage: `url(${event?.poster || '/placeholder.svg'})`
              }}
            />
            <div className='sc-d52cdb9b-2 kAZSuT' />
            <div className='sc-d52cdb9b-3 hokKfn' />
          </div>
        </div>
        <div className='sc-7e332ac7-5 bCJgrl'>
          <div className='sc-7e332ac7-6 gsgarL'>
            <div className='sc-7e332ac7-12 kHglPF'>
              <nav aria-label='Breadcrumb'>
                <ol data-testid='breadcrumb' className='sc-c3852847-0 cJkGra'>
                  <li className='sc-c3852847-1 esVqUc'>
                    <a
                      aria-current='false'
                      className='sc-b78ef1b0-1 giEdKV sc-c3852847-4 eVuiQT'
                      href='/'
                    >
                      Inicio
                    </a>
                    <span
                      role='presentation'
                      aria-hidden='true'
                      className='sc-c3852847-2 dgODTX'
                    />
                  </li>
                  <li className='sc-c3852847-1 esVqUc'>
                    <span aria-current='page' className='sc-c3852847-5 fOsyUG'>
                      Aceptar transferencia
                    </span>
                  </li>
                </ol>
              </nav>
              <div className='sc-eaa55f72-0 cnkUZl'>
                <div className='sc-eaa55f72-1 cEWvto'>
                  <img
                    src={event?.poster || '/placeholder.svg'}
                    alt='Poster del evento'
                    className='sc-eaa55f72-3 eqqNFU'
                  />
                </div>
                <div className='sc-eaa55f72-2 dmbQBN'>
                  <div className='sc-ac84ae8c-1 eCSuhv'>
                    <span className='VisuallyHidden-sc-8buqks-0 lmhoCy'>
                      <span>
                        {event?.formattedDate?.shortdate || 'Fecha del evento'}
                      </span>
                    </span>
                    <span aria-hidden='true'>
                      <div aria-hidden='true' className='sc-9e0822bc-0 hVtRUE'>
                        <span className='sc-9e0822bc-1 WZplE'>
                          {event?.formattedDate?.month || 'ENE'}
                        </span>
                        <span className='sc-9e0822bc-2 bPbuYF'>
                          {event?.formattedDate?.day || '01'}
                        </span>
                        <span className='sc-9e0822bc-3 fujPMM' />
                      </div>
                    </span>
                    <div className='sc-ac84ae8c-2 bFwEol'>
                      <div className='sc-ac84ae8c-3 cJKsqv'>
                        <span className='VisuallyHidden-sc-8buqks-0 lmhoCy'>
                          <span>
                            {event?.formattedDate?.shortdate ||
                              'Fecha del evento'}
                          </span>
                        </span>
                        <span aria-hidden='true'>
                          <div
                            aria-hidden='true'
                            className='sc-65bd7b91-0 hUIqBV'
                          >
                            <span className='sc-65bd7b91-1 dFiqCA'>
                              {event?.formattedDate?.shortDate || '01 Ene 2024'}
                            </span>
                          </div>
                        </span>
                      </div>
                      <div>
                        <a
                          href={event?.url || '#'}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='Link__StyledLink-sc-pudy0l-0 coVzbUbb sc-ac84ae8c-5 jkJhzJ'
                        >
                          {event?.artist || 'Artista'}
                          <span className='VisuallyHidden-sc-8buqks-0 lmhoCy'>
                            (Abre una nueva pestaña)
                          </span>
                        </a>
                        <p className='sc-ac84ae8c-6 dMqBmK'>
                          {event?.venue || 'Venue'}
                        </p>
                        <div className='sc-ac84ae8c-0 cVsCUh' />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='sc-7e332ac7-3 cBThNd'>
        <svg
          className='BaseSvg-sc-yh8lnd-0 TicketmasterTIcon___StyledBaseSvg-sc-14ttjcp-0 ckLyyv sc-7e332ac7-4 cebxtu'
          viewBox='0 0 24 24'
          width='1.5em'
          height='1.5em'
          aria-hidden='true'
          focusable='false'
        >
          <path d='M11.23 17.47c0-.59.1-1.12.18-1.47l1.45-6.62h3.57l.63-2.88h-3.57l.98-4.5-4.28 1.38-.68 3.12H6.62L6 9.38h2.88L7.75 14.5a16 16 0 0 0-.5 3.52c0 2.92 1.9 3.98 4.6 3.98.69 0 1.46-.21 2.15-.36l.68-3.06c-.5.21-1.22.36-1.93.36-.9 0-1.52-.56-1.52-1.47' />
        </svg>
        <div className='sc-2eac59d2-0 dzQEzQ sc-7e332ac7-13 eqQbzq'>
          <p className='sc-2eac59d2-1 dcACgO'>
            <span className='sc-2eac59d2-2 cesjMZ'>¡Bienvenido de vuelta!</span>{' '}
            <span data-cs-mask='true' className='sc-2eac59d2-3 jeLwlb'>
              {user?.name || 'Usuario'}
            </span>
          </p>
        </div>
      </div>

      <div className='sc-7e332ac7-7 gMTQab'>
        <AccordionList />
      </div>

      {transfer?.status === 'completed' ? (
        <div className='sc-7e332ac7-10 jTWxHJ snipcss-7k6lv'>
          <div className='sc-7e332ac7-12 kHglPF'>
            <div className='indexstyles__Card-sc-cvxwg8-0 sc-9638b0a6-0 dHWtvF bkLEXU'>
              <div className='Stack-sc-br1alc-0 bcKaUz'>
                <h3 className='sc-9638b0a6-1 iJbjku'>
                  <span>Hola {user?.name},</span>
                  ¡Estos boletos ya han sido aceptados!
                </h3>
                <div className='sc-9638b0a6-2 cEgDJh'>
                  <p>Tus boletos ya están en tu cuenta de Ticketmaster.</p>
                </div>
              </div>
              <div className='sc-9638b0a6-3 dEmdTF'>
                <a
                  className='sc-b78ef1b0-1 giEdKV indexstyles__StyledButton-sc-83qv1q-0 eSghXc'
                  href='/user/orders'
                >
                  <span className='indexstyles__FlexWrapper-sc-83qv1q-1 dAPYyI'>
                    <span className='indexstyles__Text-sc-83qv1q-2 jHTUWf'>
                      Ver Mis Boletos
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='sc-7e332ac7-10 jTWxHJ'>
          <div className='sc-7e332ac7-12 kHglPF'>
            <form
              onSubmit={e => {
                e.preventDefault()
                handleAccept()
              }}
              className='sc-26e93e9c-1 sc-d267f69d-7 eyGSso kQiWtX'
            >
              <div className='sc-26e93e9c-3 cxqzNc'>
                <div className='indexstyles__Card-sc-cvxwg8-0 sc-d267f69d-8 dHWtvF jkpCiX'>
                  <div className='indexstyles__Body-sc-cvxwg8-2 sc-d267f69d-9 eguRCZ jlXyxn'>
                    <div className='Stack-sc-br1alc-0 bcKaVK'>
                      <div className='Stack-sc-br1alc-0 bcKaUz'>
                        <h1 className='sc-d267f69d-11 jWmypz'>
                          Aceptar transferencia de boletos
                        </h1>
                        <p>
                          Has recibido un boleto de{' '}
                          {transfer?.sender?.name || 'Usuario'}{' '}
                          {transfer?.sender?.last_name || ''}
                        </p>
                        <p>
                          Una vez que aceptes la transferencia, los boletos
                          estarán en tu cuenta.
                        </p>
                      </div>
                      <div className='Stack-sc-br1alc-0 bcKaXb'>
                        <ul
                          role='list'
                          className='UnstyledList-sc-ix96mm-0 sc-da773ebd-4 ekOJfs cHbJOt'
                        >
                          {tickets?.map(ticket => (
                            <li
                              key={ticket.id}
                              role='listitem'
                              className='sc-da773ebd-0 fzuNJB'
                            >
                              <div className='sc-da773ebd-1 cHGRVQ'>
                                <div className='sc-da773ebd-2 fUfhxA'>
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
                                  <div>
                                    <h4 className='sc-7c4cf33f-0 fSuRYU'>
                                      {ticket?.info || 'Información del boleto'}
                                    </h4>
                                  </div>
                                </div>
                              </div>
                            </li>
                          )) || (
                            <li>
                              <p>No hay información de boletos disponible</p>
                            </li>
                          )}
                        </ul>
                      </div>
                      <hr className='sc-d267f69d-13 eAIpdr' />
                      <p className='sc-d267f69d-14 kHYmUf'>
                        La transferencia solo está disponible para boletos,
                        productos, servicios y extras seleccionados (cada uno un
                        "Producto" y colectivamente "Productos"). Debes tener
                        una cuenta activa para poder recibir un Producto
                        mediante Transferencia de Producto. Si acepta una
                        Transferencia de Producto o utiliza un Producto comprado
                        por otra persona, acepta estos términos, nuestro{' '}
                        <a
                          href='https://help.ticketmaster.com.mx/hc/es-mx/articles/12682192759825-Condiciones-de-Uso'
                          target='_blank'
                          rel='noopener noreferrer'
                          className='Link__StyledLink-sc-pudy0l-0 coVzbUbbb'
                        >
                          Términos y Condiciones
                          <span className='VisuallyHidden-sc-8buqks-0 lmhoCy'>
                            (Abre una nueva pestaña)
                          </span>
                        </a>
                        , nuestro{' '}
                        <a
                          href='https://help.ticketmaster.com.mx/hc/es-mx/articles/6120032009745-Pol%C3%ADtica-de-compra'
                          target='_blank'
                          rel='noopener noreferrer'
                          className='Link__StyledLink-sc-pudy0l-0 coVzbUbb'
                        >
                          Política de Compra
                          <span className='VisuallyHidden-sc-8buqks-0 lmhoCy'>
                            (Abre una nueva pestaña)
                          </span>
                        </a>{' '}
                        y todas las reglas, políticas, términos y condiciones
                        establecidos por el Organizador del Evento
                        (colectivamente, los “Términos”). Debes conocer y
                        confiar en la persona que le transfiere el Producto
                        antes de aceptarlo. Si el Producto que se le transfirió
                        se obtuvo o se transfirió de manera fraudulenta o en
                        violación de los Términos, podemos cancelar el Producto
                        en cualquier momento sin previo aviso. Solo el comprador
                        original de los Productos transferidos, no el
                        destinatario de una Transferencia de Producto, es
                        elegible para cualquier reembolso, crédito o cambio
                        (cuando esté disponible) si un evento se cancela,
                        reprograma o modifica materialmente. Aceptas que
                        Ticketmaster no será responsable bajo ninguna
                        circunstancia. Si el comprador original desea aprovechar
                        cualquier opción de reembolso y/o crédito disponible,
                        deberá transferir el Producto nuevamente al comprador
                        original. Una vez que el Producto se haya transferido
                        nuevamente al comprador original, el comprador original
                        deberá comunicarse con Fan Support para completar su
                        solicitud. Si recibió una Transferencia de Producto para
                        un Producto de reventa que compró fuera de nuestro
                        Mercado, deberá comunicarse con el punto de compra de
                        reventa para obtener cualquier opción de reembolso y/o
                        crédito, si está disponible.
                      </p>
                      <div className='sc-d267f69d-10 guynbk'>
                        <button
                          className='indexstyles__StyledButton-sc-83qv1q-0 iTqNMc sc-d267f69d-15 gmhaqU'
                          type='button'
                          disabled={isAccepting}
                        >
                          <span className='indexstyles__FlexWrapper-sc-83qv1q-1 dAPYyI'>
                            <span className='indexstyles__Text-sc-83qv1q-2 jHTUWf'>
                              No gracias
                            </span>
                          </span>
                        </button>
                        <button
                          type='submit'
                          className='indexstyles__StyledButton-sc-83qv1q-0 dkzSIQ sc-d267f69d-16 dBjWhb'
                          disabled={isAccepting}
                        >
                          <span className='indexstyles__FlexWrapper-sc-83qv1q-1 dAPYyI'>
                            <span className='indexstyles__Text-sc-83qv1q-2 jHTUWf'>
                              {isAccepting ? 'Procesando...' : 'Aceptar la transferencia de boleto'}
                            </span>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

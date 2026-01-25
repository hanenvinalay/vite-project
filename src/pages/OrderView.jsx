import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../css/MisBoletos.css'
import { AccordionLat } from '../components/NavBar'
import {
  detectBrowser,
  getWalletImage,
  getWalletAltText
} from '../utils/browserDetection'
import { authenticatedRequest, getUser } from '../api/index'
export default function OrderView () {
  const { orderNumber } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('tickets')

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

  useEffect(() => {
    document.title = 'Mis Eventos - Ticketmaster'
  }, [])

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

  return (
    <div className='sc-12r1da7-0 efoHKt'>
      <div className='sc-12r1da7-1 kQyEdo'>
        <div className='sc-12r1da7-2 ksJoti'>
          <div className='sc-a655db-0 jxczVS sc-f7txxf-1 cQRpLe'>
            <div
              className='sc-a655db-1 bSSjWM'
              style={{
                backgroundImage:
                  order.event && order.event.poster
                    ? `url(${order.event.poster})`
                    : 'none'
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
                    <span aria-current='page' className='sc-1loturx-5 jDteSL'>
                      {order.event?.artist || 'Evento'}
                    </span>
                  </li>
                </ol>
              </nav>
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
                    <span className='VisuallyHidden-sc-8buqks-0 lmhoCy'>
                      <span>
                        {order.event?.formattedDate?.dateFormated ||
                          'Fecha del evento'}
                      </span>
                    </span>
                    <span aria-hidden='true'>
                      <div aria-hidden='true' className='sc-1eisn46-0 hPSPJL'>
                        <span className='sc-1eisn46-1 chthMZ'>
                          {order.event?.formattedDate?.month || 'ENE'}
                        </span>
                        <span className='sc-1eisn46-2 iRCDqS'>
                          {order.event?.formattedDate?.day || '01'}
                        </span>
                        <span className='sc-1eisn46-3 fFbPas' />
                      </div>
                    </span>
                    <div className='sc-1xcba17-2 buEEof'>
                      <div className='sc-1xcba17-3 iYOCcf'>
                        <span className='VisuallyHidden-sc-8buqks-0 lmhoCy'>
                          <span>Información del evento</span>
                        </span>
                        <span aria-hidden='true'>
                          <div aria-hidden='true' className='sc-hkg1cn-0'>
                            <span className='sc-hkg1cn-1 khlcWQ'>
                              {order.event?.formattedDate.shortDate ||
                                'Información del evento'}
                            </span>
                          </div>
                        </span>
                      </div>
                      <div>
                        <h1 className='sc-1xcba17-4 inPRYG'>
                          {order.event?.event ||
                            order.event?.name ||
                            'Nombre del evento'}
                        </h1>
                        <p className='sc-1xcba17-5 PvcYX'>
                          {order.event?.venue || 'Venue del evento'}
                        </p>
                        <div className='sc-1xcba17-0 jihcxv' />
                      </div>
                      <div spacing='small' className='sc-1q8x0bj-1 bihArN'>
                        <p className='sc-1q8x0bj-0 bmuUdt'>Comparte que vas</p>
                        <a
                          href={`https://wa.me/?text=¡Voy a ${
                            order.event?.event || 'este evento'
                          }!`}
                          target='_blank'
                          rel='noreferrer'
                        >
                          <div className='sc-ll08bq-0 fMWMyM'>
                            <svg
                              className='BaseSvg-sc-yh8lnd-0 WhatsappIcon___StyledBaseSvg-sc-12o79mn-0 bwaYRf sc-ll08bq-1 ghtdLi'
                              viewBox='0 0 360 362'
                              width='1.5em'
                              height='1.5em'
                              aria-hidden='true'
                              focusable='false'
                            >
                              <path d='M307.55 52.57A178 178 0 0 0 180.75 0C81.96 0 1.55 80.4 1.5 179.24a179 179 0 0 0 23.93 89.6L0 361.74l95.02-24.93a179 179 0 0 0 85.66 21.81h.08c98.78 0 179.2-80.4 179.24-179.24a178 178 0 0 0-52.45-126.8zm-126.8 275.78h-.05a149 149 0 0 1-75.84-20.76l-5.44-3.23-56.39 14.79 15.05-54.98-3.54-5.64a148.6 148.6 0 0 1-22.77-79.29C31.8 97.1 98.63 30.27 180.82 30.27c39.79.02 77.2 15.53 105.32 43.7a148 148 0 0 1 43.6 105.4c-.04 82.14-66.87 148.98-148.98 148.98m81.72-111.57c-4.47-2.25-26.5-13.08-30.6-14.57s-7.1-2.24-10.07 2.24c-2.99 4.49-11.57 14.58-14.19 17.56-2.6 3-5.22 3.36-9.7 1.12s-18.9-6.97-36.02-22.23c-13.31-11.88-22.3-26.54-24.92-31.02-2.6-4.5-.27-6.91 1.96-9.14 2.01-2.01 4.48-5.24 6.72-7.85 2.25-2.61 2.99-4.48 4.48-7.47s.75-5.6-.37-7.84c-1.11-2.25-10.07-24.3-13.8-33.26-3.64-8.73-7.34-7.54-10.08-7.69-2.61-.13-5.6-.15-8.59-.15s-7.84 1.11-11.94 5.6c-4.11 4.49-15.68 15.32-15.68 37.36s16.05 43.35 18.29 46.34s31.58 48.22 76.5 67.63a257 257 0 0 0 25.54 9.44c10.73 3.4 20.5 2.93 28.21 1.77 8.6-1.28 26.5-10.83 30.23-21.3 3.73-10.45 3.73-19.43 2.61-21.3-1.11-1.86-4.1-2.98-8.58-5.23z'></path>
                            </svg>
                            <span className='VisuallyHidden-sc-8buqks-0 lmhoCy'>
                              Logo de WhatsApp
                            </span>
                          </div>
                        </a>
                        <a
                          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                            window.location.href
                          )}`}
                          target='_blank'
                          rel='noreferrer'
                        >
                          <div className='sc-ll08bq-0 fMWMyM'>
                            <svg
                              className='BaseSvg-sc-yh8lnd-0 FacebookIcon___StyledBaseSvg-sc-nzrkkn-0 bwaYRf sc-ll08bq-1 ghtdLi'
                              viewBox='0 0 320 512'
                              width='1.5em'
                              height='1.5em'
                              aria-hidden='true'
                              focusable='false'
                            >
                              <path d='m279.14 288 14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z'></path>
                            </svg>
                            <span className='VisuallyHidden-sc-8buqks-0 lmhoCy'>
                              Logo de Facebook
                            </span>
                          </div>
                        </a>
                        <a
                          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                            `¡Voy a ${order.event?.event || 'este evento'}!`
                          )}&url=${encodeURIComponent(window.location.href)}`}
                          target='_blank'
                          rel='noreferrer'
                        >
                          <div className='sc-ll08bq-0 fMWMyM'>
                            <svg
                              className='BaseSvg-sc-yh8lnd-0 XIcon___StyledBaseSvg-sc-tx6doq-0 bwaYRf sc-ll08bq-1 ghtdLi'
                              viewBox='0 0 1200 1227'
                              width='1.5em'
                              height='1.5em'
                              aria-hidden='true'
                              focusable='false'
                            >
                              <path d='M714.16 519.28 1160.9 0h-105.86l-387.9 450.89L357.34 0H0l468.5 681.82L0 1226.37h105.87l409.62-476.15 327.18 476.15H1200L714.14 519.28zm-145 168.55-47.46-67.9L144 79.7h162.6l304.8 436 47.47 67.89 396.2 566.72h-162.6L569.16 687.85z'></path>
                            </svg>
                            <span className='VisuallyHidden-sc-8buqks-0 lmhoCy'>
                              Logo de X
                            </span>
                          </div>
                        </a>
                        <a
                          href={`mailto:?subject=${encodeURIComponent(
                            `¡Voy a ${order.event?.event || 'este evento'}!`
                          )}&body=${encodeURIComponent(
                            `Te invito a ver ${
                              order.event?.event || 'este evento'
                            } conmigo.`
                          )}`}
                          target='_blank'
                          rel='noreferrer'
                        >
                          <div className='sc-ll08bq-0 fMWMyM'>
                            <svg
                              className='BaseSvg-sc-yh8lnd-0 EnvelopeClosedIcon___StyledBaseSvg-sc-1uqjuak-0 bwaYRf sc-ll08bq-1 ghtdLi'
                              viewBox='0 0 24 24'
                              width='1.5em'
                              height='1.5em'
                              aria-hidden='true'
                              focusable='false'
                            >
                              <path d='M1 20.51h22v-17H1zM21.5 5.96V17l-6.17-5.6zm-7.31 6.44 6.87 6.24-9.07.15-9.03-.15 6.87-6.24L12 14.32zm-5.49-.99-6.2 5.63V5.93zm11.59-6.39-8.28 7.3-8.27-7.3z'></path>
                            </svg>
                            <span className='VisuallyHidden-sc-8buqks-0 lmhoCy'>
                              Icono de correo electrónico
                            </span>
                          </div>
                        </a>
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
          <path d='M11.23 17.47c0-.59.1-1.12.18-1.47l1.45-6.62h3.57l.63-2.88h-3.57l.98-4.5-4.28 1.38-.68 3.12H6.62L6 9.38h2.88L7.75 14.5a16 16 0 0 0-.5 3.52c0 2.92 1.9 3.98 4.6 3.98.69 0 1.46-.21 2.15-.36l.68-3.06c-.5.21-1.22.36-1.93.36-.9 0-1.52-.56-1.52-1.47'></path>
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
      <div className='sc-12r1da7-8 UohSU'>
        <div className='sc-f7txxf-0 gJnEEK' />
      </div>
      <div className='sc-12r1da7-9 GMACW'>
        <div className='sc-12r1da7-12 hByXSe'>
          <nav
            aria-label='Detalles de la compra'
            className='sc-f7txxf-2 cEGSJy'
          >
            <div className='sc-gnidii-0 kqlDwu'>
              <div
                className='sc-gnidii-1 haoove'
                role='tablist'
                aria-orientation='horizontal'
              >
                <button
                  id='tickets'
                  data-testid='tab-tickets'
                  role='tab'
                  aria-controls='tickets-tabpanel'
                  aria-selected={activeTab === 'tickets'}
                  className='sc-gnidii-2 bCuajV tablinks active'
                  onClick={() => setActiveTab('tickets')}
                  tabIndex={activeTab === 'tickets' ? 0 : -1}
                >
                  Boletos
                </button>
                <button
                  id='eventInfo'
                  data-testid='tab-eventInfo'
                  role='tab'
                  aria-controls='eventInfo-tabpanel'
                  aria-selected={activeTab === 'eventInfo'}
                  className='sc-gnidii-2 bCuajV tablinks '
                  onClick={() => setActiveTab('eventInfo')}
                  tabIndex={activeTab === 'eventInfo' ? 0 : -1}
                >
                  Información de evento
                </button>
                <button
                  id='venueInfo'
                  data-testid='tab-venueInfo'
                  role='tab'
                  aria-controls='venueInfo-tabpanel'
                  aria-selected={activeTab === 'venueInfo'}
                  className='sc-gnidii-2 bCuajV tablinks '
                  onClick={() => setActiveTab('venueInfo')}
                  tabIndex={activeTab === 'venueInfo' ? 0 : -1}
                >
                  Información del inmueble
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div className='sc-12r1da7-10 jRKBxK'>
        <div className='sc-12r1da7-12 hByXSe'>
          <div className='sc-f7txxf-3 btPtxf'>
            <div
              role='tabpanel'
              id='venueInfo-tabpanel'
              aria-labelledby='venueInfo'
              aria-busy='false'
              aria-hidden={activeTab !== 'venueInfo'}
              className='sc-df6f6ee7-2 eNZRAX'
              style={{ display: activeTab === 'venueInfo' ? 'block' : 'none' }}
            >
              <div className='sc-f2zukj-0 gKIgYB'>
                <div className='sc-f2zukj-1 gDNvJy'>
                  <div className='sc-f2zukj-2 hbeylP'>
                    <svg
                      viewBox='0 0 24 24'
                      width='2em'
                      height='2em'
                      aria-hidden='true'
                      focusable='false'
                      className='BaseSvg-sc-yh8lnd-0 TicketsIcon___StyledBaseSvg-sc-o359im-0 ckLyyv'
                    >
                      <path d='M1 4.11 15.6 1l.64 2.96L23 5.18l-2.73 15.36-.25.18c-.79.56-1.34.95-1.98 1.4q-.45.3-1 .7l-.26.18-8.25-1.48-3.67.78zM12.42 20.7l4 .72q.41-.29.76-.53c.57-.4 1.07-.75 1.72-1.2L21.26 6.4l-4.69-.85 2.35 11.08-1.83 3.06zM2.78 5.27l3.24 15.25 10.12-2.16 1.19-2L14.45 2.8zm10.72 10.9-6.86 1.45-.3-1.47 6.85-1.46zm.47-9.85L4.67 8.3l1.35 6.38 9.3-1.98zm-6.8 6.57-.72-3.43L12.8 8.1l.73 3.44zm5.14-2.12L8 11.7l-.32-1.47L12 9.3z'></path>
                    </svg>
                  </div>
                </div>
                <h2 className='sc-f2zukj-3 eHbjbf'>Información del venue</h2>
                <p className='sc-f2zukj-4 dXKyyS'>
                  {order.event?.venue || 'Información del venue no disponible'}
                </p>
                <p className='sc-f2zukj-4 dXKyyS'>
                  {order.event?.address || 'Dirección no disponible'}
                </p>
              </div>
            </div>
            <div
              role='tabpanel'
              id='eventInfo-tabpanel'
              aria-labelledby='eventInfo'
              aria-hidden={activeTab !== 'eventInfo'}
              aria-busy='false'
              className='sc-f8fc0acc-0 iNjiSI'
              style={{ display: activeTab === 'eventInfo' ? 'block' : 'none' }}
            >
              <div className='sc-1etvb6u-3 kCcXUy'>
                <h2 className='sc-1etvb6u-0 fRJQoH'>Información del evento</h2>
                <div className='sc-1fnkua7-0 sc-1etvb6u-4 cUXxYr eYRKvW'>
                  <p>
                    <strong>Artista:</strong>{' '}
                    {order.event?.artist || 'No disponible'}
                  </p>
                  <p>
                    <strong>Fecha:</strong>{' '}
                    {order.event?.formatted_date?.full || 'No disponible'}
                  </p>
                  <p>
                    <strong>Hora:</strong>{' '}
                    {order.event?.info || 'No disponible'}
                  </p>
                  <p>
                    <strong>Venue:</strong>{' '}
                    {order.event?.venue || 'No disponible'}
                  </p>
                </div>
              </div>
            </div>
            <div
              role='tabpanel'
              id='tickets-tabpanel'
              aria-labelledby='tickets'
              aria-hidden={activeTab !== 'tickets'}
              className='sc-f3ef6a4b-0 kZmgFg'
              style={{ display: activeTab === 'tickets' ? 'block' : 'none' }}
            >
              <div className=''>
                <div className='sc-1x39nnc-0 eBlMNx'>
                  <div className='sc-1x39nnc-1 bsOQKE'>
                    <h2 className='sc-wm13uv-0 lgqIFQ'>Mis boletos</h2>
                    <div className='sc-1x39nnc-2 gQMKTM snipcss-ofQlw'>
                      <div
                        data-testid='deliveryInfo'
                        className='sc-1ubto06-0 eDhCky'
                      >
                        <svg
                          viewBox='0 0 24 24'
                          width='1.5em'
                          height='1.5em'
                          aria-hidden='true'
                          focusable='false'
                          className='BaseSvg-sc-yh8lnd-0 PhoneIcon___StyledBaseSvg-sc-77u3fp-0 hsRbmG'
                        >
                          <path d='M5.25 1h13.5v22H5.25zm1.5 1.5v1.25h10.5V2.5zm0 16.25h10.5V5.25H6.75zm4.25 1.5v1.25h2v-1.25z'></path>
                        </svg>
                        <div className='sc-1ubto06-1 hqFJRJ'>
                          <p className='sc-1ubto06-2 kTigBz'>
                            <strong>×</strong>
                            <strong id='count'>
                              {order.tickets ? order.tickets.length : 0}
                            </strong>{' '}
                            Boletos digitales
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='sc-1x39nnc-3 kkZMtT'>
                    <div
                      data-testid='ticketActions'
                      className='sc-1hi1rr1-0 fhLsuk'
                    >
                      <div className='sc-1hi1rr1-1 gHYMHG'>
                        <button
                          status='disable'
                          onClick={() =>
                            navigate(
                              `/user/order/${order.orderNumber}/view/transfer`
                            )
                          }
                          className='sc-jfe99z-1 cKVhWb indexstyles__StyledButton-sc-83qv1q-0 bQobOd sc-epzfpo-0 frGemt'
                        >
                          <span className='indexstyles__FlexWrapper-sc-83qv1q-1 kCQEIv'>
                            <span className='indexstyles__Text-sc-83qv1q-2 cfgPSv'>
                              Venta de Fan a Fan
                            </span>
                            <svg
                              viewBox='0 0 24 24'
                              width='1.5em'
                              height='1.5em'
                              aria-hidden='true'
                              focusable='false'
                              class='BaseSvg-sc-yh8lnd-0 QuestionMarkCutCornerFilledIcon___StyledBaseSvg-sc-1iexa2z-0 hNajXU'
                            >
                              <path d='M1 1h22v16.31L17.31 23H1z M12.25 8a1 1 0 0 1 .24.02q.27.04.58.17.3.12.48.35c.1.15.2.36.2.71 0 .67-.34 1.08-.92 1.79l-.04.05a4.7 4.7 0 0 0-1.29 3.16H13c0-.98.41-1.55.96-2.21q.05-.08.1-.14c.52-.62 1.19-1.43 1.19-2.65q-.02-.98-.5-1.6c-.31-.42-.7-.67-1.07-.84a4 4 0 0 0-1.38-.3l-.03-.01h-.04a2 2 0 0 0-.14 0 4 4 0 0 0-1.43.4c-.4.2-.82.5-1.14.99q-.5.73-.52 1.86h1.5c0-.5.12-.81.26-1.03q.23-.32.58-.49a2 2 0 0 1 .9-.23zm-.75 7.5V17H13v-1.5z'></path>
                            </svg>
                          </span>
                        </button>
                      </div>
                      <div className='sc-1hi1rr1-1 gHYMHG'>
                        <a
                          href={`/user/order/${order.orderNumber}/transfer`}
                          status='active'
                          className='sc-jfe99z-1 cKVhWb indexstyles__StyledButton-sc-83qv1q-0 bQobOd sc-epzfpo-0 frGemt'
                        >
                          <span className='indexstyles__FlexWrapper-sc-83qv1q-1 kCQEIv'>
                            <span className='indexstyles__Text-sc-83qv1q-2 cfgPSv'>
                              Transferir a alguien
                            </span>
                            <svg
                              viewBox='0 0 24 24'
                              width='1.5em'
                              height='1.5em'
                              aria-hidden='true'
                              focusable='false'
                              className='BaseSvg-sc-yh8lnd-0 ArrowTopRightIcon___StyledBaseSvg-sc-cclnom-0 hNajXU'
                            >
                              <path d='M20 4H7.68v1.56h9.63L3.47 19.46l1.07 1.07 13.9-13.97v9.74H20z'></path>
                            </svg>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  data-testid='OrderAlertBox'
                  className='AlertBox__Box-sc-tc59ff-0 iKrdMp sc-16osgrv-0 iXvUgv'
                >
                  <div className='AlertBox__TitleWrapper-sc-tc59ff-1 kGgqgW'>
                    <svg
                      viewBox='0 0 24 25'
                      width='1.5em'
                      height='1.5em'
                      aria-hidden='true'
                      focusable='false'
                      className='BaseSvg-sc-yh8lnd-0 InfoICircledFilledIcon___StyledBaseSvg-sc-1dezxte-0 hNajXU'
                    >
                      <path d='M12 23.5a11 11 0 1 0 0-22 11 11 0 0 0 0 22 M11 6.5h2v2h-2zm.5 5h-1.25V10H13v8.5h-1.5z'></path>
                    </svg>
                    <div className='AlertBox__Title-sc-tc59ff-2 dhibpA'>
                      Tu teléfono es tu boleto.{' '}
                    </div>
                  </div>
                  <div className='AlertBox__ChildContainer-sc-tc59ff-3 fMMtqk'>
                    <div className='sc-16osgrv-1 kqeTgw'>
                      <p style={{}}>
                        En la entrada del evento, muestra desde tu cuenta o App
                        Ticketmaster el código de cada boleto comprado. Las
                        capturas de pantalla no serán válidas para ingresar al
                        evento.
                      </p>
                    </div>
                  </div>
                </div>
                <div className='sc-3c97ui-0 ispQYY sc-1gxt77a-0 gZocww'>
                  <ul
                    id='ticket-container'
                    className='sc-235i9s-0 qhsHC sc-1gxt77a-1 iAwZiM'
                  >
                    {order.tickets && order.tickets.length > 0 ? (
                      order.tickets.map((ticket, index) =>
                        ticket.section === 'PISTA' ||
                        ticket.section === 'GRAL' ||
                        ticket.section === 'BEYOND' ? (
                          // Plantilla para boletos de PISTA o GRAL-B
                          <li
                            key={ticket.id || index}
                            className='sc-knkt5x-0 jrtQbZ sc-1gxt77a-2 tUato snipcss-2Ib6L snipcss-ZmcFP style-EQIUf'
                            id='style-EQIUf'
                          >
                            <div
                              data-testid='ticketCard'
                              className='TicketCardv2__Card-sc-1akc5v-0 kxlGTJ'
                            >
                              <div className='TicketCardv2__TicketHeaderBorderContainer-sc-1akc5v-2 kbjGha'>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  fill='#ffffff'
                                  width='100%'
                                  height='100%'
                                  viewBox='0 0 135 24'
                                >
                                  <path d='M41.57 6.27c-4.02 0-6.97 3.63-6.97 7.4 0 3.62 2.38 5.32 5.9 5.32 1.3 0 2.66-.3 3.9-.68l.4-2.5a8.98 8.98 0 0 1-3.75.86c-2.04 0-3.23-.71-3.39-2.62l-.02-.34v-.1a6.46 6.46 0 0 1 .52-2.41c.61-1.55 1.48-2.62 3.36-2.62 1.33 0 2.02.73 2.02 2.03 0 .28-.02.54-.07.83H39.1a7.57 7.57 0 0 0-.34 2.17h7.5c.2-.9.32-1.8.32-2.72 0-3.09-2-4.62-5.02-4.62zm-5.4.28h-4.15l-4.44 4.41h-.05L29.65 1h-3.19l-3.78 17.7h3.11l1.38-6.44h.05l3.16 6.45h3.6l-3.7-6.62 5.88-5.54zm15.16 8.8a5 5 0 0 1 .15-1.18l1.16-5.3h2.86l.5-2.32h-2.86l.79-3.61-3.42 1.1-.55 2.5h-2.3l-.51 2.32h2.3l-.9 4.11c-.2.97-.4 1.89-.4 2.83 0 2.34 1.52 3.2 3.69 3.2.54 0 1.16-.18 1.7-.3l.56-2.45a4.28 4.28 0 0 1-1.55.28c-.72 0-1.22-.44-1.22-1.18zm-47.14 0c0-.47.07-.9.14-1.18l1.16-5.3h2.86l.5-2.32H5.99l.79-3.61-3.43 1.1-.54 2.5H.5L0 8.87h2.3l-.9 4.11c-.21.97-.4 1.89-.4 2.83C1 18.14 2.52 19 4.69 19c.54 0 1.16-.18 1.7-.3l.56-2.45a4.27 4.27 0 0 1-1.55.28c-.71 0-1.22-.44-1.22-1.18zm12.48-1.98c0-2.29 1.42-4.65 3.97-4.65.88 0 1.7.21 2.33.62l.78-2.6a11.4 11.4 0 0 0-3.19-.47c-4.4 0-7.22 3.23-7.22 7.48 0 3.14 2.04 5.24 5.2 5.24 1.05 0 2.1-.1 3.07-.57l.36-2.5c-.83.4-1.81.61-2.6.61-2.18 0-2.7-1.58-2.7-3.16zM14.5 1.31h-3.19l-.67 3.02h3.2l.66-3.02zm-4.36 5.24L7.54 18.7h3.19l2.61-12.16h-3.19zm72.06-.27c-1.43 0-2.81.26-4.17.73l-.45 2.53a9.48 9.48 0 0 1 4.02-.95c1.12 0 2.45.35 2.45 1.58 0 .36 0 .71-.1 1.04h-1.11c-3 0-7.52.3-7.52 4.32 0 2.24 1.57 3.47 3.78 3.47 1.76 0 2.86-.78 3.95-2.15h.05l-.33 1.87h2.68c.29-2.3 1.5-7.06 1.5-8.7 0-2.85-2.3-3.74-4.75-3.74zM80 16.68c-.82 0-1.62-.42-1.62-1.27 0-2.05 2.56-2.31 4.1-2.31h1.13c-.5 1.96-1.24 3.58-3.61 3.58zM71.6 6.27c-1.72 0-3.5.73-4.31 2.31h-.05c-.17-1.47-1.67-2.31-3.12-2.31-1.5 0-2.9.66-3.75 1.9h-.05l.29-1.62h-2.98l-.26 1.35-2.23 10.8h3.18l1.26-5.78c.4-1.63 1-4.2 3.16-4.2.82 0 1.5.57 1.5 1.46 0 .74-.23 1.87-.4 2.6l-1.28 5.93h3.18L67 12.92c.4-1.65.95-4.2 3.17-4.2.8 0 1.5.57 1.5 1.46 0 .74-.24 1.87-.4 2.6l-1.3 5.93h3.2l1.27-5.81c.27-1 .55-2.22.55-3.3a3.4 3.4 0 0 0-3.4-3.34z'></path>
                                </svg>
                              </div>
                              <div className=' cWeWMl'>
                                <div className='TicketTopSection__TopSectionWrapper-sc-11bz39i-0 kAoiSe snipcss-TiVaH'>
                                  <div className='TicketInfoHeader__HeaderContainer-sc-101wb79-0 ctixpn'>
                                    <h2
                                      translate='no'
                                      className='TicketInfoHeader__HeaderTitle-sc-101wb79-1 sbbQd'
                                      style={{}}
                                    >
                                      {ticket ? ticket.type : 'Boleto normal'}{' '}
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
                                <div className='sc-1wihujv-0 IATdI'>
                                  <div>
                                    <span className='VisuallyHidden-sc-8buqks-0 lmhoCy'>
                                      Código QR requerido para acceder.
                                    </span>
                                    <div
                                      id=':r2:-882325277210255536E'
                                      data-testid='barcode-container'
                                    >
                                      <div
                                        id='pseview-3763052220'
                                        className='style-bxhcO'
                                      >
                                        <div
                                          id='psetokenview-div-3763052220'
                                          className='style-ooftK'
                                        >
                                          <canvas
                                            id='psetokenview-canvas-3763052220'
                                            width={600}
                                            height={150}
                                            className='style-y7qGm style-hbhso'
                                          />
                                          <p
                                            id='psetokenview-subtitle-3763052220'
                                            className='style-QOP54'
                                          >
                                            No podrás entrar con capturas de
                                            pantalla.{' '}
                                          </p>
                                          <div
                                            id='style-vvnVH'
                                            className='style-vvnVH'
                                          >
                                            <div
                                              id='style-d2twm'
                                              className='style-d2twm'
                                            />
                                            <div
                                              id='style-wvqr2'
                                              className='style-wvqr2'
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <span
                                    data-testid='rawBarcode'
                                    className='sc-1wihujv-7 cgLgHD'
                                  >
                                    {ticket.barcode || 'BARCODE'}99080
                                  </span>
                                  <span
                                    translate='no'
                                    className='sc-1wihujv-6 kBskR'
                                  >
                                    {ticket.section} GRAL
                                  </span>
                                </div>
                                <div className='sc-qqwkxz-0 hTChRU'>
                                  <a href='#' className='sc-443kj5-0 bgZgcx'>
                                    {(() => {
                                      const browser = detectBrowser()
                                      return (
                                        <img
                                          alt={getWalletAltText(browser)}
                                          src={getWalletImage(browser)}
                                          className='sc-443kj5-1 fkNIKz'
                                        />
                                      )
                                    })()}
                                  </a>
                                </div>
                                <div className='sc-14dpb0e-8 kKcdWj'>
                                  <span className='sc-14dpb0e-3 frPlCK' />
                                </div>
                              </div>
                            </div>
                          </li>
                        ) : (
                          // Plantilla para boletos normales
                          <li
                            key={ticket.id || index}
                            className='sc-knkt5x-0 jrtQbZ sc-1gxt77a-2 tUato snipcss-2Ib6L snipcss-ZmcFP style-EQIUf'
                            id='style-EQIUf'
                          >
                            <div
                              data-testid='ticketCard'
                              className='TicketCardv2__Card-sc-1akc5v-0 kxlGTJ'
                            >
                              <div className='TicketCardv2__TicketHeaderBorderContainer-sc-1akc5v-2 kbjGha'>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  fill='#ffffff'
                                  width='100%'
                                  height='100%'
                                  viewBox='0 0 135 24'
                                  aria-hidden='true'
                                >
                                  <path d='M41.57 6.27c-4.02 0-6.97 3.63-6.97 7.4 0 3.62 2.38 5.32 5.9 5.32 1.3 0 2.66-.3 3.9-.68l.4-2.5a8.98 8.98 0 0 1-3.75.86c-2.04 0-3.23-.71-3.39-2.62l-.02-.34v-.1a6.46 6.46 0 0 1 .52-2.41c.61-1.55 1.48-2.62 3.36-2.62 1.33 0 2.02.73 2.02 2.03 0 .28-.02.54-.07.83H39.1a7.57 7.57 0 0 0-.34 2.17h7.5c.2-.9.32-1.8.32-2.72 0-3.09-2-4.62-5.02-4.62zm-5.4.28h-4.15l-4.44 4.41h-.05L29.65 1h-3.19l-3.78 17.7h3.11l1.38-6.44h.05l3.16 6.45h3.6l-3.7-6.62 5.88-5.54zm15.16 8.8a5 5 0 0 1 .15-1.18l1.16-5.3h2.86l.5-2.32h-2.86l.79-3.61-3.42 1.1-.55 2.5h-2.3l-.51 2.32h2.3l-.9 4.11c-.2.97-.4 1.89-.4 2.83 0 2.34 1.52 3.2 3.69 3.2.54 0 1.16-.18 1.7-.3l.56-2.45a4.28 4.28 0 0 1-1.55.28c-.72 0-1.22-.44-1.22-1.18zm-47.14 0c0-.47.07-.9.14-1.18l1.16-5.3h2.86l.5-2.32H5.99l.79-3.61-3.43 1.1-.54 2.5H.5L0 8.87h2.3l-.9 4.11c-.21.97-.4 1.89-.4 2.83C1 18.14 2.52 19 4.69 19c.54 0 1.16-.18 1.7-.3l.56-2.45a4.27 4.27 0 0 1-1.55.28c-.71 0-1.22-.44-1.22-1.18zm12.48-1.98c0-2.29 1.42-4.65 3.97-4.65.88 0 1.7.21 2.33.62l.78-2.6a11.4 11.4 0 0 0-3.19-.47c-4.4 0-7.22 3.23-7.22 7.48 0 3.14 2.04 5.24 5.2 5.24 1.05 0 2.1-.1 3.07-.57l.36-2.5c-.83.4-1.81.61-2.6.61-2.18 0-2.7-1.58-2.7-3.16zM14.5 1.31h-3.19l-.67 3.02h3.2l.66-3.02zm-4.36 5.24L7.54 18.7h3.19l2.61-12.16h-3.19zm72.06-.27c-1.43 0-2.81.26-4.17.73l-.45 2.53a9.48 9.48 0 0 1 4.02-.95c1.12 0 2.45.35 2.45 1.58 0 .36 0 .71-.1 1.04h-1.11c-3 0-7.52.3-7.52 4.32 0 2.24 1.57 3.47 3.78 3.47 1.76 0 2.86-.78 3.95-2.15h.05l-.33 1.87h2.68c.29-2.3 1.5-7.06 1.5-8.7 0-2.85-2.3-3.74-4.75-3.74zM80 16.68c-.82 0-1.62-.42-1.62-1.27 0-2.05 2.56-2.31 4.1-2.31h1.13c-.5 1.96-1.24 3.58-3.61 3.58zM71.6 6.27c-1.72 0-3.5.73-4.31 2.31h-.05c-.17-1.47-1.67-2.31-3.12-2.31-1.5 0-2.9.66-3.75 1.9h-.05l.29-1.62h-2.98l-.26 1.35-2.23 10.8h3.18l1.26-5.78c.4-1.63 1-4.2 3.16-4.2.82 0 1.5.57 1.5 1.46 0 .74-.23 1.87-.4 2.6l-1.28 5.93h3.18L67 12.92c.4-1.65.95-4.2 3.17-4.2.8 0 1.5.57 1.5 1.46 0 .74-.24 1.87-.4 2.6l-1.3 5.93h3.2l1.27-5.81c.27-1 .55-2.22.55-3.3a3.4 3.4 0 0 0-3.4-3.33zm41.24 0c-4.02 0-6.97 3.63-6.97 7.4 0 3.62 2.38 5.32 5.9 5.32 1.3 0 2.66-.3 3.9-.68l.4-2.5a9 9 0 0 1-3.75.86c-2.04 0-3.23-.71-3.38-2.62-.01-.12-.03-.22-.03-.34v-.1c.02-.84.2-1.66.53-2.41.6-1.55 1.47-2.62 3.35-2.62 1.33 0 2.02.73 2.02 2.03 0 .28-.02.54-.07.83h-4.36a7.57 7.57 0 0 0-.34 2.17h7.5c.2-.9.32-1.8.32-2.72 0-3.09-2-4.62-5.02-4.62zm10.18 2.57h-.05l.43-2.3h-3.05l-.28 1.64-2.19 10.53h3.19l1.14-5.46c.4-1.96 1.5-3.96 3.76-3.96.4 0 .85.07 1.2.19l.68-3.1a4.9 4.9 0 0 0-1.22-.11c-1.47 0-3.04 1.25-3.61 2.57zm-20.87 6.51c0-.47.07-.9.14-1.18l1.17-5.3h2.85l.5-2.32h-2.85l.78-3.61-3.42 1.1-.55 2.5h-2.3l-.5 2.32h2.3l-.9 4.11c-.22.97-.4 1.89-.4 2.83 0 2.34 1.52 3.2 3.68 3.2.55 0 1.17-.18 1.71-.3l.55-2.45c-.4.17-.98.28-1.55.28-.71 0-1.21-.44-1.21-1.18zm-13.31-5.21c0 3.04 4.13 3.23 4.13 5.2 0 .98-1.12 1.33-2.19 1.33a6.01 6.01 0 0 1-3.04-.94l-.7 2.53a8.8 8.8 0 0 0 3.74.73c2.74 0 5.52-.95 5.52-4.1 0-2.98-4.14-3.55-4.14-5.08 0-.97 1.19-1.23 2.14-1.23.9 0 1.79.26 2.13.44l.69-2.38a13.27 13.27 0 0 0-2.98-.37c-2.53 0-5.3 1.01-5.3 3.87zm43.23-3.86A2.74 2.74 0 0 0 129.33 9c0 1.5 1.23 2.72 2.74 2.72A2.73 2.73 0 0 0 134.81 9c0-1.5-1.23-2.72-2.74-2.72zm.01 5.04A2.23 2.23 0 0 1 129.86 9c0-1.3.95-2.31 2.22-2.31 1.26 0 2.21 1.01 2.21 2.31s-.95 2.32-2.2 2.32zm1.28-3.02c0-.6-.36-.9-1.1-.9h-1.23v3.2h.52V9.17h.44l.9 1.41h.55l-.91-1.4c.5 0 .83-.38.83-.89zm-1.81.48V7.8h.62c.34 0 .66.1.66.47 0 .41-.26.5-.66.5h-.62z'></path>
                                </svg>
                              </div>

                              <div className=' cWeWMl'>
                                <div className=' bHIhNV snipcss-W5hsS'>
                                  <div class='TicketInfoHeader__HeaderContainer-sc-101wb79-0 ctixpn'>
                                    <h2
                                      translate='no'
                                      class='TicketInfoHeader__HeaderTitle-sc-101wb79-1 sbbQd'
                                    >
                                      {ticket.type || 'Boleto Normal'}
                                    </h2>

                                    <div class='TicketInfoHeader__CtaContent-sc-101wb79-3 iNLuyq'>
                                      <button
                                        type='button'
                                        class='IconButton__Button-sc-19baojp-0 jyRnZr TicketInfoHeader__TicketInfoButton-sc-101wb79-4 LEFMQ'
                                      >
                                        <span class='VisuallyHidden-sc-8buqks-0 lmhoCy'>
                                          Información importante
                                        </span>
                                        <svg
                                          viewBox='0 0 24 25'
                                          width='1.5em'
                                          height='1.5em'
                                          aria-hidden='true'
                                          focusable='false'
                                          class='BaseSvg-sc-yh8lnd-0 InfoICircledIcon___StyledBaseSvg-sc-abq1mc-0 hNajXU'
                                        >
                                          <path d='M12 22a9.5 9.5 0 1 1 0-19 9.5 9.5 0 0 1 0 19m0 1.5a11 11 0 1 0 0-22 11 11 0 0 0 0 22 M11 6.5v2h2v-2zm.5 5v7H13V10h-2.75v1.5z' />
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                  <div className='ficefJ'>
                                    <div className='SeatInfov2__Row-sc-hzxzxj-0 hXYMZK'>
                                      <div className=' ftTdK'>
                                        <p className=' dXJLXg'>Sección</p>
                                        <p translate='no' className=' ia-dyIj'>
                                          {ticket.section || 'N/A'}
                                        </p>
                                      </div>
                                      <div className='jPmdZv'>
                                        <p className=' dXJLXg'>Fila</p>
                                        <p translate='no' className=' cRtdJv'>
                                          {ticket.row || 'N/A'}
                                        </p>
                                      </div>
                                      <div className=' dkuubl'>
                                        <p className='dXJLXg'>Asiento(s)</p>
                                        <p translate='no' className=' elGusI'>
                                          {ticket.seat || 'N/A'}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className='sc-1wihujv-0 IATdI'>
                                  <div>
                                    <span className='VisuallyHidden-sc-8buqks-0 lmhoCy'>
                                      Código QR requerido para acceder.
                                    </span>
                                    <div
                                      id=':r2:-882325277210255536E'
                                      data-testid='barcode-container'
                                    >
                                      <div
                                        id='pseview-3763052220'
                                        className='style-bxhcO'
                                      >
                                        <div
                                          id='psetokenview-div-3763052220'
                                          className='style-ooftK'
                                        >
                                          <canvas
                                            id='psetokenview-canvas-3763052220'
                                            width={600}
                                            height={150}
                                            className='style-y7qGm style-hbhso'
                                          />
                                          <p
                                            id='psetokenview-subtitle-3763052220'
                                            className='style-QOP54'
                                          >
                                            No podrás entrar con capturas de
                                            pantalla.{' '}
                                          </p>
                                          <div
                                            id='style-vvnVH'
                                            className='style-vvnVH'
                                          >
                                            <div
                                              id='style-d2twm'
                                              className='style-d2twm'
                                            />
                                            <div
                                              id='style-wvqr2'
                                              className='style-wvqr2'
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <span
                                    data-testid='rawBarcode'
                                    className='sc-1wihujv-7 cgLgHD'
                                  >
                                    {ticket.barcode || 'BARCODE'}99080
                                  </span>
                                  <span
                                    translate='no'
                                    className='sc-1wihujv-6 kBskR'
                                  >
                                    SECCION {ticket.section || 'C'}{' '}
                                  </span>
                                </div>
                                <div className='sc-qqwkxz-0 hTChRU'>
                                  <a href='#' className='sc-443kj5-0 bgZgcx'>
                                    {(() => {
                                      const browser = detectBrowser()
                                      return (
                                        <img
                                          alt={getWalletAltText(browser)}
                                          src={getWalletImage(browser)}
                                          className='sc-443kj5-1 fkNIKz'
                                        />
                                      )
                                    })()}
                                  </a>
                                </div>
                                <div className='sc-14dpb0e-8 kKcdWj'>
                                  <span className='sc-14dpb0e-3 frPlCK' />
                                </div>
                              </div>
                            </div>
                          </li>
                        )
                      )
                    ) : (
                      <li className='text-center py-8'>
                        <p className='text-gray-500'>
                          No hay boletos disponibles
                        </p>
                      </li>
                    )}
                  </ul>
                  <div aria-hidden='true' className='sc-10n2nf8-0 cDdkhf' />
                </div>
              </div>
              <div className='sc-1ncw2qp-1 fiIrVE'>
                <div className='sc-1ncw2qp-2 hPWqqR'>
                  <h2 className='sc-felor-0 eBbXFJ'>Tu Orden</h2>
                  <div className='sc-felor-1 bzjaHw'>
                    <svg
                      viewBox='0 0 24 24'
                      width='1.5em'
                      height='1.5em'
                      aria-hidden='true'
                      focusable='false'
                      className='BaseSvg-sc-yh8lnd-0 ReceiptIcon___StyledBaseSvg-sc-1yum0yn-0 hsRbmG'
                    >
                      <path d='M17.25 1H2.71L1 6.21V23h14.17L18 20.06V11.5h5V2.45L21.22 1zm0 1.5h.86l-1.6 3.77v.07h-.01v13.12l-1.97 2.04H2.5V6.45L3.8 2.5zm2.5 0h.93l.82.66V10H18V6.58zm-8.25 8.25H4v-1.5h7.5zM4 13.25h10v-1.5H4zm10 2.5H4v-1.5h10zm-10 2.5h4.5v-1.5H4z'></path>
                    </svg>
                    <div className='sc-felor-2 hHDbAn'>
                      <dl className='sc-felor-3 jQSXOQ'>
                        <div className='sc-felor-4 eIpIXQ'>
                          <dt className='sc-felor-5 gttdRG'>Orden #</dt>
                          <dd className='sc-felor-7 hPMqGp'>
                            {order?.order_number || '78-21301/MXC'}
                          </dd>
                        </div>
                        <div className='sc-felor-4 eIpIXQ'>
                          <dt className='sc-felor-5 sc-felor-6 gttdRG gPopaN'>
                            Recibo
                          </dt>
                          <dd className='sc-felor-7 hPMqGp'>
                            <a
                              href='#'
                              className='Link__StyledLink-sc-pudy0l-0 coVzbU sc-felor-8 cAmtkI'
                            >
                              Ver recibo
                            </a>
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                  <button aria-expanded='false' className='sc-o9e248-0 cbFClR'>
                    ¿Necesitas ayuda con esta compra?
                    <span className='sc-o9e248-1 fliJZG'>
                      <svg
                        viewBox='0 0 24 24'
                        width='1.5em'
                        height='1.5em'
                        aria-hidden='true'
                        focusable='false'
                        className='BaseSvg-sc-yh8lnd-0 QuestionMarkCutCornerFilledIcon___StyledBaseSvg-sc-1iexa2z-0 ckLyyv'
                      >
                        <path d='M1 1h22v16.31L17.31 23H1z M12.25 8a1 1 0 0 1 .24.02q.27.04.58.17.3.12.48.35c.1.15.2.36.2.71 0 .67-.34 1.08-.92 1.79l-.04.05a4.7 4.7 0 0 0-1.29 3.16H13c0-.98.41-1.55.96-2.21q.05-.08.1-.14c.52-.62 1.19-1.43 1.19-2.65q-.02-.98-.5-1.6c-.31-.42-.7-.67-1.07-.84a4 4 0 0 0-1.38-.3l-.03-.01h-.04a2 2 0 0 0-.14 0 4 4 0 0 0-1.43.4c-.4.2-.82.5-1.14.99q-.5.73-.52 1.86h1.5c0-.5.12-.81.26-1.03q.23-.32.58-.49a2 2 0 0 1 .9-.23zm-.75 7.5V17H13v-1.5z'></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

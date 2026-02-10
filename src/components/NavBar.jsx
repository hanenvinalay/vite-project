import React, { useState } from 'react'
import {
  TicketIcon,
  ProfileIcon,
  SettingsIcon,
  HelpMe,
  LogoutIcon
} from './IconsSvg'
const user = JSON.parse(localStorage.getItem('user') || 'null')
const Chevron = ({ rotated }) => (
  <svg
    className='BaseSvg-sc-yh8lnd-0 ChevronIcon___StyledBaseSvg-sc-1y4em6t-0 ckLyyv sc-e6660eb6-6 jElsmp'
    viewBox='0 0 24 24'
    width='1.5em'
    height='1.5em'
    aria-hidden='true'
    focusable='false'
    style={{
      transition: 'transform 0.3s',
      transform: rotated ? 'rotate(180deg)' : 'rotate(0deg)'
    }}
  >
    <path d='M3.47 8.26 4.53 7.2 12 14.67l7.47-7.47 1.06 1.06L12 16.8z' />
  </svg>
)

export function AccordionList () {
  const [openIndex, setOpenIndex] = useState(null)

  const data = [
    {
      title: 'Mis boletos',
      icon: <TicketIcon />,
      content: (
        <ul role='list' className='UnstyledList-sc-ix96mm-0 ekOJfs'>
          <li role='listitem'>
            <a
              aria-current='false'
              className='sc-b78ef1b0-1 giEdKV sc-e6660eb6-9 jJLsup'
              href='/user/orders'
            >
              <div className='sc-e6660eb6-10 bXxjuf'>Ver próximos eventos</div>
            </a>
          </li>
          <li role='listitem'>
            <a
              aria-current='false'
              className='sc-b78ef1b0-1 giEdKV sc-e6660eb6-9 jJLsup'
              href='/user/orders/past-events'
            >
              <div className='sc-e6660eb6-10 bXxjuf'>Ver eventos pasados</div>
            </a>
          </li>
        </ul>
      )
    },
    {
      title: 'Mi perfil',
      icon: <ProfileIcon />,
      content: (
        <div className='sc-e6660eb6-8 eAEVlv'>
          <ul role='list' className='UnstyledList-sc-ix96mm-0 ekOJfs'>
            <li role='listitem'>
              <a
                aria-current='false'
                data-testid='profileDetails'
                className='sc-b78ef1b0-1 giEdKV sc-e6660eb6-9 jJLsup'
                href='https://my.ticketmaster.com.mx/settings?lang=es-mx'
              >
                <div className='sc-e6660eb6-10 bXxjuf'>Detalles del perfil</div>
              </a>
            </li>
            <li role='listitem'>
              <a
                aria-current='false'
                data-testid='editBillingInformation'
                className='sc-b78ef1b0-1 giEdKV sc-e6660eb6-9 jJLsup'
                href='/member/edit_billing?tm_link=mytm_myacct_BillingInfo'
              >
                <div className='sc-e6660eb6-10 bXxjuf'>
                  Editar información de facturación
                </div>
              </a>
            </li>
            <li role='listitem'>
              <a
                aria-current='false'
                data-testid='giftCardBalance'
                className='sc-b78ef1b0-1 giEdKV sc-e6660eb6-9 jJLsup'
                href='/giftcards/balance_inquiry'
              >
                <div className='sc-e6660eb6-10 bXxjuf'>
                  Ver el saldo de la Tarjeta de Regalo
                </div>
              </a>
            </li>
          </ul>
        </div>
      )
    },
    {
      title: 'Mi configuración',
      icon: <SettingsIcon />,
      content: (
        <div className='sc-e6660eb6-8 eAEVlv'>
          <ul role='list' className='UnstyledList-sc-ix96mm-0 ekOJfs'>
            <li role='listitem'>
              <a
                aria-current='false'
                data-testid='manageAlerts'
                className='sc-b78ef1b0-1 giEdKV sc-e6660eb6-9 jJLsup'
                href='https://my.ticketmaster.com.mx/settings/subscriptions?lang=es-mx'
              >
                <div className='sc-e6660eb6-10 bXxjuf'>Administrar alertas</div>
              </a>
            </li>
            <li role='listitem'>
              <a
                aria-current='false'
                data-testid='managePreferences'
                className='sc-b78ef1b0-1 giEdKV sc-e6660eb6-9 jJLsup'
                href='/member/edit_categories?tm_link=mytm_myacct_UpdateEventCategories'
              >
                <div className='sc-e6660eb6-10 bXxjuf'>
                  Cambiar Preferencias
                </div>
              </a>
            </li>
          </ul>
        </div>
      )
    }
  ]

  return (
    <nav aria-label='Cuenta' className='sc-3aee2bbf-0 eKzqlE snipcss-RbyUz'>
      {data.map((item, idx) => (
        <Accordion
          key={item.title}
          title={item.title}
          icon={item.icon}
          open={openIndex === idx}
          onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
        >
          {item.content}
        </Accordion>
      ))}
      <div className='sc-3aee2bbf-2 sc-3aee2bbf-5 ggLmlG daFEOE'>
        <button
          aria-expanded='false'
          className='sc-3aee2bbf-3 sc-3aee2bbf-6 jpmNtL cLknFw'
        >
          <svg
            className='BaseSvg-sc-yh8lnd-0 QuestionMarkCutCornerIcon___StyledBaseSvg-sc-16zdarm-0 ckLyyv sc-3aee2bbf-7 jhgyFk'
            viewBox='0 0 24 24'
            width='1.5em'
            height='1.5em'
            aria-hidden='true'
            focusable='false'
          >
            <path d='M12.25 8a1 1 0 0 1 .24.02q.27.04.58.17.3.12.48.35c.1.15.2.36.2.71 0 .67-.34 1.08-.92 1.79l-.04.05a4.7 4.7 0 0 0-1.29 3.16H13c0-.98.41-1.55.96-2.21q.05-.08.1-.14c.52-.62 1.19-1.43 1.19-2.65q-.02-.98-.5-1.6c-.31-.42-.7-.67-1.07-.84a4 4 0 0 0-1.38-.3l-.03-.01h-.01q0 0-.01 0h-.02a2 2 0 0 0-.14 0 4 4 0 0 0-1.43.4c-.4.2-.82.5-1.14.99q-.5.73-.52 1.86h1.5c0-.5.12-.81.26-1.03q.23-.32.58-.49a2 2 0 0 1 .9-.23zm-.75 7.5V17H13v-1.5z M1 1h22v16.31L17.31 23H1zm1.5 1.5v19h14.19l4.81-4.81V2.5z' />
          </svg>{' '}
          ¿Necesitas ayuda?
        </button>
      </div>
      <div className='sc-3aee2bbf-2 ggLmlG'>
        {localStorage.getItem('token') ? (
          <button
            className='sc-3aee2bbf-3 jpmNtL'
            onClick={() => {
              localStorage.removeItem('token')
              window.location.reload()
            }}
          >
            <svg
              className='BaseSvg-sc-yh8lnd-0 ExitIcon___StyledBaseSvg-sc-1sra210-0 ckLyyv sc-3aee2bbf-4 kXpFbX'
              viewBox='0 0 24 24'
              width='1.5em'
              height='1.5em'
              aria-hidden='true'
              focusable='false'
            >
              <path d='M15.13 1H1v22h10.98l3.15-3.23V15h-1.5v4.16l-2.29 2.34H2.5v-19h11.13V9h1.5zm3.4 6.47L23.06 12l-4.53 4.53-1.06-1.06 2.72-2.72H9v-1.5h11.19l-2.72-2.72z' />
            </svg>{' '}
            Cerrar sesión
          </button>
        ) : (
          <a href='/auth' className='sc-3aee2bbf-3 jpmNtL'>
            <svg
              className='BaseSvg-sc-yh8lnd-0 ExitIcon___StyledBaseSvg-sc-1sra210-0 ckLyyv sc-3aee2bbf-4 kXpFbX'
              viewBox='0 0 24 24'
              width='1.5em'
              height='1.5em'
              aria-hidden='true'
              focusable='false'
            >
              <path d='M15.13 1H1v22h10.98l3.15-3.23V15h-1.5v4.16l-2.29 2.34H2.5v-19h11.13V9h1.5zm3.4 6.47L23.06 12l-4.53 4.53-1.06-1.06 2.72-2.72H9v-1.5h11.19l-2.72-2.72z' />
            </svg>{' '}
            Cerrar sesión
          </a>
        )}
      </div>
    </nav>
  )
}

export function AccordionLat () {
  const [openIndex, setOpenIndex] = useState(null)

  // Si el usuario no está autenticado, no mostramos nada
  if (!user) return null

  const data = [
    {
      title: 'Mis boletos',
      icon: <TicketIcon />,
      content: (
        <ul role='list' className='UnstyledList-sc-ix96mm-0 ekOJfs'>
          <li role='listitem'>
            <a
              aria-current='false'
              className='sc-b78ef1b0-1 giEdKV sc-e6660eb6-9 jJLsup'
              href='/user/orders'
            >
              <div className='sc-e6660eb6-10 bXxjuf'>Ver próximos eventos</div>
            </a>
          </li>
          <li role='listitem'>
            <a
              aria-current='false'
              className='sc-b78ef1b0-1 giEdKV sc-e6660eb6-9 jJLsup'
              href='/user/orders/past-events'
            >
              <div className='sc-e6660eb6-10 bXxjuf'>Ver eventos pasados</div>
            </a>
          </li>
        </ul>
      )
    },
    {
      title: 'Mi perfil',
      icon: <ProfileIcon />,
      content: (
        <div className='sc-e6660eb6-8 eAEVlv'>
          <ul role='list' className='UnstyledList-sc-ix96mm-0 ekOJfs'>
            <li role='listitem'>
              <a
                aria-current='false'
                data-testid='profileDetails'
                className='sc-b78ef1b0-1 giEdKV sc-e6660eb6-9 jJLsup'
                href='https://my.ticketmaster.com.mx/settings?lang=es-mx'
              >
                <div className='sc-e6660eb6-10 bXxjuf'>Detalles del perfil</div>
              </a>
            </li>
            <li role='listitem'>
              <a
                aria-current='false'
                data-testid='editBillingInformation'
                className='sc-b78ef1b0-1 giEdKV sc-e6660eb6-9 jJLsup'
                href='/member/edit_billing?tm_link=mytm_myacct_BillingInfo'
              >
                <div className='sc-e6660eb6-10 bXxjuf'>
                  Editar información de facturación
                </div>
              </a>
            </li>
            <li role='listitem'>
              <a
                aria-current='false'
                data-testid='giftCardBalance'
                className='sc-b78ef1b0-1 giEdKV sc-e6660eb6-9 jJLsup'
                href='/giftcards/balance_inquiry'
              >
                <div className='sc-e6660eb6-10 bXxjuf'>
                  Ver el saldo de la Tarjeta de Regalo
                </div>
              </a>
            </li>
          </ul>
        </div>
      )
    },
    {
      title: 'Mi configuración',
      icon: <SettingsIcon />,
      content: (
        <div className='sc-e6660eb6-8 eAEVlv'>
          <ul role='list' className='UnstyledList-sc-ix96mm-0 ekOJfs'>
            <li role='listitem'>
              <a
                aria-current='false'
                data-testid='manageAlerts'
                className='sc-b78ef1b0-1 giEdKV sc-e6660eb6-9 jJLsup'
                href='https://my.ticketmaster.com.mx/settings/subscriptions?lang=es-mx'
              >
                <div className='sc-e6660eb6-10 bXxjuf'>Administrar alertas</div>
              </a>
            </li>
            <li role='listitem'>
              <a
                aria-current='false'
                data-testid='managePreferences'
                className='sc-b78ef1b0-1 giEdKV sc-e6660eb6-9 jJLsup'
                href='/member/edit_categories?tm_link=mytm_myacct_UpdateEventCategories'
              >
                <div className='sc-e6660eb6-10 bXxjuf'>
                  Cambiar Preferencias
                </div>
              </a>
            </li>
          </ul>
        </div>
      )
    }
  ]

  return (
    <nav aria-label='Cuenta' className='sc-3aee2bbf-0 eKzqlE snipcss-RbyUz'>
      {data.map((item, idx) => (
        <Accordion
          key={item.title}
          title={item.title}
          icon={item.icon}
          open={openIndex === idx}
          onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
        >
          {item.content}
        </Accordion>
      ))}
      <div className='sc-3aee2bbf-2 sc-3aee2bbf-5 ggLmlG daFEOE'>
        <button
          aria-expanded='false'
          className='sc-3aee2bbf-3 sc-3aee2bbf-6 jpmNtL cLknFw'
        >
          <svg
            className='BaseSvg-sc-yh8lnd-0 QuestionMarkCutCornerIcon___StyledBaseSvg-sc-16zdarm-0 ckLyyv sc-3aee2bbf-7 jhgyFk'
            viewBox='0 0 24 24'
            width='1.5em'
            height='1.5em'
            aria-hidden='true'
            focusable='false'
          >
            <path d='M12.25 8a1 1 0 0 1 .24.02q.27.04.58.17.3.12.48.35c.1.15.2.36.2.71 0 .67-.34 1.08-.92 1.79l-.04.05a4.7 4.7 0 0 0-1.29 3.16H13c0-.98.41-1.55.96-2.21q.05-.08.1-.14c.52-.62 1.19-1.43 1.19-2.65q-.02-.98-.5-1.6c-.31-.42-.7-.67-1.07-.84a4 4 0 0 0-1.38-.3l-.03-.01h-.01q0 0-.01 0h-.02a2 2 0 0 0-.14 0 4 4 0 0 0-1.43.4c-.4.2-.82.5-1.14.99q-.5.73-.52 1.86h1.5c0-.5.12-.81.26-1.03q.23-.32.58-.49a2 2 0 0 1 .9-.23zm-.75 7.5V17H13v-1.5z M1 1h22v16.31L17.31 23H1zm1.5 1.5v19h14.19l4.81-4.81V2.5z' />
          </svg>{' '}
          ¿Necesitas ayuda?
        </button>
      </div>
      <div className='sc-3aee2bbf-2 ggLmlG'>
        {localStorage.getItem('token') ? (
          <button
            className='sc-3aee2bbf-3 jpmNtL'
            onClick={() => {
              localStorage.removeItem('token')
              window.location.reload()
            }}
          >
            <svg
              className='BaseSvg-sc-yh8lnd-0 ExitIcon___StyledBaseSvg-sc-1sra210-0 ckLyyv sc-3aee2bbf-4 kXpFbX'
              viewBox='0 0 24 24'
              width='1.5em'
              height='1.5em'
              aria-hidden='true'
              focusable='false'
            >
              <path d='M15.13 1H1v22h10.98l3.15-3.23V15h-1.5v4.16l-2.29 2.34H2.5v-19h11.13V9h1.5zm3.4 6.47L23.06 12l-4.53 4.53-1.06-1.06 2.72-2.72H9v-1.5h11.19l-2.72-2.72z' />
            </svg>{' '}
            Cerrar sesión
          </button>
        ) : (
          <a href='/auth' className='sc-3aee2bbf-3 jpmNtL'>
            <svg
              className='BaseSvg-sc-yh8lnd-0 ExitIcon___StyledBaseSvg-sc-1sra210-0 ckLyyv sc-3aee2bbf-4 kXpFbX'
              viewBox='0 0 24 24'
              width='1.5em'
              height='1.5em'
              aria-hidden='true'
              focusable='false'
            >
              <path d='M15.13 1H1v22h10.98l3.15-3.23V15h-1.5v4.16l-2.29 2.34H2.5v-19h11.13V9h1.5zm3.4 6.47L23.06 12l-4.53 4.53-1.06-1.06 2.72-2.72H9v-1.5h11.19l-2.72-2.72z' />
            </svg>{' '}
            Cerrar sesión
          </a>
        )}
      </div>
    </nav>
  )
}
export function Accordion ({ title, icon, open, onClick, children }) {
  return (
    <div className='sc-e6660eb6-0 PmMia sc-3aee2bbf-1 kTININ snipcss0-5-84-116'>
      <button
        className='sc-e6660eb6-1 ZfQAi snipcss0-6-99-100'
        onClick={onClick}
        aria-expanded={open}
        type='button'
      >
        <div className='sc-e6660eb6-2 hhlQrE snipcss0-7-100-101'>{icon}</div>
        <span className='sc-e6660eb6-4 hMfwwk snipcss0-7-100-103'>{title}</span>
        <Chevron rotated={open} />
      </button>
      <div
        className='accordion-panel sc-e6660eb6-8 cTEibo snipcss0-6-116-122'
        style={{
          maxHeight: open ? 400 : 0,
          overflow: 'hidden',
          background: '#fff',
          transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)'
        }}
      >
        <div
          style={{
            padding: open ? '16px' : '0 16px',
            opacity: open ? 1 : 0,
            transition: 'opacity 0.3s'
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
import './ContentFooter.css'
import js from '@eslint/js'

export function ContentFooter () {
  return (
    <footer
      aria-label='Footer de navegación Ticketmaster'
      className='sc-75d02ffe-1 foGwOq snipcss-b663T'
    >
      <div className='sc-75d02ffe-2 evdCpQ'>
        <div className='sc-75d02ffe-3 jnzhWU'>
          <div className='sc-75d02ffe-4 dMaXer'>
            <svg
              className='sc-75d02ffe-0 hHqwdi'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 135 24'
              fill='#fff'
              height='100%'
            >
              <path d='M41.57 6.27c-4.02 0-6.97 3.63-6.97 7.4 0 3.62 2.38 5.32 5.9 5.32 1.3 0 2.66-.3 3.9-.68l.4-2.5a8.98 8.98 0 0 1-3.75.86c-2.04 0-3.23-.71-3.39-2.62l-.02-.34v-.1a6.46 6.46 0 0 1 .52-2.41c.61-1.55 1.48-2.62 3.36-2.62 1.33 0 2.02.73 2.02 2.03 0 .28-.02.54-.07.83H39.1a7.57 7.57 0 0 0-.34 2.17h7.5c.2-.9.32-1.8.32-2.72 0-3.09-2-4.62-5.02-4.62zm-5.4.28h-4.15l-4.44 4.41h-.05L29.65 1h-3.19l-3.78 17.7h3.11l1.38-6.44h.05l3.16 6.45h3.6l-3.7-6.62 5.88-5.54zm15.16 8.8a5 5 0 0 1 .15-1.18l1.16-5.3h2.86l.5-2.32h-2.86l.79-3.61-3.42 1.1-.55 2.5h-2.3l-.51 2.32h2.3l-.9 4.11c-.2.97-.4 1.89-.4 2.83 0 2.34 1.52 3.2 3.69 3.2.54 0 1.16-.18 1.7-.3l.56-2.45a4.28 4.28 0 0 1-1.55.28c-.72 0-1.22-.44-1.22-1.18zm-47.14 0c0-.47.07-.9.14-1.18l1.16-5.3h2.86l.5-2.32H5.99l.79-3.61-3.43 1.1-.54 2.5H.5L0 8.87h2.3l-.9 4.11c-.21.97-.4 1.89-.4 2.83C1 18.14 2.52 19 4.69 19c.54 0 1.16-.18 1.7-.3l.56-2.45a4.27 4.27 0 0 1-1.55.28c-.71 0-1.22-.44-1.22-1.18zm12.48-1.98c0-2.29 1.42-4.65 3.97-4.65.88 0 1.7.21 2.33.62l.78-2.6a11.4 11.4 0 0 0-3.19-.47c-4.4 0-7.22 3.23-7.22 7.48 0 3.14 2.04 5.24 5.2 5.24 1.05 0 2.1-.1 3.07-.57l.36-2.5c-.83.4-1.81.61-2.6.61-2.18 0-2.7-1.58-2.7-3.16zM14.5 1.31h-3.19l-.67 3.02h3.2l.66-3.02zm-4.36 5.24L7.54 18.7h3.19l2.61-12.16h-3.19zm72.06-.27c-1.43 0-2.81.26-4.17.73l-.45 2.53a9.48 9.48 0 0 1 4.02-.95c1.12 0 2.45.35 2.45 1.58 0 .36 0 .71-.1 1.04h-1.11c-3 0-7.52.3-7.52 4.32 0 2.24 1.57 3.47 3.78 3.47 1.76 0 2.86-.78 3.95-2.15h.05l-.33 1.87h2.68c.29-2.3 1.5-7.06 1.5-8.7 0-2.85-2.3-3.74-4.75-3.74zM80 16.68c-.82 0-1.62-.42-1.62-1.27 0-2.05 2.56-2.31 4.1-2.31h1.13c-.5 1.96-1.24 3.58-3.61 3.58zM71.6 6.27c-1.72 0-3.5.73-4.31 2.31h-.05c-.17-1.47-1.67-2.31-3.12-2.31-1.5 0-2.9.66-3.75 1.9h-.05l.29-1.62h-2.98l-.26 1.35-2.23 10.8h3.18l1.26-5.78c.4-1.63 1-4.2 3.16-4.2.82 0 1.5.57 1.5 1.46 0 .74-.23 1.87-.4 2.6l-1.28 5.93h3.18L67 12.92c.4-1.65.95-4.2 3.17-4.2.8 0 1.5.57 1.5 1.46 0 .74-.24 1.87-.4 2.6l-1.3 5.93h3.2l1.27-5.81c.27-1 .55-2.22.55-3.3a3.4 3.4 0 0 0-3.4-3.33zm41.24 0c-4.02 0-6.97 3.63-6.97 7.4 0 3.62 2.38 5.32 5.9 5.32 1.3 0 2.66-.3 3.9-.68l.4-2.5a9 9 0 0 1-3.75.86c-2.04 0-3.23-.71-3.38-2.62-.01-.12-.03-.22-.03-.34v-.1c.02-.84.2-1.66.53-2.41.6-1.55 1.47-2.62 3.35-2.62 1.33 0 2.02.73 2.02 2.03 0 .28-.02.54-.07.83h-4.36a7.57 7.57 0 0 0-.34 2.17h7.5c.2-.9.32-1.8.32-2.72 0-3.09-2-4.62-5.02-4.62zm10.18 2.57h-.05l.43-2.3h-3.05l-.28 1.64-2.19 10.53h3.19l1.14-5.46c.4-1.96 1.5-3.96 3.76-3.96.4 0 .85.07 1.2.19l.68-3.1a4.9 4.9 0 0 0-1.22-.11c-1.47 0-3.04 1.25-3.61 2.57zm-20.87 6.51c0-.47.07-.9.14-1.18l1.17-5.3h2.85l.5-2.32h-2.85l.78-3.61-3.42 1.1-.55 2.5h-2.3l-.5 2.32h2.3l-.9 4.11c-.22.97-.4 1.89-.4 2.83 0 2.34 1.52 3.2 3.68 3.2.55 0 1.17-.18 1.71-.3l.55-2.45c-.4.17-.98.28-1.55.28-.71 0-1.21-.44-1.21-1.18zm-13.31-5.21c0 3.04 4.13 3.23 4.13 5.2 0 .98-1.12 1.33-2.19 1.33a6.01 6.01 0 0 1-3.04-.94l-.7 2.53a8.8 8.8 0 0 0 3.74.73c2.74 0 5.52-.95 5.52-4.1 0-2.98-4.14-3.55-4.14-5.08 0-.97 1.19-1.23 2.14-1.23.9 0 1.79.26 2.13.44l.69-2.38a13.27 13.27 0 0 0-2.98-.37c-2.53 0-5.3 1.01-5.3 3.87zm43.23-3.86A2.74 2.74 0 0 0 129.33 9c0 1.5 1.23 2.72 2.74 2.72A2.73 2.73 0 0 0 134.81 9c0-1.5-1.23-2.72-2.74-2.72zm.01 5.04A2.23 2.23 0 0 1 129.86 9c0-1.3.95-2.31 2.22-2.31 1.26 0 2.21 1.01 2.21 2.31s-.95 2.32-2.2 2.32zm1.28-3.02c0-.6-.36-.9-1.1-.9h-1.23v3.2h.52V9.17h.44l.9 1.41h.55l-.91-1.4c.5 0 .83-.38.83-.89zm-1.81.48V7.8h.62c.34 0 .66.1.66.47 0 .41-.26.5-.66.5h-.62z' />
            </svg>
            <span className='VisuallyHidden-sc-8buqks-0 lmhoCy'>
              Logo de Ticketmaster
            </span>
            <div className='sc-6eb17e37-0 bGosfa'>
              <h2 className='sc-6eb17e37-1 cOwoaK'>Vamos a conectarnos</h2>
            </div>
            <div className='sc-6eb17e37-0 bGosfa'>
              <h2 className='sc-6eb17e37-1 cOwoaK'></h2>
              <ul
                role='list'
                className='UnstyledList-sc-ix96mm-0 sc-6eb17e37-2 ekOJfs iUpJNd'
              ></ul>
            </div>
            <p className='sc-933023be-0 kOntPy'>
              Al continuar en esta página, usted acuerda regirse por nuestros{' '}
              <a
                href='https://help.ticketmaster.com.mx/hc/es-mx/articles/12682192759825-Condiciones-de-Uso'
                className='sc-933023be-1 hoFFTv'
              >
                Términos de uso.
              </a>
            </p>
            <div id='teconsent' />
          </div>
          <div className='sc-75d02ffe-5 etBAUA'>
            <div className='sc-727035ce-0 kMNMDr'>
              <div className='sc-727035ce-1 jCiDFM'>
                <h2 className='sc-727035ce-2 dGntTN'>Ayuda</h2>
                <div className='sc-727035ce-5 dxLznb'>
                  <ul
                    data-testid='footer-link-content'
                    role='list'
                    className='UnstyledList-sc-ix96mm-0 sc-727035ce-6 ekOJfs gvXrga'
                  >
                    <li role='listitem'>
                      <a
                        href='https://help.ticketmaster.com.mx/hc/es-mx'
                        className='sc-727035ce-7 cUEHXy'
                      >
                        Centro de Ayuda
                      </a>
                    </li>
                    <li role='listitem'>
                      <a
                        href='https://help.ticketmaster.com.mx/hc/es-mx/articles/7003373287569--Como-contactarnos-'
                        className='sc-727035ce-7 cUEHXy'
                      >
                        Contáctanos
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='sc-727035ce-1 jCiDFM'>
                <h2 className='sc-727035ce-2 dGntTN'>Nuestra red</h2>
                <div className='sc-727035ce-5 dxLznb'>
                  <ul
                    data-testid='footer-link-content'
                    role='list'
                    className='UnstyledList-sc-ix96mm-0 sc-727035ce-6 ekOJfs gvXrga'
                  >
                    <li role='listitem'>
                      <a
                        href='https://www.cie.com.mx/'
                        className='sc-727035ce-7 cUEHXy'
                      >
                        CIE
                      </a>
                    </li>
                    <li role='listitem'>
                      <a
                        href='https://www.ocesa.com.mx/nosotros'
                        className='sc-727035ce-7 cUEHXy'
                      >
                        OCESA
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='sc-727035ce-1 jCiDFM'>
                <h2 className='sc-727035ce-2 dGntTN'>Estamos para ayudarte</h2>
                <div className='sc-727035ce-5 dxLznb'>
                  <ul
                    data-testid='footer-link-content'
                    role='list'
                    className='UnstyledList-sc-ix96mm-0 sc-727035ce-6 ekOJfs gvXrga'
                  >
                    <li role='listitem'>
                      <a
                        href='https://my.ticketmaster.com.mx/settings'
                        className='sc-727035ce-7 cUEHXy'
                      >
                        Mi cuenta
                      </a>
                    </li>
                    <li role='listitem'>
                      <a
                        href='https://guias.ticketmaster.com.mx/centros-ticketmaster/'
                        className='sc-727035ce-7 cUEHXy'
                      >
                        Centros Ticketmaster
                      </a>
                    </li>
                    <li role='listitem'>
                      <a
                        href='https://help.ticketmaster.com.mx/hc/es-mx/articles/6121565057553-Pol%C3%ADtica-de-compra-y-cancelaci%C3%B3n-48hrs-'
                        className='sc-727035ce-7 cUEHXy'
                      >
                        Política de reembolso y cancelación
                      </a>
                    </li>
                    <li role='listitem'>
                      <a
                        href='http://solicitudes.ticketmaster.com.mx/facturacion/'
                        className='sc-727035ce-7 cUEHXy'
                      >
                        Facturación
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='sc-727035ce-1 jCiDFM'>
                <h2 className='sc-727035ce-2 dGntTN'>Únete</h2>
                <div className='sc-727035ce-5 dxLznb'>
                  <ul
                    data-testid='footer-link-content'
                    role='list'
                    className='UnstyledList-sc-ix96mm-0 sc-727035ce-6 ekOJfs gvXrga'
                  >
                    <li role='listitem'>
                      <a
                        href='https://business.ticketmaster.com.mx/contactenos/'
                        className='sc-727035ce-7 cUEHXy'
                      >
                        Vende tu evento con nosotros
                      </a>
                    </li>
                    <li role='listitem'>
                      <a
                        href='http://tmespeciales.ticketmaster.com.mx/empleos/'
                        className='sc-727035ce-7 cUEHXy'
                      >
                        Trabaja con nosotros
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='sc-727035ce-1 jCiDFM'>
                <h2 className='sc-727035ce-2 dGntTN'>Empresa</h2>
                <div className='sc-727035ce-5 dxLznb'>
                  <ul
                    data-testid='footer-link-content'
                    role='list'
                    className='UnstyledList-sc-ix96mm-0 sc-727035ce-6 ekOJfs gvXrga'
                  >
                    <li role='listitem'>
                      <a
                        href='https://www.ticketmaster.com.mx/h/about_us.html?lang=es-mx'
                        className='sc-727035ce-7 cUEHXy'
                      >
                        Quiénes somos
                      </a>
                    </li>
                    <li role='listitem'>
                      <a
                        href='https://www.ticketmaster.com.mx/international?'
                        className='sc-727035ce-7 cUEHXy'
                      >
                        Ticketmaster Internacional
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='sc-e34bdbc3-0 fMDRDT'>
        <hr className='sc-e34bdbc3-1 eSItNK' />
        <ul
          className='UnstyledList-sc-ix96mm-0 sc-36e417dd-0 ekOJfs kaJEHw sc-e34bdbc3-2 ichTFu'
          role='list'
        >
          <li role='listitem' className='sc-36e417dd-1 ggluQf'>
            <a
              href='https://help.ticketmaster.com.mx/hc/es-mx/articles/6120032009745-Pol%C3%ADtica-de-compra'
              className='bdBlHa'
            >
              Política de Compra
            </a>
          </li>
          <li role='listitem' className='sc-36e417dd-1 ggluQf'>
            <a
              href='https://privacy.ticketmaster.com.mx/es/privacy-policy'
              className='  bdBlHa'
            >
              Aviso de Privacidad
            </a>
          </li>
          <li role='listitem' className='sc-36e417dd-1 ggluQf'>
            <a
              href='https://privacy.ticketmaster.com.mx/es/cookie-policy'
              className='  bdBlHa'
            >
              Política de Cookies
            </a>
          </li>
          <li role='listitem' className='sc-36e417dd-1 ggluQf'>
            <a
              href='https://help.ticketmaster.com.mx/hc/es-mx/articles/12682738337041-Compromisos-con-COFECE'
              className=' bdBlHa'
            >
              Compromisos con COFECE
            </a>
          </li>
        </ul>
        <p className='sc-b40ad97a-0 dxxQgC sc-e34bdbc3-3 dqqzbT'>
          © 1999-2025 Ticketmaster. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
export function AccordionListPanel () {
  const [openIndex, setOpenIndex] = useState(null)

  const data = [
    {
      title: 'Mis boletos',
      icon: <TicketIcon />,
      content: (
        <ul role='list' className='UnstyledList-sc-ix96mm-0 ekOJfs'>
          <li role='listitem'>
            <a
              aria-current='false'
              className='sc-b78ef1b0-1 giEdKV sc-e6660eb6-9 jJLsup'
              href='/user/orders'
            >
              <div className='sc-e6660eb6-10 bXxjuf'>Ver próximos eventos</div>
            </a>
          </li>
          <li role='listitem'>
            <a
              aria-current='false'
              className='sc-b78ef1b0-1 giEdKV sc-e6660eb6-9 jJLsup'
              href='/user/orders/past-events'
            >
              <div className='sc-e6660eb6-10 bXxjuf'>Ver eventos pasados</div>
            </a>
          </li>
        </ul>
      )
    },
    {
      title: 'Mi perfil',
      icon: <ProfileIcon />,
      content: (
        <div className='sc-e6660eb6-8 eAEVlv'>
          <ul role='list' className='UnstyledList-sc-ix96mm-0 ekOJfs'>
            <li role='listitem'>
              <a
                aria-current='false'
                data-testid='profileDetails'
                className='sc-b78ef1b0-1 giEdKV sc-e6660eb6-9 jJLsup'
                href='https://my.ticketmaster.com.mx/settings?lang=es-mx'
              >
                <div className='sc-e6660eb6-10 bXxjuf'>Detalles del perfil</div>
              </a>
            </li>
            <li role='listitem'>
              <a
                aria-current='false'
                data-testid='editBillingInformation'
                className='sc-b78ef1b0-1 giEdKV sc-e6660eb6-9 jJLsup'
                href='/member/edit_billing?tm_link=mytm_myacct_BillingInfo'
              >
                <div className='sc-e6660eb6-10 bXxjuf'>
                  Editar información de facturación
                </div>
              </a>
            </li>
            <li role='listitem'>
              <a
                aria-current='false'
                data-testid='giftCardBalance'
                className='sc-b78ef1b0-1 giEdKV sc-e6660eb6-9 jJLsup'
                href='/giftcards/balance_inquiry'
              >
                <div className='sc-e6660eb6-10 bXxjuf'>
                  Ver el saldo de la Tarjeta de Regalo
                </div>
              </a>
            </li>
          </ul>
        </div>
      )
    },
    {
      title: 'Mi configuración',
      icon: <SettingsIcon />,
      content: (
        <div className='sc-e6660eb6-8 eAEVlv'>
          <ul role='list' className='UnstyledList-sc-ix96mm-0 ekOJfs'>
            <li role='listitem'>
              <a
                aria-current='false'
                data-testid='manageAlerts'
                className='sc-b78ef1b0-1 giEdKV sc-e6660eb6-9 jJLsup'
                href='https://my.ticketmaster.com.mx/settings/subscriptions?lang=es-mx'
              >
                <div className='sc-e6660eb6-10 bXxjuf'>Administrar alertas</div>
              </a>
            </li>
            <li role='listitem'>
              <a
                aria-current='false'
                data-testid='managePreferences'
                className='sc-b78ef1b0-1 giEdKV sc-e6660eb6-9 jJLsup'
                href='/member/edit_categories?tm_link=mytm_myacct_UpdateEventCategories'
              >
                <div className='sc-e6660eb6-10 bXxjuf'>
                  Cambiar Preferencias
                </div>
              </a>
            </li>
          </ul>
        </div>
      )
    }
  ]

  return (
    <nav aria-label='Cuenta' className='sc-3aee2bbf-0 eKzqlE snipcss-RbyUz'>
      {user && (
<div className="sc-8486e8e9-0 jNtKcj sc-b7d876d8-8 jYKxSI" >
  <p className="sc-8486e8e9-1 fmiwWm" style={{display: 'flex' , flexDirection: 'column'}}>
    <span className="sc-8486e8e9-2 bPQSHE">¡Bienvenido de vuelta!</span>{" "}
    <span data-cs-mask="true" style={{fontSize :'20px', fontWeight:'600'}} className="sc-8486e8e9-3 dCNtGc">
      {user.name}
    </span>
  </p>
</div>
      )}

      {data.map((item, idx) => (
        <Accordion
          key={item.title}
          title={item.title}
          icon={item.icon}
          open={openIndex === idx}
          onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
        >
          {item.content}
        </Accordion>
      ))}
      <div className='sc-3aee2bbf-2 sc-3aee2bbf-5 ggLmlG daFEOE'>
        <button
          aria-expanded='false'
          className='sc-3aee2bbf-3 sc-3aee2bbf-6 jpmNtL cLknFw'
        >
          <svg
            className='BaseSvg-sc-yh8lnd-0 QuestionMarkCutCornerIcon___StyledBaseSvg-sc-16zdarm-0 ckLyyv sc-3aee2bbf-7 jhgyFk'
            viewBox='0 0 24 24'
            width='1.5em'
            height='1.5em'
            aria-hidden='true'
            focusable='false'
          >
            <path d='M12.25 8a1 1 0 0 1 .24.02q.27.04.58.17.3.12.48.35c.1.15.2.36.2.71 0 .67-.34 1.08-.92 1.79l-.04.05a4.7 4.7 0 0 0-1.29 3.16H13c0-.98.41-1.55.96-2.21q.05-.08.1-.14c.52-.62 1.19-1.43 1.19-2.65q-.02-.98-.5-1.6c-.31-.42-.7-.67-1.07-.84a4 4 0 0 0-1.38-.3l-.03-.01h-.01q0 0-.01 0h-.02a2 2 0 0 0-.14 0 4 4 0 0 0-1.43.4c-.4.2-.82.5-1.14.99q-.5.73-.52 1.86h1.5c0-.5.12-.81.26-1.03q.23-.32.58-.49a2 2 0 0 1 .9-.23zm-.75 7.5V17H13v-1.5z M1 1h22v16.31L17.31 23H1zm1.5 1.5v19h14.19l4.81-4.81V2.5z' />
          </svg>{' '}
          ¿Necesitas ayuda?
        </button>
      </div>
      <div className='sc-3aee2bbf-2 ggLmlG'>
        {localStorage.getItem('token') ? (
          <button
            className='sc-3aee2bbf-3 jpmNtL'
            onClick={() => {
              localStorage.removeItem('token')
              window.location.reload()
            }}
          >
            <svg
              className='BaseSvg-sc-yh8lnd-0 ExitIcon___StyledBaseSvg-sc-1sra210-0 ckLyyv sc-3aee2bbf-4 kXpFbX'
              viewBox='0 0 24 24'
              width='1.5em'
              height='1.5em'
              aria-hidden='true'
              focusable='false'
            >
              <path d='M15.13 1H1v22h10.98l3.15-3.23V15h-1.5v4.16l-2.29 2.34H2.5v-19h11.13V9h1.5zm3.4 6.47L23.06 12l-4.53 4.53-1.06-1.06 2.72-2.72H9v-1.5h11.19l-2.72-2.72z' />
            </svg>{' '}
            Cerrar sesión
          </button>
        ) : (
          <a href='/auth' className='sc-3aee2bbf-3 jpmNtL'>
            <svg
              className='BaseSvg-sc-yh8lnd-0 ExitIcon___StyledBaseSvg-sc-1sra210-0 ckLyyv sc-3aee2bbf-4 kXpFbX'
              viewBox='0 0 24 24'
              width='1.5em'
              height='1.5em'
              aria-hidden='true'
              focusable='false'
            >
              <path d='M15.13 1H1v22h10.98l3.15-3.23V15h-1.5v4.16l-2.29 2.34H2.5v-19h11.13V9h1.5zm3.4 6.47L23.06 12l-4.53 4.53-1.06-1.06 2.72-2.72H9v-1.5h11.19l-2.72-2.72z' />
            </svg>{' '}
            Cerrar sesión
          </a>
        )}
      </div>
    </nav>
  )
}

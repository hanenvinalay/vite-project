import { useLocation, Link } from 'react-router-dom'

export default function TabsEvent () {
  const { pathname } = useLocation()

  return (
    <>
      <nav aria-label='Mis boletos'>
        <ul>
          <li>
            <Link
              to='/user/orders'
              aria-current={pathname === '/user/orders' ? 'page' : undefined}
            >
              Próximos eventos
            </Link>
          </li>

          <li>
            <Link
              to='/user/orders/past-events'
              aria-current={
                pathname === '/user/orders/past-events' ? 'page' : undefined
              }
            >
              Eventos pasados
            </Link>
          </li>
        </ul>
      </nav>

      {/* CONTENIDO */}
      <section>
        {pathname === '/user/orders' && (
          <div>
            <h2>Próximos eventos</h2>
            <p>Listado de eventos que aún no ocurren.</p>
          </div>
        )}

        {pathname === '/user/orders/past-events' && (
          <div>
            <h2>Eventos pasados</h2>
            <p>Historial de eventos a los que ya asististe.</p>
          </div>
        )}
      </section>
    </>
  )
}

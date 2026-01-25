import { useEffect, useState } from "react";
import { authenticatedRequest , getUser} from "../api/index";

import { NavLink, useNavigate } from "react-router-dom";
import { AccordionLat } from "../components/NavBar";
import "./eventcard.css";
import "../css/MisEventos.css";


export default function Orders() {
const [orders, setOrders] = useState([]); // ✅ array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = getUser();
    setUser(storedUser);
  }, []);


  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const result = await authenticatedRequest("/orders");

        if (!Array.isArray(result)) {
          throw new Error("La respuesta no es un array");
        }

        if (isMounted) setOrders(result);
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    document.title = "Mis Eventos - Ticketmaster";
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main id="main-content" className="">
      <div className="sc-7e332ac7-0 iANLom">
        <div className="sc-7e332ac7-1 eQlytX">
          <div className="sc-7e332ac7-5 bCJgrl">
            <div className="sc-7e332ac7-6 gsgarL">
              <div className="sc-975711f7-0 dtGwY">
                <nav aria-label="Breadcrumb">
                  <ol data-testid="breadcrumb" className="sc-c3852847-0 cJkGra">
                    <li className="sc-c3852847-1 esVqUc">
                      <a
                        aria-current="false"
                        className="sc-b78ef1b0-1 giEdKV sc-c3852847-4 eVuiQT"
                        href="/"
                      >
                        Inicio
                      </a>
                      <span
                        role="presentation"
                        aria-hidden="true"
                        className="sc-c3852847-2 dgODTX"
                      />
                    </li>
                    <li className="sc-c3852847-1 esVqUc">
                      <span
                        aria-current="page"
                        className="sc-c3852847-5 fOsyUG"
                      >
                        Mis boletos
                      </span>
                    </li>
                  </ol>
                </nav>
                <h1 className="sc-975711f7-1 HbBIq">Mis boletos</h1>
                <nav
                  className="sc-e27b60a6-0 jPplec"
                  data-testid="orderSummaryHNav"
                  aria-label="Mis boletos"
                >
                  <ul
                    className="sc-e75005a7-0 exQMVx"
                    style={{ display: "flex", gap: 16 }}
                  >
                    <li>
                      <NavLink
                        to="/user/orders"
                        className={({ isActive }) =>
                          `sc-b78ef1b0-1 giEdKV sc-e75005a7-1 ${
                            isActive ? "hdRTZX" : "dJNIGu"
                          }`
                        }
                        end
                      >
                        Próximos eventos
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/user/orders/past-events"
                        className={({ isActive }) =>
                          `sc-b78ef1b0-1 giEdKV sc-e75005a7-1 ${
                            isActive ? "hdRTZX" : "dJNIGu"
                          }`
                        }
                      >
                        Eventos pasados
                      </NavLink>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className="sc-7e332ac7-3 cBThNd">
          <svg
            className="BaseSvg-sc-yh8lnd-0 TicketmasterTIcon___StyledBaseSvg-sc-14ttjcp-0 ckLyyv sc-7e332ac7-4 cebxtu"
            viewBox="0 0 24 24"
            width="1.5em"
            height="1.5em"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M11.23 17.47c0-.59.1-1.12.18-1.47l1.45-6.62h3.57l.63-2.88h-3.57l.98-4.5-4.28 1.38-.68 3.12H6.62L6 9.38h2.88L7.75 14.5a16 16 0 0 0-.5 3.52c0 2.92 1.9 3.98 4.6 3.98.69 0 1.46-.21 2.15-.36l.68-3.06c-.5.21-1.22.36-1.93.36-.9 0-1.52-.56-1.52-1.47" />
          </svg>
          <div className="sc-2eac59d2-0 dzQEzQ sc-7e332ac7-13 eqQbzq">
            <p className="sc-2eac59d2-1 dcACgO">
              <span className="sc-2eac59d2-2 cesjMZ">
                ¡Bienvenido de vuelta!
              </span>{" "}
              <span data-cs-mask="true" className="sc-2eac59d2-3 jeLwlb">
                {user?.name || "Usuario"}
              </span>
            </p>
          </div>
        </div>
        <div className="sc-7e332ac7-7 gMTQab">
          <AccordionLat />
        </div>
        <div className="sc-7e332ac7-10 jTWxHJ">
          <div className="sc-13bc719a-7 jQIWKC">
            <div className="sc-6b69d81f-2 Ykfef">
              {orders.length > 0 ? (
                <ul
                  data-testid="nextEventSubcards"
                  className="sc-7da77218-1 jvFlWE"
                >
                  {orders.map((order) => (
                    <li key={order.id} className="mb-4 " style={{ paddingBottom: "8px" }}>
                      <div className="sc-26bf2391-1 cGlfZA">
                        <div className="sc-26bf2391-2 UTqBi">
                          <a
                            id=":r1:"
                            className="sc-5ff3f33f-1 jVrMWe sc-26bf2391-3 ccPkCm"
                            href={`/user/order/${order.orderNumber}/view`}
                          >
                            <span className="VisuallyHidden-sc-8buqks-0 lmhoCy">
                              Orden #41-27485/MXC
                            </span>
                            <h3
                              data-testid="nextEventTitle"
                              className="sc-26bf2391-4 iHvEGE"
                            >
                              {order?.event?.event ||
                                order?.event?.name ||
                                "EVENTO"}
                            </h3>
                            <div className="sc-26bf2391-14 fHJnPI">
                              <p className="sc-26bf2391-12 OUFrB">
                                <span className="VisuallyHidden-sc-8buqks-0 lmhoCy">
                                  <span>sábado, 29 de noviembre de 2025</span>
                                </span>
                                <span>
                                  {" "}
                                  {order?.event?.formatted_date
                                    ?.date_formatted ||
                                    `${
                                      order?.event?.formatted_date?.day_name ||
                                      "lun"
                                    } • ${
                                      order?.event?.formatted_date?.day || "01"
                                    } de ${
                                      order?.event?.formatted_date
                                        ?.month_name || "ene"
                                    } de ${
                                      order?.event?.formatted_date?.year ||
                                      "2025"
                                    } • ${
                                      order?.event?.formatted_date?.time ||
                                      "09:00 p.m."
                                    }`}
                                </span>
                              </p>
                              <p className="sc-26bf2391-13 kHWBjK">
                                {order?.event?.venue}
                              </p>
                            </div>
                          </a>
                          <div className="sc-26bf2391-6 jwqluy">
                            <div className="sc-26bf2391-5 gATpkM" />
                            <a
                              aria-labelledby=":r0: :r1:"
                              className="sc-5ff3f33f-1 jVrMWe indexstyles__StyledButton-sc-83qv1q-0 ecKqjY"
                              href={`/user/order/${order.orderNumber}/view`}
                            >
                              <span className="indexstyles__FlexWrapper-sc-83qv1q-1 hJuAcy">
                                <span>
                                  <span id=":r0:">Ver entradas</span>
                                </span>
                                <svg
                                  viewBox="0 0 24 24"
                                  width="1.5em"
                                  height="1.5em"
                                  rotate={-90}
                                  aria-hidden="true"
                                  focusable="false"
                                  className="BaseSvg-sc-yh8lnd-0 ChevronIcon___StyledBaseSvg-sc-1y4em6t-0 kODbdn"
                                >
                                  <path d="M3.47 8.26 4.53 7.2 12 14.67l7.47-7.47 1.06 1.06L12 16.8z" />
                                </svg>
                              </span>
                            </a>
                            <div className="sc-26bf2391-7 qszAQ">
                              <span
                                data-testid="orderReference"
                                className="sc-26bf2391-11 fCJJVg"
                              >
                                Compra #41-27485/MXC
                              </span>
                            </div>
                          </div>
                        </div>
                        <a
                          aria-labelledby=":r1:"
                          className="sc-5ff3f33f-1 jVrMWe sc-26bf2391-8 ierIGE"
                          href={`/user/order/${order.orderNumber}/view`}
                        >
                          <img
                            aria-hidden="true"
                            src={
                              order?.event?.poster ||
                              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/versiondescritorio.jpg-NmgdiJFvdfE7mDo2bssZk1kvuyTSp0.jpeg"
                            }
                            alt={order?.event?.event || "Evento"}
                            className="sc-26bf2391-9 jQcFbs"
                          />
                        </a>
                      </div>
                    </li>
                  ))}
                  <br>
                  </br>
                </ul>
              ) : (
                <div className="text-center py-12">
                  <div className="mb-4">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No tienes eventos
                  </h3>
                  <p className="text-gray-500">
                    Cuando compres boletos, aparecerán aquí.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

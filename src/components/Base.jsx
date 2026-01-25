import { ContentFooter } from "./NavBar";
import "../css/Header.css";
import { AccordionListPanel , AccordionList} from "./NavBar";

export function Header({ onOpen }) {
  return (
    <div className="sc-6680851a-0 lnSCNt snipcss0-0-0-1 snipcss-jTA1w">
      <div className="sc-6680851a-1 biKGpv snipcss0-1-1-2">
        <header className="sc-efe57a95-0 Ptfqg snipcss0-2-2-3">
          <div
            className="sc-540448f4-0 fTemVb snipcss0-3-3-6"
            data-focus-on-hidden="true"
            aria-hidden="true"
          >
            <div className="sc-eeec92d6-0 imCymX snipcss0-4-6-7">
              <button
                title="México"
                aria-expanded="false"
                className="sc-166hzgj-2 jhHFnw"
              >
                <img
                  src="https://hatscripts.github.io/circle-flags/flags/mx.svg"
                  style={{ width: 16, height: 16 }}
                  className="sc-1siq6wr-0 jtPti sc-166hzgj-5 elEmzQ"
                  focusable="false"
                  aria-hidden="true"
                />
                <span aria-hidden="true">MX</span>
                <span className="VisuallyHidden-sc-8buqks-0 lmhoCy">
                  México seleccionado, cambiar país
                </span>
              </button>
              <button
                data-bdd="language-button"
                title="Español (es-mx)"
                aria-expanded="false"
                className="sc-eeec92d6-1 cNtRZm snipcss0-5-7-13"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="1em"
                  height="1em"
                  aria-hidden="true"
                  focusable="false"
                  className="BaseSvg-sc-yh8lnd-0 SpeechBubbleIcon___StyledBaseSvg-sc-bekthj-0 ckLyyv snipcss0-6-13-14"
                >
                  <path d="M23 3H1v13.8h16.72L23 21.4zM2.5 15.3V4.5h19v13.6l-3.22-2.8zM17 8.75H7v-1.5h10zm0 3.5H7v-1.5h10z" />
                </svg>
                <span
                  aria-hidden="true"
                  className="sc-eeec92d6-4 gWVwAf snipcss0-6-13-15"
                >
                  es
                </span>
                <span className="VisuallyHidden-sc-8buqks-0 lmhoCy snipcss0-6-13-16">
                  Español seleccionado, cambiar idioma
                </span>
              </button>
              <button
                data-testid="region-button"
                title="Todo México"
                aria-expanded="false"
                className="sc-eeec92d6-3 eLeLnM snipcss0-5-7-17"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="1em"
                  height="1em"
                  aria-hidden="true"
                  focusable="false"
                  className="BaseSvg-sc-yh8lnd-0 CompassArrowIcon___StyledBaseSvg-sc-1do14k4-0 ckLyyv snipcss0-6-17-18"
                >
                  <path d="m3.17 12.12 5.82 2.5.4.4 2.5 5.81 8.7-17.43zM1 11.49 21.97 1 23 2.03 12.51 23l-1.39-.04L8.1 15.9l-7.06-3.02z" />
                </svg>
                <span
                  aria-hidden="true"
                  className="sc-eeec92d6-4 gWVwAf snipcss0-6-17-19"
                >
                  Todo México
                </span>
                <span className="VisuallyHidden-sc-8buqks-0 lmhoCy snipcss0-6-17-20">
                  Todo México seleccionado, cambiar región
                </span>
              </button>
            </div>
            <nav
              aria-label="Additional Links"
              className="sc-540448f4-2 kTtvwV snipcss0-4-6-21"
            >
              <ul
                role="list"
                className="UnstyledList-sc-ix96mm-0 sc-540448f4-3 ekOJfs bKsUfq snipcss0-5-21-22"
              >
                <li role="listitem" className="snipcss0-6-22-23">
                  <a
                    href="https://guias.ticketmaster.com.mx/centros-ticketmaster/"
                    className="sc-540448f4-4 BSaHQ snipcss0-7-23-24"
                  >
                    Centros Ticketmaster
                  </a>
                </li>
                <li role="listitem" className="snipcss0-6-22-25">
                  <a
                    href="https://help.ticketmaster.com.mx/hc/es-mx"
                    className="sc-540448f4-4 BSaHQ snipcss0-7-25-26"
                  >
                    Ayuda
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <nav
            data-testid="stickyHeader"
            aria-label="Navegación Principal"
            className="sc-efe57a95-1 iFvUKK snipcss0-3-3-27"
          >
            <div
              className="sc-efe57a95-2 hYekYC snipcss0-4-27-28"
              data-focus-on-hidden="true"
              aria-hidden="true"
            >
              <div className="sc-d4f663ea-1 jUuFlj snipcss0-5-28-29">
                <a
                  href="https://www.ticketmaster.com.mx/"
                  className="sc-d4f663ea-3 kedMlO snipcss0-6-29-32"
                >
                  <svg
                    className="sc-d4f663ea-0 gQjdxW snipcss0-7-32-33"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 135 24"
                    fill="#fff"
                    height="100%"
                  >
                    <path d="M41.57 6.27c-4.02 0-6.97 3.63-6.97 7.4 0 3.62 2.38 5.32 5.9 5.32 1.3 0 2.66-.3 3.9-.68l.4-2.5a8.98 8.98 0 0 1-3.75.86c-2.04 0-3.23-.71-3.39-2.62l-.02-.34v-.1a6.46 6.46 0 0 1 .52-2.41c.61-1.55 1.48-2.62 3.36-2.62 1.33 0 2.02.73 2.02 2.03 0 .28-.02.54-.07.83H39.1a7.57 7.57 0 0 0-.34 2.17h7.5c.2-.9.32-1.8.32-2.72 0-3.09-2-4.62-5.02-4.62zm-5.4.28h-4.15l-4.44 4.41h-.05L29.65 1h-3.19l-3.78 17.7h3.11l1.38-6.44h.05l3.16 6.45h3.6l-3.7-6.62 5.88-5.54zm15.16 8.8a5 5 0 0 1 .15-1.18l1.16-5.3h2.86l.5-2.32h-2.86l.79-3.61-3.42 1.1-.55 2.5h-2.3l-.51 2.32h2.3l-.9 4.11c-.2.97-.4 1.89-.4 2.83 0 2.34 1.52 3.2 3.69 3.2.54 0 1.16-.18 1.7-.3l.56-2.45a4.28 4.28 0 0 1-1.55.28c-.72 0-1.22-.44-1.22-1.18zm-47.14 0c0-.47.07-.9.14-1.18l1.16-5.3h2.86l.5-2.32H5.99l.79-3.61-3.43 1.1-.54 2.5H.5L0 8.87h2.3l-.9 4.11c-.21.97-.4 1.89-.4 2.83C1 18.14 2.52 19 4.69 19c.54 0 1.16-.18 1.7-.3l.56-2.45a4.27 4.27 0 0 1-1.55.28c-.71 0-1.22-.44-1.22-1.18zm12.48-1.98c0-2.29 1.42-4.65 3.97-4.65.88 0 1.7.21 2.33.62l.78-2.6a11.4 11.4 0 0 0-3.19-.47c-4.4 0-7.22 3.23-7.22 7.48 0 3.14 2.04 5.24 5.2 5.24 1.05 0 2.1-.1 3.07-.57l.36-2.5c-.83.4-1.81.61-2.6.61-2.18 0-2.7-1.58-2.7-3.16zM14.5 1.31h-3.19l-.67 3.02h3.2l.66-3.02zm-4.36 5.24L7.54 18.7h3.19l2.61-12.16h-3.19zm72.06-.27c-1.43 0-2.81.26-4.17.73l-.45 2.53a9.48 9.48 0 0 1 4.02-.95c1.12 0 2.45.35 2.45 1.58 0 .36 0 .71-.1 1.04h-1.11c-3 0-7.52.3-7.52 4.32 0 2.24 1.57 3.47 3.78 3.47 1.76 0 2.86-.78 3.95-2.15h.05l-.33 1.87h2.68c.29-2.3 1.5-7.06 1.5-8.7 0-2.85-2.3-3.74-4.75-3.74zM80 16.68c-.82 0-1.62-.42-1.62-1.27 0-2.05 2.56-2.31 4.1-2.31h1.13c-.5 1.96-1.24 3.58-3.61 3.58zM71.6 6.27c-1.72 0-3.5.73-4.31 2.31h-.05c-.17-1.47-1.67-2.31-3.12-2.31-1.5 0-2.9.66-3.75 1.9h-.05l.29-1.62h-2.98l-.26 1.35-2.23 10.8h3.18l1.26-5.78c.4-1.63 1-4.2 3.16-4.2.82 0 1.5.57 1.5 1.46 0 .74-.23 1.87-.4 2.6l-1.28 5.93h3.18L67 12.92c.4-1.65.95-4.2 3.17-4.2.8 0 1.5.57 1.5 1.46 0 .74-.24 1.87-.4 2.6l-1.3 5.93h3.2l1.27-5.81c.27-1 .55-2.22.55-3.3a3.4 3.4 0 0 0-3.4-3.33zm41.24 0c-4.02 0-6.97 3.63-6.97 7.4 0 3.62 2.38 5.32 5.9 5.32 1.3 0 2.66-.3 3.9-.68l.4-2.5a9 9 0 0 1-3.75.86c-2.04 0-3.23-.71-3.38-2.62-.01-.12-.03-.22-.03-.34v-.1c.02-.84.2-1.66.53-2.41.6-1.55 1.47-2.62 3.35-2.62 1.33 0 2.02.73 2.02 2.03 0 .28-.02.54-.07.83h-4.36a7.57 7.57 0 0 0-.34 2.17h7.5c.2-.9.32-1.8.32-2.72 0-3.09-2-4.62-5.02-4.62zm10.18 2.57h-.05l.43-2.3h-3.05l-.28 1.64-2.19 10.53h3.19l1.14-5.46c.4-1.96 1.5-3.96 3.76-3.96.4 0 .85.07 1.2.19l.68-3.1a4.9 4.9 0 0 0-1.22-.11c-1.47 0-3.04 1.25-3.61 2.57zm-20.87 6.51c0-.47.07-.9.14-1.18l1.17-5.3h2.85l.5-2.32h-2.85l.78-3.61-3.42 1.1-.55 2.5h-2.3l-.5 2.32h2.3l-.9 4.11c-.22.97-.4 1.89-.4 2.83 0 2.34 1.52 3.2 3.68 3.2.55 0 1.17-.18 1.71-.3l.55-2.45c-.4.17-.98.28-1.55.28-.71 0-1.21-.44-1.21-1.18zm-13.31-5.21c0 3.04 4.13 3.23 4.13 5.2 0 .98-1.12 1.33-2.19 1.33a6.01 6.01 0 0 1-3.04-.94l-.7 2.53a8.8 8.8 0 0 0 3.74.73c2.74 0 5.52-.95 5.52-4.1 0-2.98-4.14-3.55-4.14-5.08 0-.97 1.19-1.23 2.14-1.23.9 0 1.79.26 2.13.44l.69-2.38a13.27 13.27 0 0 0-2.98-.37c-2.53 0-5.3 1.01-5.3 3.87zm43.23-3.86A2.74 2.74 0 0 0 129.33 9c0 1.5 1.23 2.72 2.74 2.72A2.73 2.73 0 0 0 134.81 9c0-1.5-1.23-2.72-2.74-2.72zm.01 5.04A2.23 2.23 0 0 1 129.86 9c0-1.3.95-2.31 2.22-2.31 1.26 0 2.21 1.01 2.21 2.31s-.95 2.32-2.2 2.32zm1.28-3.02c0-.6-.36-.9-1.1-.9h-1.23v3.2h.52V9.17h.44l.9 1.41h.55l-.91-1.4c.5 0 .83-.38.83-.89zm-1.81.48V7.8h.62c.34 0 .66.1.66.47 0 .41-.26.5-.66.5h-.62z" />
                  </svg>
                  <span className="VisuallyHidden-sc-8buqks-0 lmhoCy snipcss0-7-32-34">
                    Ticketmaster Página Principal
                  </span>
                </a>
              </div>
            </div>
            <ul
              aria-label="Categorías"
              role="list"
              className="UnstyledList-sc-ix96mm-0 sc-fb05b3d4-0 ekOJfs epyexw snipcss0-4-27-35"
              data-focus-on-hidden="true"
              aria-hidden="true"
            >
              <li
                role="listitem"
                className="sc-fd545d49-1 ezQCQP snipcss0-5-35-36"
              >
                <a
                  href="/section/conciertos"
                  data-testid="Conciertos y Festivales"
                  className="sc-fd545d49-0 fduTwP"
                >
                  Conciertos y Festivales
                </a>
              </li>

              <li
                role="listitem"
                className="sc-fd545d49-1 ezQCQP snipcss0-5-35-46"
              >
                <button
                  aria-expanded="false"
                  data-testid="Más"
                  className="sc-fd545d49-0 fduTwP snipcss0-6-46-47"
                >
                  Más
                </button>
              </li>
            </ul>
            <div className="sc-efe57a95-3 cCHXjY snipcss0-4-27-48">
              <button
                aria-expanded="false"
                className="sc-efe57a95-4 hektGN snipcss0-5-48-49"
                data-focus-on-hidden="true"
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 23 24"
                  width="1.5em"
                  height="1.5em"
                  aria-hidden="true"
                  focusable="false"
                  className="BaseSvg-sc-yh8lnd-0 MagnifyingGlassIcon___StyledBaseSvg-sc-1pooy9n-0 ckLyyv snipcss0-6-49-50"
                >
                  <path d="M3.78 4.78 1.62 10l2.16 5.22L9 17.38l5.22-2.16L16.38 10l-2.16-5.22L9 2.62zM9 1l6.36 2.64L18 10l-2.33 5.61 6.11 6.11-1.06 1.06-6.1-6.1L9 19l-6.36-2.64L0 10l2.64-6.36z" />
                </svg>
                <span className="sc-efe57a95-5 ieZwny snipcss0-6-49-51">
                  Buscador
                </span>
              </button>
              <div className="sc-b06b1a9e-0 cTorUa snipcss0-5-48-52">
                <form
                  action="/search"
                  role="search"
                  className="sc-b06b1a9e-1 eYkobq snipcss0-6-52-53"
                >
                  <span
                    role="status"
                    aria-live="polite"
                    className="VisuallyHidden-sc-8buqks-0 lmhoCy snipcss0-7-53-54"
                  />
                  <div
                    className="sc-b06b1a9e-2 yaUVz snipcss0-7-53-55"
                    data-focus-on-hidden="true"
                    aria-hidden="true"
                  >
                    <input
                      autoCapitalize="none"
                      autoComplete="off"
                      autoCorrect="off"
                      name="q"
                      placeholder="Buscar por artista, evento o inmueble"
                      role="combobox"
                      spellCheck="false"
                      type="text"
                      aria-activedescendant=""
                      aria-autocomplete="list"
                      aria-controls=":R1dnam: :R1dnamH1:"
                      aria-expanded="true"
                      aria-label="Buscar por artista, evento o inmueble"
                      className="sc-b06b1a9e-3 dcbmhE snipcss0-8-55-56"
                    />
                    <button
                      type="submit"
                      className="sc-b06b1a9e-4 dsGrXD snipcss0-8-55-57"
                    >
                      <svg
                        viewBox="0 0 23 24"
                        width="1.35em"
                        height="1.35em"
                        aria-hidden="true"
                        focusable="false"
                        className="BaseSvg-sc-yh8lnd-0 MagnifyingGlassIcon___StyledBaseSvg-sc-1pooy9n-0 ckLyyv snipcss0-9-57-58"
                      >
                        <path d="M3.78 4.78 1.62 10l2.16 5.22L9 17.38l5.22-2.16L16.38 10l-2.16-5.22L9 2.62zM9 1l6.36 2.64L18 10l-2.33 5.61 6.11 6.11-1.06 1.06-6.1-6.1L9 19l-6.36-2.64L0 10l2.64-6.36z" />
                      </svg>
                      <span className="VisuallyHidden-sc-8buqks-0 lmhoCy snipcss0-9-57-59">
                        Buscar
                      </span>
                    </button>
                  </div>
                </form>
              </div>
              <button
                data-testid="accountLink"
                id="Acount"
                onClick={onOpen}
                aria-expanded="true"
                role="button"
                className="sc-68b0bfd4-0 fLfdZg snipcss0-5-48-63"
                data-focus-on-hidden="true"
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="24px"
                  height="24px"
                  aria-hidden="true"
                  focusable="false"
                  className="BaseSvg-sc-yh8lnd-0 UserIcon___StyledBaseSvg-sc-16rhua7-0 ckLyyv snipcss0-6-63-64"
                >
                  <path d="M8 6.5a4 4 0 1 1 8 0 4 4 0 0 1-8 0M12 1a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11m6.49 12H5.43L1 16.9V23h22v-6.12zM2.5 17.58 6 14.5h11.93l3.57 3.07v3.93h-19z" />
                </svg>
                <span className="snipcss0-6-63-65">Mi Cuenta</span>
              </button>
            </div>
          </nav>
        </header>
      </div>
    </div>
  );
}

export function Footer({ isOpen, onClose }) {
  return (
    <div className="sc-6680851a-2 bbgxWO snipcss0-1-1-148 snipcss0-0-0-1">
      <ContentFooter />

      <div className="sc-44a8529b-0 dohSwf"></div>
      <div
        className="sc-6a69d9b9-0 jBHlYG"
        id="Panel"
        style={{ display: isOpen ? "block" : "none" }}
      >
        <section data-testid="panel" className="sc-44a8529b-1 jcWYWh">
          <div
            data-focus-guard="true"
            tabIndex={0}
            data-focus-on-hidden="true"
            aria-hidden="true"
            id="style-rUnmN"
            className="style-rUnmN"
          />
          <div data-focus-lock-disabled="false">
            <div
              tabIndex={-1}
              role="dialog"
              id="myAccount"
              className="sc-f1a04755-0 iVNFJM"
            >
              <div className="sc-f1a04755-1 ezVMOZ">
                <div className="sc-7d0f6316-0 ldIgbw">
                  <button
                    id="AcountPanel"
                    onClick={onClose}
                    className="SquareButton__StyledSquareButton-sc-1njhw9f-0 ydDMU sc-4d8f8e43-0 duPNAV"
                    type="button"
                  >
                    <div className="SquareButton__IconWrapper-sc-1njhw9f-1 iXcSWy">
                      <svg
                        viewBox="0 0 24 24"
                        width="1.5em"
                        height="1.5em"
                        aria-hidden="true"
                        focusable="false"
                        className="BaseSvg-sc-yh8lnd-0 CrossIcon___StyledBaseSvg-sc-4hkemq-0 ckLyyv"
                      >
                        <path d="m23 21.89-1.06 1.05-9.91-9.89L2.06 23 1 21.95 10.97 12 1 2.05 2.06 1l9.97 9.95 9.91-9.89L23 2.11 13.09 12z" />
                      </svg>
                    </div>
                    <span className="VisuallyHidden-sc-8buqks-0 lmhoCy">
                      Cerrar
                    </span>
                  </button>

                  <AccordionListPanel />
                </div>
              </div>
            </div>
          </div>
          <div
            data-focus-guard="true"
            tabIndex={0}
            data-focus-on-hidden="true"
            aria-hidden="true"
            id="style-AeA3k"
            className="style-AeA3k"
          />
        </section>
      </div>
    </div>
  );
}


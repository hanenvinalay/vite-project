import './modals.css'

export default function Modal ({
  isOpen,
  text = 'Espera, estamos trabajando en tu solicitud.'
}) {
  if (!isOpen) return null

  return (
    <div className='sc-efb1ccd1-0 fydoZl'>
      <div className='sc-efb1ccd1-1 ekYeLz'>
        <div role='alert' tabIndex={0} className='sc-efb1ccd1-2 hzoUIk'>
          <div className='LoadingSpinner__Container-sc-1aovhdo-0 jbsZEO'>
            <span className='Spinner__AnimatedSpinner-sc-337kba-0 FtVvn' />
            <p className='LoadingSpinner__Message-sc-1aovhdo-1 fRkZxz'>
              {text}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

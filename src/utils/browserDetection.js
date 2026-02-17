export const detectBrowser = () => {
  const userAgent = navigator.userAgent.toLowerCase()

  if (userAgent.includes('chrome')) {
    return 'chrome'
  } else if (userAgent.includes('firefox')) {
    return 'firefox'
  } else if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
    return 'safari'
  } else if (userAgent.includes('edg')) {
    return 'edge'
  } else if (userAgent.includes('opr') || userAgent.includes('opera')) {
    return 'opera'
  } else {
    return 'other'
  }
}

export const detectOS = () => {
  const userAgent = navigator.userAgent.toLowerCase()

  if (userAgent.includes('android')) {
    return 'android'
  }

  if (
    userAgent.includes('iphone') ||
    userAgent.includes('ipad') ||
    userAgent.includes('ipod')
  ) {
    return 'ios'
  }

  return 'other'
}

export const getWalletImage = browser => {
  const images = {
    safari:
      'https://uk.tmconst.com/rc-01b9906d/images/wallet/Apple/es/Add_to_Apple_Wallet_rgb_ES-MX.svg',
    chrome:
      'https://uk.tmconst.com/rc-01b9906d/images/wallet/gpay/es/save_to_google_pay.svg',
    firefox:
      'https://uk.tmconst.com/rc-01b9906d/images/wallet/gpay/es/save_to_google_pay.svg',
    edge: 'https://uk.tmconst.com/rc-01b9906d/images/wallet/gpay/es/save_to_google_pay.svg',
    opera:
      'https://uk.tmconst.com/rc-01b9906d/images/wallet/gpay/es/save_to_google_pay.svg',
    other:
      'https://uk.tmconst.com/rc-01b9906d/images/wallet/gpay/es/save_to_google_pay.svg'
  }

  return images[browser] || images.other
}

export const getWalletAltText = browser => {
  const altTexts = {
    safari: 'Agregar a la Apple Wallet',
    chrome: 'Agregar a Google Wallet',
    firefox: 'Agregar a Google Wallet',
    edge: 'Agregar a Google Wallet',
    opera: 'Agregar a Google Wallet',
    other: 'Agregar a Wallet'
  }

  return altTexts[browser] || altTexts.other
}

export const getAppStoreLink = browser => {
  const images  = {
    safari: 'https://uk.tmconst.com/rc-51d3375a/images/logo/apple-store/en.svg',
    chrome: 'https://uk.tmconst.com/rc-51d3375a/images/logo/google-store/en.svg',
    firefox: 'https://uk.tmconst.com/rc-51d3375a/images/logo/google-store/en.svg',
    edge: 'https://uk.tmconst.com/rc-51d3375a/images/logo/google-store/en.svg',
    opera: 'https://uk.tmconst.com/rc-51d3375a/images/logo/google-store/en.svg',
    other: 'https://uk.tmconst.com/rc-51d3375a/images/logo/google-store/en.svg'
  }

  return images[browser] || images.other
}

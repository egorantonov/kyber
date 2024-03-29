import { getWebkitUserAgentData } from './webkitUserAgentData'

interface NavigatorUAData {
  brands: Brand[],
  mobile: boolean,
  platform: string
}

interface Brand {
  brand: string,
  version: string
}

export interface UserAgentData {
  browser: string,
  mobile: boolean,
  platform: string
}

export function getUserAgentData(): UserAgentData {
  const userAgentData: UserAgentData = {
    browser: '', mobile: false, platform: ''
  }

  const webkitUserAgentData: NavigatorUAData = getWebkitUserAgentData()

  if (webkitUserAgentData && webkitUserAgentData.brands?.length > 0) {   
    const brand = webkitUserAgentData.brands.find(x => !x.brand.includes('Not') && x.brand !== 'Chromium' ) 
    userAgentData.browser = `${brand?.brand} ${brand?.version}`
    userAgentData.mobile = webkitUserAgentData.mobile
    userAgentData.platform = parsePlatform(webkitUserAgentData.platform, navigator.userAgent)

    return userAgentData
  }

  userAgentData.browser = parseBrowser(navigator.userAgent) ?? navigator.userAgent
  userAgentData.mobile = navigator.userAgent.toLowerCase().includes('mobile')
  userAgentData.platform = parsePlatform(navigator.platform, navigator.userAgent)

  return userAgentData
}

export const UA = {
  SAFARI: 'Safari/',
  FIREFOX: 'Firefox/',
  GECKO: 'Gecko/',
  OPERA: 'OPR/',
  OPERA_TOUCH: 'OPT/',
  EDGE: 'Edg/',
  EDGE_ANDROID: 'EdgA/',
  BRAVE: 'Brave/',
  VIVALDI: 'Vivaldi/',
  YANDEX: 'Yandex/',
  YABROWSER: 'YaBrowser/',
  CHROME: 'Chrome/',
  CHROME_IOS: 'CriOS/',
  WEBVIEW: 'wv'
}

// parse most popular browsers from `userAgent` string
export function parseBrowser(userAgent: string) {
  let browser = ''

  if (userAgent.includes(UA.OPERA)) {
    browser = `Opera ${getVersion(userAgent, UA.OPERA)}`
  }
  else if (userAgent.includes(UA.OPERA_TOUCH)){
    browser = `Opera Touch ${getVersion(userAgent, UA.OPERA_TOUCH)}`
  }
  else if (userAgent.includes(UA.FIREFOX)){
    browser = `Firefox ${getVersion(userAgent, UA.FIREFOX)}`
  }
  else if (userAgent.includes(UA.GECKO)){
    browser = `Firefox ${getVersion(userAgent, UA.GECKO)}`
  }
  else if (userAgent.includes(UA.YANDEX)){
    browser = `Yandex ${getVersion(userAgent, UA.YANDEX)}`
  }
  else if (userAgent.includes(UA.YABROWSER)){
    browser = `Yandex ${getVersion(userAgent, UA.YABROWSER)}`
  }
  else if (userAgent.includes(UA.VIVALDI)){
    browser = `Vivaldi ${getVersion(userAgent, UA.VIVALDI)}`
  }
  else if (userAgent.includes(UA.BRAVE)){
    browser = `Brave ${getVersion(userAgent, UA.BRAVE)}`
  }
  else if (userAgent.includes(UA.EDGE)){
    browser = `Edge ${getVersion(userAgent, UA.EDGE)}`
  }
  else if (userAgent.includes(UA.EDGE_ANDROID)){
    browser = `Edge ${getVersion(userAgent, UA.EDGE_ANDROID)}`
  }
  else if (userAgent.includes(UA.CHROME)){
    if (userAgent.includes(UA.WEBVIEW)) {
      browser = `Webview ${getVersion(userAgent, UA.CHROME)}`
    }
    else {
      browser = `Chrome ${getVersion(userAgent, UA.CHROME)}`
    }
  }
  else if (userAgent.includes(UA.CHROME_IOS)){
    browser = `Chrome ${getVersion(userAgent, UA.CHROME_IOS)}`
  }
  else if (userAgent.includes(UA.SAFARI)){
    browser = `Safari ${getVersion(userAgent, 'Version/')}`
  }
  else if (userAgent.includes(UA.WEBVIEW)){
    browser = `Webview ${getVersion(userAgent, 'Version/')}`
  }
  else {
    browser = userAgent // other browsers?
  }

  return browser
}

function getVersion(userAgent: string, browser: string): string {
  userAgent = userAgent.slice(userAgent.indexOf(browser) + browser.length)
  return userAgent.indexOf(' ') === -1 ? userAgent : userAgent.slice(0, userAgent.indexOf(' '))
}

export const PLATFORM = {
  WINDOWS: 'Windows',
  MAC: 'Mac',
  IPAD: 'iPad',
  IPHONE: 'iPhone',
  ANDROID: 'Android',
  LINUX: 'Linux'
}

export function parsePlatform(platform: string, userAgent: string): string {

  const lcPlatform = platform.toLowerCase()

  if (lcPlatform.startsWith('win') || userAgent.includes(PLATFORM.WINDOWS)) {    
    return PLATFORM.WINDOWS
  }

  if (lcPlatform.startsWith(PLATFORM.MAC.toLowerCase())) {
    // iPad
    if (userAgent.includes(PLATFORM.IPAD)) {
      return PLATFORM.IPAD
    }

    // iPhone
    if (userAgent.includes(PLATFORM.IPHONE)) {
      return PLATFORM.IPHONE
    }

    // Mac
    return PLATFORM.MAC
  }

  if (lcPlatform.startsWith(PLATFORM.LINUX.toLowerCase())) {
    // Android 
    if (userAgent.includes(PLATFORM.ANDROID)) {
      return PLATFORM.ANDROID
    }

    return PLATFORM.LINUX
  }

  return platform
}
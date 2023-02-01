import {parseBrowser, parsePlatform, PLATFORM}  from './userAgentData'

const UserAgents = {
  Windows: {
    Opera_99: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.0.0 Safari/537.36 OPR/99.94.0.0',
    Firefox_99: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:99.0) Gecko/20100101 Firefox/99.0',
    Chrome_99: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.0.0 Safari/537.36',
    Edge_99: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.109.0.0 Safari/537.36 Edg/99.109.0.0',
    Vivaldi_5: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Vivaldi/5.5.2805.38'
  },
  Mac: {
    Safari_16: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15'
  },
  iPad: {
    OperaTouch_3: 'Mozilla/5.0 (iPad; CPU OS 16_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Mobile/15E148 Safari/604.1 OPT/3.4.0',
    Chrome_109: 'Mozilla/5.0 (iPad; CPU OS 16_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/109.0.5414.83 Mobile/15E148 Safari/604.1',
    Yandex_23: 'Mozilla/5.0 (iPad; CPU OS 16_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 YaBrowser/23.1.0.2677.11 Mobile/15E148 Safari/604.1',
  },
  Android: {
    Opera_73: 'Mozilla/5.0 (Linux; Android 10; MI 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.128 Mobile Safari/537.36 OPR/73.0.3844.69695',
    Chrome_109: 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Mobile Safari/537.36',
    Edge_108: 'Mozilla/5.0 (Linux; Android 10; MI 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36 EdgA/108.0.1462.76',
    Firefox_108: 'Mozilla/5.0 (Android 10; Mobile; rv:108.0) Gecko/108.0 Firefox/108.0',
  }
}

describe('parseBrowser() tests: Windows User Agent Data', () => {
  test('Windows Opera 99', () => {
    expect(parseBrowser(UserAgents.Windows.Opera_99)).toBe('Opera 99.94.0.0')
  })

  test('Windows Firefox 99', () => {
    expect(parseBrowser(UserAgents.Windows.Firefox_99)).toBe('Firefox 99.0')
  })

  test('Windows Chrome 99', () => {
    expect(parseBrowser(UserAgents.Windows.Chrome_99)).toBe('Chrome 99.0.0.0')
  })

  test('Windows Edge 99', () => {
    expect(parseBrowser(UserAgents.Windows.Edge_99)).toBe('Edge 99.109.0.0')
  })

  test('Windows Vivaldi 5', () => {
    expect(parseBrowser(UserAgents.Windows.Vivaldi_5)).toBe('Vivaldi 5.5.2805.38')
  })

})

describe('parseBrowser() tests: Apple User Agent Data', () => {
  test('Mac Safari 16', () => {
    expect(parseBrowser(UserAgents.Mac.Safari_16)).toBe('Safari 16.0')
  })

  test('iPad Opera Touch 3', () => {
    expect(parseBrowser(UserAgents.iPad.OperaTouch_3)).toBe('Opera Touch 3.4.0')
  })

  test('iPad Chrome 109', () => {
    expect(parseBrowser(UserAgents.iPad.Chrome_109)).toBe('Chrome 109.0.5414.83')
  })

  test('iPad Yandex 23', () => {
    expect(parseBrowser(UserAgents.iPad.Yandex_23)).toBe('Yandex Browser 23.1.0.2677.11')
  })
})

describe('parseBrowser() tests: Android User Agent Data', () => {
  test('Android Opera 73', () => {
    expect(parseBrowser(UserAgents.Android.Opera_73)).toBe('Opera 73.0.3844.69695')
  })

  test('Android Chrome 109', () => {
    expect(parseBrowser(UserAgents.Android.Chrome_109)).toBe('Chrome 109.0.0.0')
  })

  test('Android Edge 108', () => {
    expect(parseBrowser(UserAgents.Android.Edge_108)).toBe('Edge 108.0.1462.76')
  })

  test('Android Firefox 108', () => {
    expect(parseBrowser(UserAgents.Android.Firefox_108)).toBe('Firefox 108.0')
  })
})

describe('parsePlatform() tests', () => {
  test('Windows', () => {
    expect(parsePlatform('Win32', UserAgents.Windows.Opera_99)).toBe(PLATFORM.WINDOWS)
  })

  test('Mac Intel', () => {
    expect(parsePlatform('Mac', UserAgents.Mac.Safari_16)).toBe(PLATFORM.MAC)
  })

  test('Mac Intel', () => {
    expect(parsePlatform('MacIntel', UserAgents.Mac.Safari_16)).toBe(PLATFORM.MAC)
  })

  test('iPad', () => {
    expect(parsePlatform('Macintosh', UserAgents.iPad.Chrome_109)).toBe(PLATFORM.IPAD)
  })

  test('Android Chrome', () => {
    expect(parsePlatform('Linux arm81', UserAgents.Android.Chrome_109)).toBe(PLATFORM.ANDROID)
  })

  test('Android Firefox', () => {
    expect(parsePlatform('Linux aarch64', UserAgents.Android.Firefox_108)).toBe(PLATFORM.ANDROID)
  })
})
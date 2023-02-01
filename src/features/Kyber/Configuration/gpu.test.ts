import * as gpu from './gpu'

const apple_Safari_Apple = 'Apple GPU' // iPad, MacBook
const mac_Firefox_Intel400 = 'Intel(R) HD Graphics 400'
const mac_Firefox_Intel945 = 'Intel 945GM'
const mac_WebKit_Intel630 = 'ANGLE (Intel Inc., Intel(R) UHD Graphics 630, OpenGL 4.1)'
const mac_WebKit_IntelIris = 'ANGLE (Intel Inc., Intel Iris OpenGL Engine, OpenGL 4.1)'
const win11_Firefox_Microsoft = 'ANGLE (Unknown, Microsoft Basic Renderer Driver Direct3D11 vs_5_0 ps_5_0)'
const win11_WebKit_Vulkan = 'ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (Subzero) (0x0000C0DE)), SwiftShader driver)'
const win10_WebKit_RX570 = 'ANGLE (AMD, Radeon RX 570 Series Direct3D11 vs_5_0 ps_5_0, D3D11)' // rx570
const win10_Firefox_RX570 = 'ANGLE (AMD, Radeon R9 200 Series Direct3D11 vs_5_0 ps_5_0)' // rx570
const android10_WebKit_Adreno640 = 'Adreno (TM) 640' // mi9
const android10_Firefox_Adreno640 = 'Adreno (TM) 650' // mi9
const android9_WebKit_Adreno506 = 'Adreno (TM) 506' // miA1
const android7_WebKit_Adreno505 = 'Adreno (TM) 505' // mediaPad
const android6_WebKit_Adreno510 = 'ANGLE (Qualcomm, Adreno (TM) 510, OpenGL ES 3.1)' // le2
const android6_Firefox_Adreno510 = 'Adreno (TM) 540' // le2
const android5_WebKit_Adreno320 = 'Adreno (TM) 320' // nexus4
const android5_Firefox_Adreno320 = 'Adreno (TM) 330' // nexus4

describe('GPU tests', () => {
  test('Apple GPU', () => {
    expect(gpu.parseGpu(apple_Safari_Apple)).toBe('Apple GPU')
  })

  test('Mac Firefox Intel 400', () => {
    expect(gpu.parseGpu(mac_Firefox_Intel400)).toBe('Intel(R) HD Graphics 400')
  })

  test('Mac Firefox Intel 945', () => {
    expect(gpu.parseGpu(mac_Firefox_Intel945)).toBe('Intel 945GM')
  })

  test('Mac WebKit Intel 630', () => {
    expect(gpu.parseGpu(mac_WebKit_Intel630)).toBe('Intel Inc., Intel(R) UHD Graphics 630')
  })

  test('Mac WebKit Intel Iris', () => {
    expect(gpu.parseGpu(mac_WebKit_IntelIris)).toBe('Intel Inc., Intel Iris')
  })

  test('win11 Firefox Microsoft', () => {
    expect(gpu.parseGpu(win11_Firefox_Microsoft)).toBe('Unknown, Microsoft Basic Renderer Driver')
  })

  test('win11 WebKit Vulkan', () => {
    expect(gpu.parseGpu(win11_WebKit_Vulkan)).toBe('Google, Vulkan 1.3.0 (SwiftShader Device (Subzero) (0x0000C0DE)), SwiftShader driver')
  })

  test('win10 WebKit RX570', () => {
    expect(gpu.parseGpu(win10_WebKit_RX570)).toBe('AMD, Radeon RX 570 Series')
  })

  test('win10 WebKit RX570', () => {
    expect(gpu.parseGpu(win10_Firefox_RX570)).toBe('AMD, Radeon R9 200 Series')
  })

  test('android10 WebKit Adreno 640', () => {
    expect(gpu.parseGpu(android10_WebKit_Adreno640)).toBe('Adreno (TM) 640')
  })

  test('android10 Firefox Adreno 640', () => {
    expect(gpu.parseGpu(android10_Firefox_Adreno640)).toBe('Adreno (TM) 650')
  })

  test('android9 WebKit Adreno 506', () => {
    expect(gpu.parseGpu(android9_WebKit_Adreno506)).toBe('Adreno (TM) 506')
  })

  test('android7 WebKit Adreno 505', () => {
    expect(gpu.parseGpu(android7_WebKit_Adreno505)).toBe('Adreno (TM) 505')
  })

  test('android6 WebKit Adreno 510', () => {
    expect(gpu.parseGpu(android6_WebKit_Adreno510)).toBe('Qualcomm, Adreno (TM) 510')
  })

  test('android6 Firefox Adreno 510', () => {
    expect(gpu.parseGpu(android6_Firefox_Adreno510)).toBe('Adreno (TM) 540')
  })

  test('android5 WebKit Adreno 320', () => {
    expect(gpu.parseGpu(android5_WebKit_Adreno320)).toBe('Adreno (TM) 320')
  })

  test('android5 Firefox Adreno 320', () => {
    expect(gpu.parseGpu(android5_Firefox_Adreno320)).toBe('Adreno (TM) 330')
  })
})
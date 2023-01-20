export function getGPU() {  
  const canvas = document.createElement('canvas')
  let webgl

  try {
    webgl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
  }
  catch (e) {
    console.log(e)
  }

  const debugInfo = webgl?.getExtension('WEBGL_debug_renderer_info')
  return webgl?.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) ?? ''
}
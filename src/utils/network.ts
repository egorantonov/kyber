import { KyberProxy } from '../api/models'
import { CONSTANTS } from '../features/Kyber/constants'

export function ping(host: string, port = 25200, callback?: any): number {  

  let elapsed = 0
  const http = new XMLHttpRequest()
  const started = new Date().getTime()
  http.open('GET', `https://${host}:${port}`, true)
  http.onreadystatechange = function() {
    if (http.readyState == 4) {
      const ended = new Date().getTime()
      elapsed = Math.round((ended - started)/5)

      if (callback != null) {		  
        callback({host, port, elapsed})
      }
    }
  }

  try {
    http.send(null)
  } catch(exception) {
    // this is expected
  }

  return elapsed
}

export function pingAsync(host: string, port = 25200, callback?: any): Promise<number> {  

  let elapsed = 0
  const http = new XMLHttpRequest()
  const started = new Date().getTime()
  http.open(CONSTANTS.METHOD.GET, `https://${host}:${port}`, true)
  http.onreadystatechange = function() {
    if (http.readyState == 4) {
      const ended = new Date().getTime()
      elapsed = Math.round((ended - started)/5)

      if (callback != null) {		  
        callback({host, port, elapsed})
      }
    }
  }

  try {
    http.send(null)
  } catch(exception) {
    // this is expected
  }

  return new Promise<number>(resolve => resolve(elapsed))
}
import { getJson } from '../extensions/fetch'
import { CONSTANTS } from '../features/Kyber/constants'
import { KYBER_API } from './endpoints'
import { ApiResponse, HostKyberServerRequest, HostKyberServerResponse, KyberProxy, KyberServer, KyberServersResponse } from './models'

const fetchServersErrorMessage = (message: string, page = 1) => {
  console.error(`${CONSTANTS.MESSAGE.ERROR} ${message} Endpoint: ${KYBER_API.servers}${page}`)
}

// FETCH SERVERS
export const fetchServers = async (): Promise<{data: KyberServer[]}> => {

  let pageCount = 0
  let servers: KyberServer[] = []

  await getJson(`${KYBER_API.servers}1`)
    .then(
      (data: KyberServersResponse) => {
        servers = data.servers
        pageCount = data.pageCount
      }, 
      (error) => { // onRejected
        fetchServersErrorMessage(error)
      })

  if (pageCount > 1) {
    for (let i = 2; i <= pageCount; i++) {
      await getJson(`${KYBER_API.servers}${i}`)
        .then(
          (data: KyberServersResponse) => {
            servers = servers.concat(data.servers)
          }, 
          (error) => { // onRejected
            fetchServersErrorMessage(error)
          })
    }
  }

  return new Promise<{data: KyberServer[]}>((resolve) => resolve({data: servers}))
}

// FETCH PROXIES
export const fetchProxies = async (): Promise<{data: KyberProxy[]}> => {
  let proxies: KyberProxy[] = []

  await getJson(KYBER_API.proxies)
    .then(
      (data: KyberProxy[]) => {
        proxies = data
      },
      (error) => {
        console.error(error)
      }
    )
  
  return new Promise<{data: KyberProxy[]}>((resolve) => resolve({data: proxies}))
}

// HOST A SERVER
export const hostServer = async (data: HostKyberServerRequest): Promise<ApiResponse<HostKyberServerResponse>> => {

  let hostResponse: HostKyberServerResponse = {message: ''}
  let status = 0
  let success = false
  const errors: any[] = []

  await fetch(KYBER_API.host, {
    method: CONSTANTS.METHOD.POST,
    body: JSON.stringify(data),
    headers: {
      [CONSTANTS.HEADER.NAME.CONTENT_TYPE]: `${CONSTANTS.HEADER.VALUE.APP_JSON}`
    }
  })
    .then(
      (response) => {
        success = response.ok
        status = response.status
        return response.json()
      },
      (error) => {
        console.error(error)
        errors.push(error)
      } )
    .then(
      (data: HostKyberServerResponse) => {
        hostResponse = data        
      },
      (error) => {
        console.error(error)
        errors.push(error)
      })

  const apiResponse: ApiResponse<HostKyberServerResponse> = {
    data: hostResponse,
    status,
    success,
    errors
  }

  return new Promise<ApiResponse<HostKyberServerResponse>>((resolve) => resolve(apiResponse))
}
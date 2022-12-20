import { CONSTANTS } from '../features/Kyber/constants'
import { KYBER_API } from './endpoints'
import { KyberServer, KyberServersResponse } from './models'

const fetchServersErrorMessage = (message: string, page = 1) => {
  console.error(`${CONSTANTS.MESSAGE.ERROR} ${message} Endpoint: ${KYBER_API.servers}${page}`)
}

// FETCH SERVERS
export const fetchServers = async () => {

  let pageCount = 0
  let servers: KyberServer[] = []

  await fetch(`${KYBER_API.servers}1`)
    .then((response) => response.json())
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
      await fetch(`${KYBER_API.servers}${i}`)
        .then((response) => response.json())
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
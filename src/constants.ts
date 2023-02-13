import { KYBER_API } from './api/endpoints'

export const HOST_PRODUCTION = 'https://kyber.pages.dev'
export const HOST = window?.location?.origin ?? HOST_PRODUCTION
export const IMG_NEXUS_MOD = 'https://images.nexusmods.com/favicons/ReskinOrange/favicon-16x16.png'
export const IMG_URL_PREFIX = `${KYBER_API.hostName}/static/images/maps/`
export const IMG_URL_POSTFIX = '.jpg'
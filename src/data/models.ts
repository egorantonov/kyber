import { KyberServer, KyberProxy } from '../api/models'

export interface BattlefrontMap {
  map: string,
  name: BattlefrontMapName
}

export interface BattlefrontMode {
  mode: string,
  name: string,
  maps: string[],
  mapOverrides?: BattlefrontMap[]
}

export enum Side {
  Light = 0,
  Dark = 1
}

export enum BattlefrontMapName {
  Geonosis = 'Geonosis',
  Kamino = 'Kamino',
  Naboo = 'Naboo',
  NabooTheedPalace = 'Naboo - Theed Palace',
  NabooPalaceHangar = 'Naboo - Palace Hangar',
  Kashyyyk = 'Kashyyyk',
  Felucia = 'Felucia',
  Kessel = 'Kessel',
  Scarif = 'Scarif',
  Tatooine = 'Tatooine',
  TatooineMosEisley = 'Tatooine - Mos Eisley',
  TatooineJabbasPalace = 'Tatooine - Jabba\'s Palace',
  Yavin = 'Yavin',
  Hoth = 'Hoth',
  Bespin = 'Bespin',
  Endor = 'Endor',
  EndorEwokVillage = 'Endor - Ewok Village',
  EndorEwokVillageWIP = 'Endor - Ewok Village (WIP)',
  EndorResearchStation9 = 'Endor - Research Station 9',
  DeathStar2 = 'Death Star II',
  Jakku = 'Jakku',
  Takodana = 'Takodana',
  StarkillerBase = 'Starkiller Base',
  Crait = 'Crait',
  CraitWIP = 'Crait (WIP)',
  AjanKloss = 'Ajan Kloss',
  MC85StarCruiser = 'MC85 Star Cruiser',
  RepublicVenator = 'Republic Venator',
  SeparatistDreadnought = 'Separatist Dreadnought',
  ResurgentStarDestroyer = 'Resurgent Star Destroyer',
  FirstOrderStarDestroyer = 'First Order Star Destroyer',
  Ryloth = 'Ryloth',
  Fondor = 'Fondor',
  UnknownRegions = 'Unknown Regions',
  DQar = 'D\'Qar',
}

export interface Password {
  name: string,
  value: string
}

export enum PasswordKeys {
  all = 'All',
  free = 'Open',
  required = 'Secured'
}

export enum PasswordValues {
  all = 'all',
  free = 'open',
  required = 'secured'
}

export interface KyberState {
  pageCount: number,
  serverCount: number,

  mods: number,
  users: number,
  maxPlayers: number,
  passwordStatus: PasswordValues,

  allModes: BattlefrontMode[],
  allMaps: BattlefrontMap[],

  mode?: string,
  proxy?: string,
  maps?: string[],

  passwords: Password[],

  allServers: KyberServer[],
  servers: KyberServer[],
  proxies: KyberProxy[],

  searchValue: string,
  searchedServers: KyberServer[],

  modalOpen: boolean,
  modalServer?: KyberServer,

  isLoading: boolean,
  isApiError: boolean,
  isDebug: boolean
}

export interface PlayRequest {
  id: string,
  faction?: number,
  password?: string
}
import { isNullOrEmpty, isNullOrWhiteSpace } from './string'

describe('isUndefinedOrEmpty tests', () => {
  test('tests empty string', () => {
    expect(isNullOrEmpty('')).toBe(true)
  })
  test('test undefined string', () => {
    expect(isNullOrEmpty(undefined)).toBe(true)
  })
  test('test whitespace string', () => {
    expect(isNullOrEmpty(' \t \u2000 \r\n')).toBe(false)
  })
  test('test regular string', () => {
    expect(isNullOrEmpty('string')).toBe(false)
  })
})

describe('isUndefinedOrWhiteSpace tests', () => {
  test('tests empty string', () => {
    expect(isNullOrWhiteSpace('')).toBe(true)
  })
  test('test undefined string', () => {
    expect(isNullOrWhiteSpace(undefined)).toBe(true)
  })
  test('test whitespace string', () => {
    expect(isNullOrWhiteSpace(' \t \u2000 \r\n')).toBe(true)
  })
  test('test regular string', () => {
    expect(isNullOrWhiteSpace('string')).toBe(false)
  })
})


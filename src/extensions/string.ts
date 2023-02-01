export const isNullOrEmpty = (value: string | undefined | null): boolean => value === undefined || value === null || value === ''
export const isNullOrWhiteSpace = (value: string | undefined | null): boolean => isNullOrEmpty(value) || value?.trim().length === 0


export { isBoolean, isNumber } from '@vueuse/core'
export { isString } from '@vue/shared'
import { isString } from '@vue/shared'

export const isUndefined = (val: any): val is undefined => val === undefined

export const isStringNumber = (val: string): boolean => {
  if (!isString(val)) {
    return false
  }
  return !Number.isNaN(Number(val))
}

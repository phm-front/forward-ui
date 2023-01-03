import { componentSizes } from '@forward-ui/constants'
import type { ComponentSize } from '@forward-ui/constants'

export const isValidComponentSize = (val: string): val is ComponentSize | '' =>
  ['', ...componentSizes].includes(val)

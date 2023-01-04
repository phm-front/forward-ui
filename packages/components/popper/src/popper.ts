import type { ExtractPropTypes } from 'vue'
import type Popper from './popper.vue'
import { definePropType } from '@forward-ui/utils';

const effects = ['light', 'dark'] as const
const triggers = ['click', 'contextmenu', 'hover', 'focus'] as const

export const Effect = {
  LIGHT: 'light',
  DARK: 'dark',
} as const

export const roleTypes = [
  'dialog',
  'grid',
  'group',
  'listbox',
  'menu',
  'navigation',
  'tooltip',
  'tree',
] as const

export type PopperEffect = typeof effects[number]
export type PopperTrigger = typeof triggers[number]

export const popperProps = {
  role: {
    type: definePropType<typeof roleTypes[number]>(String),
    validator(value: typeof roleTypes[number]) {
      return roleTypes.includes(value)
    },
    default: 'tooltip',
  }
} as const

export type PopperProps = ExtractPropTypes<typeof popperProps>

export type PopperInstance = InstanceType<typeof Popper>

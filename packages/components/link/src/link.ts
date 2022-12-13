import { iconPropType } from '@forward-ui/utils'
import type { ExtractPropTypes } from 'vue'
import type Link from './link.vue'

export const linkProps = {
  href: { type: String, default: '' },
  type: {
    type: String,
    values: ['primary', 'success', 'warning', 'info', 'danger', 'default'],
    default: 'default',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  underline: {
    type: Boolean,
    default: true,
  },
  icon: {
    type: iconPropType,
  },
} as const

export const linkEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
}

export type LinkEmits = typeof linkEmits
export type LinkProps = ExtractPropTypes<typeof linkProps>
export type LinkInstance = InstanceType<typeof Link>

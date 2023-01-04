import type { Component, ExtractPropTypes } from 'vue'
import { definePropType } from '@forward-ui/utils';
import { Loading } from '@element-plus/icons-vue';
import { iconPropType } from '@forward-ui/utils'
import type Button from './button.vue'

export const buttonTypes = [
  'primary',
  'success',
  'warning',
  'info',
  'danger',
  ''
] as const
export const buttonSizes = ['', 'default', 'small', 'large'] as const

export const buttonProps = {
  size: {
    type: definePropType<typeof buttonSizes[number]>(String),
    validator(value: typeof buttonSizes[number]) {
      return buttonSizes.includes(value)
    },
    default: '',
  },
  type: {
    type: definePropType<typeof buttonTypes[number]>(String),
    validator(value: typeof buttonTypes[number]) {
      return buttonTypes.includes(value)
    },
    default: '',
  },
  plain: Boolean,
  text: Boolean,
  bg: Boolean,
  link: Boolean,
  round: Boolean,
  circle: Boolean,
  loading: Boolean,
  disabled: Boolean,
  icon: iconPropType,
  loadingIcon: {
    type: iconPropType,
    default: () => Loading as Component,
  },
} as const

export type ButtonPropsType = ExtractPropTypes<typeof buttonProps>
export type ButtonInstance = InstanceType<typeof Button>

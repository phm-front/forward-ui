import { definePropType } from '@forward-ui/utils'
import { componentSizes } from '@forward-ui/constants';
import { placements } from '@popperjs/core'

import type { ExtractPropTypes, PropType } from 'vue'
import type { Placement } from '@popperjs/core'
import type select from './select.vue'
import type { ComponentSize } from '@forward-ui/constants';

export const selectProps = {
  modelValue: {
    type: definePropType<any[] | string | number | boolean | object>([
      Array,
      String,
      Number,
      Boolean,
      Object,
    ]),
  default: undefined
  },
  size: {
    type: definePropType<ComponentSize>(String),
    validator(value: ComponentSize) {
      return componentSizes.includes(value)
    },
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false
  },
  placement: {
    type: String as PropType<Placement>,
    validator(value: typeof placements[number]) {
      return placements.includes(value)
    },
    default: 'bottom-start',
  },
  effect: {
    type: String,
    default: 'light',
  },
  multiple: {
    type: Boolean,
    default: false
  }
} as const

export const emits = ['update:modelValue']

export type FSelectProps = ExtractPropTypes<typeof selectProps>
export type FSelectInstance = InstanceType<typeof select>

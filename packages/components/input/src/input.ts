import type { ExtractPropTypes, PropType, StyleValue } from 'vue';
import type input from './input.vue';
import { componentSizes } from '@forward-ui/constants';
import type { ComponentSize } from '@forward-ui/constants';
import { definePropType, iconPropType } from '@forward-ui/utils';

const resize = ['none', 'both', 'horizontal', 'vertical'] as const

type autosizeType = boolean | { minRows?: number, maxRows?:number }

export const inputProps = {
  modelValue: {
    type: [String, Number] as PropType<string | number>
  },
  type: {
    type: String,
    default: 'text'
  },
  showWordLimit: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: false
  },
  formatter: Function,
  parser: Function,
  showPassword: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    validator(value: ComponentSize) {
      return componentSizes.includes(value)
    },
    default: '',
  },
  prefixIcon: {
    type: iconPropType
  },
  suffixIcon: {
    type: iconPropType
  },
  rows: Number,
  autocomplete: {
    type: String,
    default: 'off'
  },
  resize: {
    type: String,
    validator(value: typeof resize[number]) {
      return resize.includes(value)
    }
  },
  inputStyle: {
    type: definePropType<StyleValue>([String, Array, Object]),
    default: () => ({})
  },
  autosize: {
    type: definePropType<autosizeType>([Boolean, Object])
  },
  readonly: {
    type: Boolean,
    default: false
  },
  form: {
    type: String
  },
  label: {
    type: String,
    default: undefined,
  },
  tabindex: {
    type: [String, Number],
    default: 0,
  },
  validateEvent: {
    type: Boolean,
    default: true,
  },
}

export type InputProps = ExtractPropTypes<typeof inputProps>
export type InputInstance = InstanceType<typeof input>

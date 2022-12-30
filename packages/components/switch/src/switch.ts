import {
  CHANGE_EVENT,
  INPUT_EVENT,
  UPDATE_MODEL_EVENT,
} from '@forward-ui/constants'
import {
  definePropType,
  iconPropType,
  isBoolean,
  isNumber,
  isString,
} from '@forward-ui/utils'
import type { ExtractPropTypes, PropType } from 'vue'
import type { ComponentSize } from '@forward-ui/constants'
import type Switch from './switch.vue'
import { isValidComponentSize } from '@forward-ui/utils/vue/validator'

export const switchProps = {
  id: String,
  name: {
    type: String,
    default: '',
  },
  width: {
    type: [String, Number] as PropType<string | number>,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: [Boolean, String, Number] as PropType<boolean | string | number>,
    default: false,
  },
  value: {
    type: [Boolean, String, Number] as PropType<boolean | string | number>,
    default: false,
  },
  activeValue: {
    type: [Boolean, String, Number] as PropType<boolean | string | number>,
    default: true,
  },
  inactiveValue: {
    type: [Boolean, String, Number] as PropType<boolean | string | number>,
    default: false,
  },
  inlinePrompt: {
    type: Boolean,
    default: false,
  },
  inactiveIcon: {
    type: iconPropType,
  },
  inactiveText: {
    type: String,
    default: '',
  },
  activeIcon: {
    type: iconPropType,
  },
  activeText: {
    type: String,
    default: '',
  },
  activeColor: {
    type: String,
    default: '',
  },
  inactiveColor: {
    type: String,
    default: '',
  },
  borderColor: {
    type: String,
    default: '',
  },
  size: {
    type: String as PropType<ComponentSize>,
    validator: isValidComponentSize,
  },
  beforeChange: {
    type: definePropType<() => Promise<boolean> | boolean>(Function),
  },
  tabindex: {
    type: [String, Number] as PropType<string | number>,
  },
} as const

export type SwitchProps = ExtractPropTypes<typeof switchProps>

export const switchEmits = {
  [UPDATE_MODEL_EVENT]: (val: boolean | string | number) =>
    isBoolean(val) || isString(val) || isNumber(val),
  [CHANGE_EVENT]: (val: boolean | string | number) =>
    isBoolean(val) || isString(val) || isNumber(val),
  [INPUT_EVENT]: (val: boolean | string | number) =>
    isBoolean(val) || isString(val) || isNumber(val),
}
export type SwitchEmits = typeof switchEmits

export type SwitchInstance = InstanceType<typeof Switch>

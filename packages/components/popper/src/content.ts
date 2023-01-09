import { placements } from '@popperjs/core'
import { definePropType } from '@forward-ui/utils';

import type { ExtractPropTypes, PropType, StyleValue } from 'vue'
import type { Options, Placement } from '@popperjs/core'
import type { Measurable } from '@forward-ui/utils'
import type Content from './content.vue'

type ClassObjectType = Record<string, boolean>
type ClassType = string | ClassObjectType | ClassType[]

const POSITIONING_STRATEGIES = ['fixed', 'absolute'] as const

export interface CreatePopperInstanceParams {
  referenceEl: Measurable
  popperContentEl: HTMLElement
  arrowEl: HTMLElement | undefined
}

export const popperCoreConfigProps = {
  boundariesPadding: {
    type: Number,
    default: 0,
  },
  fallbackPlacements: {
    type: definePropType<Placement[]>(Array),
    default: undefined,
  },
  gpuAcceleration: {
    type: Boolean,
    default: true,
  },
  offset: {
    type: Number,
    default: 12,
  },
  placement: {
    type: String as PropType<Placement>,
    validator(value: typeof placements[number]) {
      return placements.includes(value)
    },
    default: 'bottom',
  },
  popperOptions: {
    type: definePropType<Partial<Options>>(Object),
    default: () => ({}),
  },
  strategy: {
    type: String as PropType<typeof POSITIONING_STRATEGIES[number]>,
    validator(value: typeof POSITIONING_STRATEGIES[number]) {
      return POSITIONING_STRATEGIES.includes(value)
    },
    default: 'absolute',
  },
} as const
export type PopperCoreConfigProps = ExtractPropTypes<
  typeof popperCoreConfigProps
>

export const popperContentProps = {
  ...popperCoreConfigProps,
  id: String,
  style: {
    type: definePropType<StyleValue>([String, Array, Object]),
  },
  className: {
    type: definePropType<ClassType>([String, Array, Object]),
  },
  effect: {
    type: String,
    default: 'dark',
  },
  visible: Boolean,
  enterable: { // 鼠标是否可进入到 content 中
    type: Boolean,
    default: true,
  },
  pure: Boolean, // padding 是否为0
  focusOnShow: {
    type: Boolean,
    default: false,
  },
  trapping: {
    type: Boolean,
    default: false,
  },
  popperClass: {
    type: definePropType<ClassType>([String, Array, Object]),
  },
  popperStyle: {
    type: definePropType<StyleValue>([String, Array, Object]),
  },
  referenceEl: {
    type: definePropType<HTMLElement>(Object),
  },
  triggerTargetEl: {
    type: definePropType<HTMLElement>(Object),
  },
  stopPopperMouseEvent: {
    type: Boolean,
    default: true,
  },
  ariaLabel: {
    type: String,
    default: undefined,
  },
  virtualTriggering: Boolean,
  zIndex: Number,
} as const
export type PopperContentProps = ExtractPropTypes<typeof popperContentProps>

export const popperContentEmits = {
  mouseenter: (evt: MouseEvent) => evt instanceof MouseEvent,
  mouseleave: (evt: MouseEvent) => evt instanceof MouseEvent,
  focus: () => true,
  blur: () => true,
  close: () => true,
}
export type PopperContentEmits = typeof popperContentEmits

export type PopperContentInstance = InstanceType<typeof Content>

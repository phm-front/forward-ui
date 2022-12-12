import type { PropType, ExtractPropTypes } from 'vue'
import col from './col.vue'

export interface ColSizeObject {
  span?: number
  offset?: number
  pull?: number
  push?: number
}
export type ColSize = number | ColSizeObject
export const colProps = {
  span: {
    type: Number,
    default: 24
  },
  offset: {
    type: Number,
    default: 0
  },
  push: {
    type: Number,
    default: 0
  },
  pull: {
    type: Number,
    default: 0
  },
  tag: {
    type: String,
    default: 'div'
  },
  // <768px
  xs: {
    type: [Number, Object] as PropType<ColSize>,
    default: () => ({})
  },
  // ≥768px
  sm: {
    type: [Number, Object] as PropType<ColSize>,
    default: () => ({})
  },
  // ≥992px
  md: {
    type: [Number, Object] as PropType<ColSize>,
    default: () => ({})
  },
  // ≥1200px
  lg: {
    type: [Number, Object] as PropType<ColSize>,
    default: () => ({})
  },
  // ≥1920px
  xl: {
    type: [Number, Object] as PropType<ColSize>,
    default: () => ({})
  }
} as const

export type ColProps = ExtractPropTypes<typeof colProps>
export type ColInstance = InstanceType<typeof col>

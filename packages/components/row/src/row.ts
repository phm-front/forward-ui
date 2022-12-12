import type { ExtractPropTypes } from 'vue'
import Row from './row.vue'

export const RowJustify = [
  'start',
  'flex-start',
  'center',
  'end',
  'flex-end',
  'space-around',
  'space-between',
  'space-evenly',
] as const

export const RowAlign = ['top', 'middle', 'bottom'] as const

export const rowProps = {
  gutter: {
    type: Number,
    default: 0
  },
  justify: {
    type: String,
    validator(value: typeof RowJustify[number]) {
      return RowJustify.includes(value)
    },
    default: 'flex-start'
  },
  align: {
    type: String,
    validator(value: typeof RowAlign[number]) {
      return RowAlign.includes(value)
    },
    default: 'top'
  },
  tag: {
    type: String,
    default: 'div'
  }
} as const

export type RowProps = ExtractPropTypes<typeof rowProps>
export type RowInstance = InstanceType<typeof Row>

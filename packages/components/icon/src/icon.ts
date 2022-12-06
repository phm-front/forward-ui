import type { ExtractPropTypes, PropType } from 'vue'
import type Icon from './icon.vue'

export const iconProps = {
  color: String,
  size: [Number, String] as PropType<number | string>, // size 可以是数字，也可以是字符串
} as const // as const

export type Props = ExtractPropTypes<typeof iconProps>
export type IconInstance = InstanceType<typeof Icon>

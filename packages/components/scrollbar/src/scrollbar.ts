import type { ExtractPropTypes, PropType, StyleValue } from 'vue';
import scrollbar from './scrollbar.vue';
export const scrollbarProps = {
  height: {
    type: [String, Number] as PropType<string | number>,
    default: ''
  },
  maxHeight: {
    type: [String, Number] as PropType<string | number>,
    default: ''
  },
  native: {
    type: Boolean,
    default: false
  },
  wrapStyle: {
    type: [String, Object] as PropType<StyleValue>,
    default: '',
  },
  wrapClass: {
    type: String,
    default: ''
  },
  viewStyle: {
    type: [String, Object] as PropType<StyleValue>,
    default: '',
  },
  viewClass: {
    type: String,
    default: ''
  },
  noresize: {
    type: Boolean,
    default: false
  },
  tag: {
    type: String,
    default: 'div'
  },
  always: {
    type: Boolean,
    default: false
  },
  minSize: {
    type: Number,
    default: 20
  }
}

export type ScrollbarProps = ExtractPropTypes<typeof scrollbarProps>
export type ScrollbarInstance = InstanceType<typeof scrollbar>

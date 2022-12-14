import type { ExtractPropTypes } from 'vue';
import thumb from './thumb.vue';

export const thumbProps = {
  vertical: Boolean,
  size: String,
  move: Number,
  ratio: {
    type: Number,
    required: true,
  },
  always: Boolean,
}

export type ThumbProps = ExtractPropTypes<typeof thumbProps>
export type ThumbInstance = InstanceType<typeof thumb>

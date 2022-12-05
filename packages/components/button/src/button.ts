import type { ExtractPropTypes } from 'vue';
import Button from './button.vue';

export const buttonTypes = [
  'primary',
  'success',
  'warning',
  'info',
  'danger',
] as const;
export const buttonSizes = ['larg', 'default', 'small'] as const;

export const buttonProps = {
  size: {
    type: String,
    validator(value: typeof buttonSizes[number]) {
      return buttonSizes.includes(value);
    },
  },
  type: {
    type: String,
    validator(value: typeof buttonTypes[number]) {
      return buttonTypes.includes(value);
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
  icon: String,
  loadingIcon: {
    type: String,
    default: 'Loading',
  },
};

export type ButtonPropsType = ExtractPropTypes<typeof buttonProps>;
export type ButtonInstance = InstanceType<typeof Button>;

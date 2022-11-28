import type { ExtractPropTypes } from 'vue';

export const buttonTypes = [
  "default",
  "primary",
  "success",
  "warning",
  "info",
  "danger",
];
export const buttonSizes = ["larg", "default", "small"];

export const buttonProps = {
  type: {
    type: String,
    validator(value: string) {
      return buttonTypes.includes(value);
    },
    default: "default",
  },
  size: {
    type: String,
    validator(value: string) {
      return buttonSizes.includes(value);
    },
    default: "default",
  },
  plain: {
    type: Boolean,
    default: false
  },
  text: {
    type: Boolean,
    default: false
  },
  round: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  icon: String
};

export type ButtonPropsType = ExtractPropTypes<typeof buttonProps>

import { ExtractPropTypes } from "vue"
import { tooltipContentProps } from './content'
import { tooltipTriggerProps } from './trigger'
import { popperArrowProps, popperProps } from '@forward-ui/components/popper';

import type tooltip from './tooltip.vue';

export const tooltipProps = {
  ...tooltipContentProps,
  ...popperArrowProps,
  ...popperProps,
  ...tooltipTriggerProps,
  showArrow: {
    type: Boolean,
    default: true,
  },
}

export type FTooltipProps = ExtractPropTypes<typeof tooltipProps>
export type FTooltipInstance = InstanceType<typeof tooltip>

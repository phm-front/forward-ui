import { ExtractPropTypes } from "vue"
import { tooltipContentProps } from './content'
import { tooltipTriggerProps } from './trigger'
import { popperArrowProps, popperProps } from '@forward-ui/components/popper';
import { createModelToggleComposable } from '@forward-ui/hooks';

import type tooltip from './tooltip.vue';

export const {
  useModelToggle: useTooltipModelToggle,
  useModelToggleProps: useTooltipModelToggleProps,
  useModelToggleEmits: useTooltipModelToggleEmits,
} = createModelToggleComposable('visible' as const)

export const tooltipProps = {
  ...useTooltipModelToggleProps,
  ...tooltipContentProps,
  ...popperArrowProps,
  ...popperProps,
  ...tooltipTriggerProps,
  showArrow: {
    type: Boolean,
    default: true,
  },
}

export const tooltipEmits = [
  ...useTooltipModelToggleEmits,
  'before-show',
  'before-hide',
  'show',
  'hide',
  'open',
  'close',
]

export type FTooltipProps = ExtractPropTypes<typeof tooltipProps>
export type FTooltipInstance = InstanceType<typeof tooltip>

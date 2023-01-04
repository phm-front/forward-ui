import { ExtractPropTypes } from 'vue';
import { popperTriggerProps } from '@forward-ui/components/popper';
import { EVENT_CODE } from '@forward-ui/constants';
import { definePropType } from '@forward-ui/utils';
import type { Arrayable } from '@forward-ui/utils';

export type TooltipTriggerType = 'hover' | 'focus' | 'click' | 'contextmenu'

export const tooltipTriggerProps = {
  ...popperTriggerProps,
  disabled: Boolean,
  trigger: {
    type: definePropType<Arrayable<TooltipTriggerType>>([String, Array]),
    default: 'hover',
  },
  triggerKeys: {
    type: definePropType<string[]>(Array),
    default: () => [EVENT_CODE.enter, EVENT_CODE.space],
  }
}

export type FTooltipTriggerProps = ExtractPropTypes<typeof tooltipTriggerProps>

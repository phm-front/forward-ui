import { definePropType } from '@forward-ui/utils';
import { popperContentProps } from '@forward-ui/components/popper';
import { useNamespace, useDelayedToggleProps } from '@forward-ui/hooks';

import type { ExtractPropTypes } from 'vue';

const ns = useNamespace('tooltip')

export const tooltipContentProps = {
  ...useDelayedToggleProps,
  ...popperContentProps,
  appendTo: {
    type: definePropType<string | HTMLElement>([String, Object]),
  },
  content: {
    type: String,
    default: '',
  },
  rawContent: {
    type: Boolean,
    default: false,
  },
  persistent: Boolean,
  ariaLabel: String,
  visible: {
    type: definePropType<boolean | null>(Boolean),
    default: null,
  },
  transition: {
    type: String,
    default: `${ns.namespace.value}-fade-in-linear`,
  },
  teleported: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
  }
}

export type FTooltipContentProps = ExtractPropTypes<typeof tooltipContentProps>

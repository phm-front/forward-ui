<template>
  <f-popper ref="popperRef" :role="role">
    <f-tooltip-trigger :disabled="disabled">
      <slot v-if="$slots.default" />
    </f-tooltip-trigger>
    <f-tooltip-conent
      :placement="placement"
      :effect="effect"
      :persistent="persistent"
    >
      <slot name="content">
        <span v-if="rawContent" v-html="content" />
        <span v-else>{{ content }}</span>
      </slot>
      <f-popper-arrow v-if="showArrow" :arrow-offset="arrowOffset"></f-popper-arrow>
    </f-tooltip-conent>
  </f-popper>
</template>

<script setup lang="ts">
import { ref, provide, readonly, toRef } from 'vue'
import { tooltipProps } from './tooltip'
import { FPopper } from '@forward-ui/components/popper'
import { usePopperContainer, useId, useDelayedToggle } from '@forward-ui/hooks'
import { TOOLTIP_INJECTION_KEY } from '@forward-ui/utils'

import FTooltipConent from './content.vue';
import FTooltipTrigger from './trigger.vue';

import { FPopperArrow } from '@forward-ui/components/popper';

defineOptions({
  name: 'FTooltip',
})
const props = defineProps(tooltipProps)

usePopperContainer()
const id = useId()

const popperRef = ref<InstanceType<typeof FPopper> | null>()
const open = ref(false)

const show = (e?: Event) => {
  open.value = true
}
const hide = (e?: Event) => {
  open.value = false
}

const { onOpen, onClose } = useDelayedToggle({
  showAfter: toRef(props, 'showAfter'),
  hideAfter: toRef(props, 'hideAfter'),
  open: show,
  close: hide
})

provide(TOOLTIP_INJECTION_KEY, {
  id,
  open: readonly(open),
  onOpen: (e?: Event) => {
    onOpen(e)
  },
  onClose: (e?: Event) => {
    onClose(e)
  }
})
</script>

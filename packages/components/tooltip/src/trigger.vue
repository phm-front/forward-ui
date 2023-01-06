<template>
  <f-popper-trigger
    :id="id"
    :virtual-ref="virtualRef"
    :open="open"
    :virtual-triggering="virtualTriggering"
    :class="ns.e('trigger')"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
  >
    <slot />
  </f-popper-trigger>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { tooltipTriggerProps } from './trigger'
import { FPopperTrigger } from '@forward-ui/components/popper'
import { TOOLTIP_INJECTION_KEY } from '@forward-ui/utils'
import { useNamespace } from '@forward-ui/hooks'
defineOptions({
  name: 'FTooltipTrigger',
})

const props = defineProps(tooltipTriggerProps)
const { id, onOpen, onClose } = inject(TOOLTIP_INJECTION_KEY)!

const ns = useNamespace('tooltip')

const onMouseenter = () => {
  if (props.disabled) return
  onOpen()
}
const onMouseleave = () => {
  if (props.disabled) return
  onClose()
}
</script>

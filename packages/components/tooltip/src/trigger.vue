<template>
  <f-popper-trigger
    :id="id"
    :virtual-ref="virtualRef"
    :open="open"
    :virtual-triggering="virtualTriggering"
    :class="ns.e('trigger')"
    @blur="onBlur"
    @click="onClick"
    @contextmenu="onContextMenu"
    @focus="onFocus"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
    @keydown="onKeydown"
  >
    <slot />
  </f-popper-trigger>
</template>

<script setup lang="ts">
import { inject, unref, toRef, ref } from 'vue'
import { tooltipTriggerProps } from './trigger'
import { FPopperTrigger } from '@forward-ui/components/popper'
import { composeEventHandlers, TOOLTIP_INJECTION_KEY } from '@forward-ui/utils'
import { useNamespace } from '@forward-ui/hooks'
import { whenTrigger } from './utils'
import { FOnlyChild } from '@forward-ui/components/slot'

defineOptions({
  name: 'FTooltipTrigger',
})

const props = defineProps(tooltipTriggerProps)
const { id, open, onOpen, onClose, controlled, onToggle } = inject(
  TOOLTIP_INJECTION_KEY
)!

const ns = useNamespace('tooltip')

// TODO any is temporary, replace with `OnlyChildExpose | null` later
const triggerRef = ref<InstanceType<typeof FOnlyChild> | null>(null)

const stopWhenControlledOrDisabled = () => {
  if (unref(controlled) || props.disabled) {
    return true
  }
}
const trigger = toRef(props, 'trigger')
const onMouseenter = composeEventHandlers(
  stopWhenControlledOrDisabled,
  whenTrigger(trigger, 'hover', onOpen)
)
const onMouseleave = composeEventHandlers(
  stopWhenControlledOrDisabled,
  whenTrigger(trigger, 'hover', onClose)
)
const onClick = composeEventHandlers(
  stopWhenControlledOrDisabled,
  whenTrigger(trigger, 'click', (e) => {
    // 主按键被按下（通常为左键）或未初始化
    if ((e as MouseEvent).button === 0) {
      onToggle(e)
    }
  })
)

const onFocus = composeEventHandlers(
  stopWhenControlledOrDisabled,
  whenTrigger(trigger, 'focus', onOpen)
)

const onBlur = composeEventHandlers(
  stopWhenControlledOrDisabled,
  whenTrigger(trigger, 'focus', onClose)
)

const onContextMenu = composeEventHandlers(
  stopWhenControlledOrDisabled,
  whenTrigger(trigger, 'contextmenu', (e: Event) => {
    e.preventDefault()
    onToggle(e)
  })
)

const onKeydown = composeEventHandlers(
  stopWhenControlledOrDisabled,
  (e: KeyboardEvent) => {
    const { code } = e
    if (props.triggerKeys.includes(code)) {
      e.preventDefault()
      onToggle(e)
    }
  }
)

defineExpose({
  triggerRef,
})
</script>

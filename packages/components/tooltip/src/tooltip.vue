<template>
  <f-popper ref="popperRef" :role="role">
    <f-tooltip-trigger
      :disabled="disabled"
      :trigger="trigger"
      :trigger-keys="triggerKeys"
      :virtual-ref="virtualRef"
      :virtual-triggering="virtualTriggering"
    >
      <slot v-if="$slots.default" />
    </f-tooltip-trigger>
    <f-tooltip-conent
      ref="contentRef"
      :aria-label="ariaLabel"
      :content="content"
      :disabled="disabled"
      :effect="effect"
      :enterable="enterable"
      :fallback-placements="fallbackPlacements"
      :hide-after="hideAfter"
      :gpu-acceleration="gpuAcceleration"
      :offset="offset"
      :persistent="persistent"
      :popper-class="popperClass"
      :popper-style="popperStyle"
      :placement="placement"
      :popper-options="popperOptions"
      :pure="pure"
      :raw-content="rawContent"
      :reference-el="referenceEl"
      :trigger-target-el="triggerTargetEl"
      :show-after="showAfter"
      :strategy="strategy"
      :teleported="teleported"
      :append-to="appendTo"
      :transition="transition"
      :virtual-triggering="virtualTriggering"
      :z-index="zIndex"
    >
      <slot name="content">
        <span v-if="rawContent" v-html="content" />
        <span v-else>{{ content }}</span>
      </slot>
      <f-popper-arrow
        v-if="showArrow"
        :arrow-offset="arrowOffset"
      ></f-popper-arrow>
    </f-tooltip-conent>
  </f-popper>
</template>

<script setup lang="ts">
import {
  ref,
  provide,
  readonly,
  toRef,
  unref,
  computed,
  watch,
  onDeactivated,
} from 'vue'
import { tooltipProps, useTooltipModelToggle, tooltipEmits } from './tooltip'
import { FPopper } from '@forward-ui/components/popper'
import { usePopperContainer, useId, useDelayedToggle } from '@forward-ui/hooks'
import { isBoolean, TOOLTIP_INJECTION_KEY } from '@forward-ui/utils'

import FTooltipConent from './content.vue'
import FTooltipTrigger from './trigger.vue'

import { FPopperArrow } from '@forward-ui/components/popper'

defineOptions({
  name: 'FTooltip',
})
const props = defineProps(tooltipProps)
const emit = defineEmits(tooltipEmits)

usePopperContainer()
const id = useId()

const open = ref(false)
const toggleReason = ref<Event>()

const { show, hide, hasUpdateHandler } = useTooltipModelToggle({
  indicator: open,
  toggleReason,
})

const { onOpen, onClose } = useDelayedToggle({
  showAfter: toRef(props, 'showAfter'),
  hideAfter: toRef(props, 'hideAfter'),
  open: show,
  close: hide,
})

const popperRef = ref<InstanceType<typeof FPopper> | null>()
const contentRef = ref<InstanceType<typeof FTooltipConent> | null>()

const controlled = computed(
  () => isBoolean(props.visible) && !hasUpdateHandler.value
)

const updatePopper = () => {
  const popperComponent = unref(popperRef)
  if (popperComponent) {
    popperComponent.popperInstanceRef?.update()
  }
}
// popper是否存在处于聚焦状态的element
const isFocusInsideContent = () => {
  const popperContent: HTMLElement | undefined =
    contentRef.value?.contentRef?.popperContentRef
  return popperContent && popperContent.contains(document.activeElement)
}

provide(TOOLTIP_INJECTION_KEY, {
  id,
  open: readonly(open),
  trigger: toRef(props, 'trigger'),
  controlled, // 是否可以更改visible的值
  onOpen: (e?: Event) => {
    onOpen(e)
  },
  onClose: (e?: Event) => {
    onClose(e)
  },
  onToggle: (event?: Event) => {
    if (unref(open)) {
      onClose(event)
    } else {
      onOpen(event)
    }
  },
  onShow: () => {
    emit('show', toggleReason.value)
  },
  onHide: () => {
    emit('hide', toggleReason.value)
  },
  onBeforeShow: () => {
    emit('before-show', toggleReason.value)
  },
  onBeforeHide: () => {
    emit('before-hide', toggleReason.value)
  },
  updatePopper,
})

watch(
  () => props.disabled,
  (disabled) => {
    if (disabled && open.value) {
      open.value = false
    }
  }
)

onDeactivated(() => open.value && hide())

defineExpose({
  popperRef,
  contentRef,
  isFocusInsideContent,
  updatePopper,
  onOpen,
  onClose,
  hide
})
</script>

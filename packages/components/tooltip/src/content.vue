<template>
  <teleport :disabled="!teleported" :to="appendTo">
    <transition
      :name="transition"
      @after-leave="onTransitionLeave"
      @before-enter="onBeforeEnter"
      @after-enter="onAfterShow"
      @before-leave="onBeforeLeave"
    >
      <f-popper-content
        v-if="shouldRender"
        v-show="shouldShow"
        ref="contentRef"
        :id="id"
        v-bind="$attrs"
        :aria-label="ariaLabel"
        :aria-hidden="ariaHidden"
        :offset="offset"
        :gpu-acceleration="gpuAcceleration"
        :fallback-placements="fallbackPlacements"
        :placement="placement"
        :effect="effect"
        :popper-options="popperOptions"
        :strategy="strategy"
        :enterable="enterable"
        :pure="pure"
        :popper-class="popperClass"
        :popper-style="[popperStyle, contentStyle]"
        :reference-el="referenceEl"
        :trigger-target-el="triggerTargetEl"
        :visible="shouldShow"
        :z-index="zIndex"
        @mouseenter="onContentEnter"
        @mouseleave="onContentLeave"
        @blur="onBlur"
        @close="onClose"
      >
        <template v-if="!destroyed">
          <slot />
        </template>
      </f-popper-content>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { computed, inject, unref, ref, onBeforeUnmount, watch } from 'vue'
import { FPopperContent } from '@forward-ui/components/popper'
import { usePopperContainerId } from '@forward-ui/hooks'
import { TOOLTIP_INJECTION_KEY } from '@forward-ui/utils'
import { tooltipContentProps } from './content'
import { onClickOutside } from '@vueuse/core'

defineOptions({
  name: 'FTooltipContent',
})

const props = defineProps(tooltipContentProps)
const {
  controlled,
  id,
  open,
  trigger,
  onClose,
  onOpen,
  onShow,
  onHide,
  onBeforeShow,
  onBeforeHide,
} = inject(TOOLTIP_INJECTION_KEY, undefined)!

const { selector } = usePopperContainerId()

const destroyed = ref(false)
const contentRef = ref<InstanceType<typeof FPopperContent> | null>()

const appendTo = computed(() => props.appendTo || selector.value)
const persistentRef = computed(() => {
  // For testing, we would always want the content to be rendered
  // to the DOM, so we need to return true here.
  if (process.env.NODE_ENV === 'test') {
    return true
  }
  return props.persistent
})
const shouldRender = computed(() => {
  return unref(persistentRef) ? true : unref(open)
})
const shouldShow = computed(() => {
  return props.disabled ? false : unref(open)
})
const ariaHidden = computed(() => !unref(open))
const contentStyle = computed(() => (props.style ?? {}) as any)

const onTransitionLeave = () => {
  onHide()
}

const onBeforeEnter = () => {
  contentRef.value?.updatePopper?.()
  onBeforeShow?.()
}

const onBeforeLeave = () => {
  onBeforeHide?.()
}

let stopHandle: ReturnType<typeof onClickOutside>

const onAfterShow = () => {
  onShow()
  // 点击指定元素以外 回调
  stopHandle = onClickOutside(
    computed(() => {
      return contentRef.value?.popperContentRef
    }),
    () => {
      if (unref(controlled)) return
      const $trigger = unref(trigger)
      if ($trigger !== 'hover') {
        onClose()
      }
    }
  )
}

const onContentEnter = () => {
  onOpen()
}

const onContentLeave = () => {
  onClose()
}

const onBlur = () => {
  if (!props.virtualTriggering) {
    onClose()
  }
}

onBeforeUnmount(() => {
  destroyed.value = true
})

watch(
  () => unref(open),
  (val) => {
    if (!val) {
      stopHandle?.()
    }
  },
  {
    flush: 'post', // dom更新完成后 回调
  }
)

watch(
  () => props.content,
  () => {
    contentRef.value?.updatePopper?.()
  }
)

defineExpose({
  contentRef,
})
</script>

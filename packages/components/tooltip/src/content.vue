<template>
  <teleport :to="appendTo">
    <transition :name="transition">
      <f-popper-content
        v-if="shouldRender"
        v-show="shouldShow"
        :placement="placement"
        :effect="effect"
        @mouseenter="onContentEnter"
        @mouseleave="onContentLeave"
      >
        <template v-if="!destroyed">
          <slot />
        </template>
      </f-popper-content>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { computed, inject, unref, ref, onBeforeUnmount } from 'vue'
import { FPopperContent } from '@forward-ui/components/popper'
import { usePopperContainerId } from '@forward-ui/hooks'
import { TOOLTIP_INJECTION_KEY } from '@forward-ui/utils'
import { tooltipContentProps } from './content'

defineOptions({
  name: 'FTooltipContent',
})

const props = defineProps(tooltipContentProps)
const { open, onOpen, onClose } = inject(TOOLTIP_INJECTION_KEY, undefined)!

const { selector } = usePopperContainerId()

const destroyed = ref(false)

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

const onContentEnter = () => {
  onOpen()
}

const onContentLeave = () => {
  onClose()
}

onBeforeUnmount(() => {
  destroyed.value = true
})
</script>

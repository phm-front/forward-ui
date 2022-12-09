<template>
  <section :class="([ns.b(), ns.is('vertical', isVertical)])">
    <slot />
  </section>
</template>

<script setup lang="ts">
import { useNamespace } from '@forward-ui/hooks/use-namespace'
import { computed, useSlots } from 'vue';
import type { VNode, Component } from 'vue'

defineOptions({
  name: 'FContainer',
});

const props = defineProps({
  direction: {
    type: String
  }
} as const)

const ns = useNamespace('container')
const slots = useSlots()
const isVertical = computed(() => {
  if (props.direction === 'horizontal') {
    return false
  } else if (props.direction === 'vertical') {
    return true
  }
  // 默认子元素中有 FHeader 或 FFooter 时为 vertical，否则为 horizontal
  if (slots && slots.default) {
    const vNodes: VNode[] = slots.default()
    return vNodes.some(vNode => {
      const tag = (vNode.type as Component).name
      return tag === 'FHeader' || tag === 'FFooter'
    })
  }
  return false
})
</script>

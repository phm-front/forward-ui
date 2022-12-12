<template>
  <component
    :class="[ns.b(), ns.is(align, align !== 'top')]"
    :is="tag"
    :style="style"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'
import type { CSSProperties } from 'vue'
import { useNamespace } from '@forward-ui/hooks'
import { rowContextKey } from '@forward-ui/utils'
import { rowProps } from './row'
defineOptions({
  name: 'FRow',
})

const props = defineProps(rowProps)
const gutter = computed(() => props.gutter)
provide(rowContextKey, {
  gutter,
})
const ns = useNamespace('row')
const style = computed(() => {
  const style: CSSProperties = {}
  if (props.gutter) {
    style.marginLeft = style.marginRight = `-${props.gutter / 2}px`
  }
  return { ...ns.cssVarBlock({ 'justify-content': props.justify }), ...style }
})
</script>

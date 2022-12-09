<template>
  <header :class="ns.b()" :style="style">
    <slot />
  </header>
</template>

<script setup lang="ts">
import { useNamespace } from '@forward-ui/hooks'
import { computed } from 'vue'

defineOptions({
  name: 'FHeader',
})
const props = defineProps({
  height: {
    type: String,
    default: null,
  },
} as const)

const ns = useNamespace('header')

const style = computed(() => {
  return props.height ? ns.cssVarBlock({ height: props.height }) : {}
})
</script>

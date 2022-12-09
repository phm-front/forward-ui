<template>
  <footer :class="ns.b()" :style="style">
    <slot />
  </footer>
</template>

<script setup lang="ts">
import { useNamespace } from '@forward-ui/hooks'
import { computed } from 'vue'

defineOptions({
  name: 'FFooter',
})
const props = defineProps({
  height: {
    type: String,
    default: null,
  },
} as const)

const ns = useNamespace('footer')

const style = computed(() => {
  return props.height ? ns.cssVarBlock({ height: props.height }) : {}
})
</script>

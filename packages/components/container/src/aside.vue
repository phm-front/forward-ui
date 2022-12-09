<template>
  <aside :class="ns.b()" :style="style">
    <slot />
  </aside>
</template>

<script setup lang="ts">
import { useNamespace } from '@forward-ui/hooks'
import { computed } from 'vue'
defineOptions({
  name: 'FAside',
})
const props = defineProps({
  width: {
    type: String,
    default: null,
  },
} as const)
const ns = useNamespace('aside')
const style = computed(() =>
  props.width ? ns.cssVarBlock({ width: props.width }) : {}
)
</script>

<template>
  <div :class="[ns.b(), ns.m(direction)]" :style="dividerStyle">
    <div
      v-if="$slots.default && direction !== 'vertical'"
      :class="[ns.e('text'), ns.is(contentPosition)]"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '@forward-ui/hooks'
import { dividerProps } from './divider'
import type { CSSProperties } from 'vue'

defineOptions({
  name: 'FDivider',
})

const props = defineProps(dividerProps)

const ns = useNamespace('divider')

const dividerStyle = computed(() => {
  let cssVarStyle = {
    'border-style': props.borderStyle,
    'border-width': '1px',
  }
  if (props.borderStyle === 'double') {
    cssVarStyle['border-width'] = '2px'
  }
  return ns.cssVar(cssVarStyle) as CSSProperties
})
</script>

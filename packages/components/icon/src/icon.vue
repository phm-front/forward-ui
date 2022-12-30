<template>
  <i :class="ns.b()" :style="style" v-bind="$attrs">
    <slot />
  </i>
</template>

<script setup lang="ts">
import { useNamespace } from '@forward-ui/hooks/use-namespace'
import { isUndefined, addUnit } from '@forward-ui/utils'
import { computed } from 'vue'
import type { CSSProperties } from 'vue'

import { iconProps } from './icon'

defineOptions({
  name: 'FIcon',
  inheritAttrs: false,
})

const ns = useNamespace('icon')
const props = defineProps(iconProps)
const style = computed<CSSProperties>(() => {
  const { color, size } = props
  if (!color && !size) return {}
  return {
    fontSize: isUndefined(size) ? undefined : addUnit(size),
    '--color': color, // 设置css变量
  }
})
</script>

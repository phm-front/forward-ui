<template>
  <component :is="tag" :class="colClass" :style="style">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import type { CSSProperties } from 'vue';
import { useNamespace } from '@forward-ui/hooks';
import { isNumber, rowContextKey } from '@forward-ui/utils';
import { colProps } from './col'
import { isObject } from '@vue/shared';
defineOptions({
  name: 'FCol',
});
const props = defineProps(colProps)
const ns = useNamespace('col')
const { gutter } = inject(rowContextKey, { gutter: computed(() => 0) })
const style = computed(() => {
  const style: CSSProperties = {}
  if (gutter.value) {
    style.paddingLeft = style.paddingRight = `${gutter.value / 2}px`
  }
  return style
})
const colClass = computed(() => {
  const classes: string[] = []
  const pos = ['span', 'offset', 'pull', 'push'] as const
  pos.forEach(prop => {
    const size = props[prop]
    if(isNumber(size)) {
      if (prop === 'span') {
        classes.push(ns.b(String(size)))
      } else if (size > 0) {
        classes.push(ns.b(`${prop}-${size}`))
      }
    }
  })
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
  sizes.forEach(size => {
    const sizeV = props[size]
    if (isNumber(sizeV)) {
      classes.push(ns.b(`${size}-${sizeV}`))
    } else if (isObject(sizeV)) {
      Object.entries(sizeV).forEach(([key, val]) => {
        if (key === 'span') {
          classes.push(ns.b(`${size}-${val}`))
        } else {
          classes.push(ns.b(`${key}-${size}-${val}`))
        }
      })
    }
  })
  if (gutter.value) {
    classes.push(ns.is('guttered'))
  }
  return [ns.b(), ...classes]
})
</script>

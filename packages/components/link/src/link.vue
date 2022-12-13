<template>
  <a
    :class="linkCls"
    :href="disabled || !href ? undefined : href"
    @click="handleClick"
  >
    <FIcon v-if="icon"><component :is="icon" /></FIcon>
    <span v-if="$slots.default" :class="ns.e('inner')">
      <slot />
    </span>
    <slot v-if="$slots.icon" name="icon" />
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { FIcon } from '@forward-ui/components/icon'
import { useNamespace } from '@forward-ui/hooks'
import { linkProps, linkEmits } from './link'

defineOptions({
  name: 'FLink',
})
const props = defineProps(linkProps)
const emit = defineEmits(linkEmits)
const ns = useNamespace('link')

const linkCls = computed(() => [
  ns.b(),
  ns.m(props.type),
  ns.is('disabled', props.disabled),
  ns.is('underline', props.underline && !props.disabled),
])

function handleClick(event: MouseEvent) {
  if (!props.disabled) emit('click', event)
}
</script>

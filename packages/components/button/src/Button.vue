<template>
  <button
    :class="[
      ns.b(),
      ns.m(type),
      ns.m(size),
      ns.is('round', round),
      ns.is('circle', circle),
      ns.is('plain', plain),
      ns.is('disabled', disabled),
      ns.is('link', link),
      ns.is('text', text),
      ns.is('bg', bg),
      ns.is('loading', loading),
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
    v-bind="$attrs"
  >
    <template v-if="loading">
      <slot v-if="$slots.loading" name="loading"></slot>
      <f-icon v-else :class="ns.is('loading')">
        <component :is="loadingIcon"></component>
      </f-icon>
    </template>
    <f-icon v-else-if="icon || $slots.icon">
      <component :is="icon" v-if="icon" />
      <slot v-else name="icon" />
    </f-icon>
    <span v-if="$slots.default">
      <slot />
    </span>
  </button>
</template>
<script setup lang="ts">
import FIcon from '@forward-ui/components/icon'
import { useNamespace } from '@forward-ui/hooks'
import { buttonProps } from './button'

defineOptions({
  name: 'FButton',
})
defineProps(buttonProps)
const emit = defineEmits(['click'])

const ns = useNamespace('button')

const handleClick = (evt: MouseEvent) => {
  emit('click', evt)
}
</script>

<template>
  <button
    :class="[
      ns.b(),
      ns.m(type),
      ns.m(size),
      ns.is('plain', plain)
    ]"
  >
    <span>
      <slot />
    </span>
  </button>
</template>
<script setup lang="ts">
import { useNamespace } from '@forward-ui/hooks';
import { buttonProps } from "./button";

defineOptions({
  name: 'FButton',
})

const ns = useNamespace('button')
defineProps(buttonProps);
</script>

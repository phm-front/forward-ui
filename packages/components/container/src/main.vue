<template>
  <main :class="ns.b()">
    <slot />
  </main>
</template>

<script setup lang="ts">
import { useNamespace } from '@forward-ui/hooks'
defineOptions({
  name: 'FMain',
});

const ns = useNamespace('main')
</script>

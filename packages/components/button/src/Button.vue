<template>
  <button
    :class="[
      ns.b()
    ]"
  >
    qqqq
  </button>
</template>
<script setup lang="ts">
import { useNamespace } from '@forward-ui/hooks';
// import { buttonProps } from "./button";

defineOptions({
  name: 'FButton',
})

const ns = useNamespace('button')
// const props = defineProps(buttonProps);
</script>

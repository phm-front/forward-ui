<template>
  <span ref="arrowRef" :class="ns.e('arrow')" data-popper-arrow></span>
</template>

<script setup lang="ts">
import { inject, watch, onBeforeUnmount } from 'vue';
import { useNamespace } from '@forward-ui/hooks';
import { POPPER_CONTENT_INJECTION_KEY } from '@forward-ui/utils';
import { popperArrowProps } from './arrow';

defineOptions({
  name: 'FPopperArrow',
});
const props = defineProps(popperArrowProps)

const ns = useNamespace('popper')
const { arrowRef, arrowOffset } = inject(POPPER_CONTENT_INJECTION_KEY)!

watch(
  () => props.arrowOffset,
  (val) => {
    arrowOffset.value = val
  }
)
onBeforeUnmount(() => {
  arrowRef.value = undefined
})
defineExpose({
  arrowRef,
})
</script>

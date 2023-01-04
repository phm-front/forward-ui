<template>
  <f-popper ref="popperRef" :role="role">

  </f-popper>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue';
import { tooltipProps } from './tooltip';
import { FPopper } from '@forward-ui/components/popper';
import { usePopperContainer, useId } from '@forward-ui/hooks';

import { TOOLTIP_INJECTION_KEY } from '@forward-ui/utils';
defineOptions({
  name: 'FTooltip',
});
defineProps(tooltipProps)

usePopperContainer()
const id = useId()

const popperRef = ref<InstanceType<typeof FPopper> | null>()

provide(TOOLTIP_INJECTION_KEY, {
  id
})
</script>

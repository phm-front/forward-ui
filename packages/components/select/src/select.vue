<template>
  <div :class="selectCls">
    <f-tooltip
      trigger="click"
      :placement="placement"
      :transition="`${selectNs.namespace.value}-zoom-in-top`"
      :fallback-placements="['bottom-start', 'top-start', 'right', 'left']"
      :effect="effect"
      :gpu-acceleration="false"
    >
      <template #default>
        <div class="select-trigger">
          <f-input v-model="selectedLabel" readonly></f-input>
        </div>
      </template>
      <template #content>
        <div>content</div>
      </template>
    </f-tooltip>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { useNamespace } from '@forward-ui/hooks'
import { selectProps, emits } from './select'
import { useSelectStates, useSelect } from './useSelect';

import { FTooltip } from '@forward-ui/components/tooltip'
import { FInput } from '@forward-ui/components/input'

defineOptions({
  name: 'FSelect',
})
const props = defineProps(selectProps)

const selectNs = useNamespace('select')
const emit = defineEmits(emits)
const states = useSelectStates(props)
const {

} = useSelect(props, states, { emit })

const { selectedLabel } = toRefs(states)

const selectCls = computed(() => {
  const classes = [selectNs.b()]
  if (props.size) {
    classes.push(selectNs.m(props.size))
  }
  if (props.disabled) {
    classes.push(selectNs.m('disabled'))
  }
  return classes
})
</script>

<template>
  <!-- TODO:tooltip -->
  <f-switch
    v-model="value"
    style="--f-switch-on-color: #13ce66; --f-switch-off-color: #ff4949"
    active-value="100"
    inactive-value="0"
    @change="onChange"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('100')
const onChange = (val) => {
  console.log(value.value, val)
}
</script>

<template>
  <div class="wrapper" style="width: 500px">
    <f-input
      v-model="input"
      placeholder="Please input"
      clearable
      :formatter="formatter"
    />
    <f-input v-model="input" disabled placeholder="Please input" />
    <f-input
      type="textarea"
      v-model="input"
      autosize
      placeholder="Please input"
    />
    <f-input
      type="textarea"
      disabled
      v-model="input"
      placeholder="Please input"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const input = ref('222')
const formatter = (val: string | number) => {
  return `${val}`.replaceAll('?', '!')
}
</script>

<style>
.wrapper > * {
  margin-top: 10px;
}
</style>

<template>
  <div>
    <f-button
      v-for="i in 3"
      :key="i"
      @mouseover="(e) => (buttonRef = e.currentTarget)"
      @click="visible = !visible"
      >Click to open tooltip</f-button
    >
  </div>

  <f-tooltip
    ref="tooltipRef"
    v-model:visible="visible"
    :virtual-ref="buttonRef"
    virtual-triggering
    trigger="click"
  >
    <template #content>
      <span> Some content </span>
    </template>
  </f-tooltip>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'singleton'
})
</script>
<script setup lang="ts">
import { ref } from 'vue'
const buttonRef = ref()
const tooltipRef = ref()

const visible = ref(false)
</script>


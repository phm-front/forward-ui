<template>
  <f-tooltip :visible="visible">
    <template #content>
      <span>Content</span>
    </template>
    <f-button @mouseenter="visible = true" @mouseleave="visible = false">
      Hover me
    </f-button>
  </f-tooltip>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>

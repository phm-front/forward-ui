<template>
  <f-switch v-model="value1" />
  <f-switch v-model="value2" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value1 = ref(true)
// const value2 = ref(false)
const value2 = ref(3)
</script>

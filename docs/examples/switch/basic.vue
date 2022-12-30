<template>
  <f-switch v-model="value1" />
  <f-switch
    v-model="value2"
    class="ml-2"
    style="--f-switch-on-color: #13ce66; --f-switch-off-color: #ff4949"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref(true)
const value2 = ref(true)
</script>

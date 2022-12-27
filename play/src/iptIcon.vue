<template>
  <div class="demo-input-suffix">
    <f-row :gutter="20">
      <span class="ml-3 w-35 text-gray-600 inline-flex items-center"
        >Using attributes</span
      >
      <f-input
        v-model="input1"
        class="w-50 m-2"
        placeholder="Pick a date"
        :suffix-icon="Calendar"
      />
      <f-input
        v-model="input2"
        class="w-50 m-2"
        placeholder="Type something"
        :prefix-icon="Search"
      />
    </f-row>
  </div>
  <div class="demo-input-suffix">
    <f-row :gutter="20">
      <span class="ml-3 w-35 text-gray-600 inline-flex items-center"
        >Using slots</span
      >
      <f-input v-model="input3" class="w-50 m-2" placeholder="Pick a date">
        <template #suffix>
          <f-icon class="f-input__icon"><calendar /></f-icon>
        </template>
      </f-input>
      <f-input v-model="input4" class="w-50 m-2" placeholder="Type something">
        <template #prefix>
          <f-icon class="f-input__icon"><search /></f-icon>
        </template>
      </f-input>
    </f-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Calendar, Search } from '@element-plus/icons-vue'
const input1 = ref('')
const input2 = ref('')
const input3 = ref('')
const input4 = ref('')
</script>

<style scoped>
.demo-input-suffix {
  width: 500px;
  padding-left: 16px;
}
.f-input {
  margin-top: 16px;
}
</style>

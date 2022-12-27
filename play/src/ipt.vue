<template>
  <div class="wrapper" style="width: 500px">
    <f-input
      type="password"
      v-model="input"
      placeholder="Please input"
      show-password
      clearable
      :formatter="formatter"
    />
    <f-input clearable v-model="input" disabled placeholder="Please input" />
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
    <f-input v-model="input" placeholder="Please input" />
    <f-input v-model="input1" placeholder="Please input">
      <template #prepend>Http://</template>
    </f-input>
    <f-input v-model="input2" placeholder="Please input">
      <template #append>.com</template>
    </f-input>
    <f-input v-model="input2" placeholder="Please input">
      <template #append>
        <f-button :icon="Search"></f-button>
      </template>
    </f-input>
    <f-input v-model="input1" size="large" placeholder="large input" />
    <f-input v-model="input1" placeholder="default input" />
    <f-input v-model="input1" size="small" placeholder="small input" />
    <f-input v-model="input" maxlength="10" show-word-limit></f-input>
    <f-input
      v-model="textarea"
      maxlength="30"
      placeholder="Please input"
      type="textarea"
    />
  </div>
</template>

<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'
const input = ref('222')
const input1 = ref('')
const input2 = ref('')
const textarea = ref('')
const formatter = (val: string | number) => {
  return `${val}`.replaceAll('?', '!')
}
</script>

<style>
.wrapper > * {
  margin-top: 10px;
}
</style>

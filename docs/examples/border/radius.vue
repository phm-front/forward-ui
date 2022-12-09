<template>
  <!-- TODO:row/col组件 -->
  <div class="demo-radius flex justify-between flex-wrap">
    <div v-for="(radius, i) in radiusGroup" :key="radius.name">
      <div class="title">{{ radius.name }}</div>
      <div class="value">
        <code>border-radius:{{ getValue(radius.type) || '0px' }}</code>
      </div>
      <div
        class="radius"
        :style="{
          borderRadius: radius.type
            ? `var(--f-border-radius-${radius.type})`
            : '',
        }"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const radiusGroup = ref([
  {
    name: 'No Radius',
    type: '',
  },
  {
    name: 'Small Radius',
    type: 'small',
  },
  {
    name: 'Large Radius',
    type: 'base',
  },
  {
    name: 'Round Radius',
    type: 'round',
  },
])

const getValue = (type: string) => {
  const getCssVarValue = (prefix, type) =>
    getComputedStyle(document.documentElement).getPropertyValue(
      `--f-${prefix}-${type}`
    )
  return getCssVarValue('border-radius', type)
}
</script>
<style scoped>
.demo-radius .title {
  color: var(--f-text-color-regular);
  font-size: 18px;
  margin: 10px 0;
}
.demo-radius .value {
  color: var(--f-text-color-primary);
  font-size: 16px;
  margin: 10px 0;
}
.demo-radius .radius {
  height: 40px;
  width: 70%;
  border: 1px solid var(--f-border-color);
  border-radius: 0;
  margin-top: 20px;
}
</style>

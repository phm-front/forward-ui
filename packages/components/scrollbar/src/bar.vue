<template>
  <Thumb
    vertical
    :size="height"
    :move="moveY"
    :ratio="ratioY"
    :always="always"
    @update-move="handleMoveChange"
  ></Thumb>
  <Thumb
    :vertical="false"
    :size="width"
    :move="moveX"
    :ratio="ratioX"
    :always="always"
    @update-move="handleMoveChange"
  ></Thumb>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Thumb from './thumb.vue'
import { barProps } from './bar'

const props = defineProps(barProps)

const moveX = ref(0)
const moveY = ref(0)
// 计算滚动
const handleScroll = (wrap: HTMLDivElement) => {
  if (wrap) {
    moveX.value = (wrap.scrollLeft * 100 / wrap.offsetWidth) * props.ratioX
    moveY.value = (wrap.scrollTop * 100 / wrap.offsetHeight) * props.ratioY
  }
}
// flag true为vertical
const handleMoveChange = (flag: boolean, val: number) => {
  if(flag) {
    moveY.value = val
  } else {
    moveX.value = val
  }
}
defineExpose({
  handleScroll
})

</script>

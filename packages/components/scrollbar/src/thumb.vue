<template>
  <transition :name="ns.b('fade')">
    <div
      :class="[ns.e('bar'), ns.is(vertical ? 'vertical' : 'horizontal')]"
      v-show="always || visible"
    >
      <div :class="[ns.e('thumb')]" :style="style" @mousedown=""></div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, inject, computed } from 'vue'
import type { CSSProperties } from 'vue'
import { useEventListener } from '@vueuse/core'
import { thumbProps } from './thumb'
import { useNamespace } from '@forward-ui/hooks'
import { scrollbarContextKey } from '@forward-ui/utils'

const ns = useNamespace('scrollbar')
const props = defineProps(thumbProps)
const { scrollbarElement } = inject(scrollbarContextKey)!
const visible = ref(false)

const style = computed(() => {
  const styleObj: CSSProperties = {}
  if (!props.size) return {}
  if (props.vertical) {
    styleObj.height = props.size
    styleObj.transform = `translateY(${props.move}%)`
  } else {
    styleObj.width = props.size
    styleObj.transform = `translateX(${props.move}%)`
  }
  return styleObj
})

const mouseoverHandle = () => {
  visible.value = !!props.size
}
const mouseleaveHandle = () => {
  visible.value = false
}
// 添加监听事件
useEventListener(scrollbarElement, 'mouseover', mouseoverHandle)
useEventListener(scrollbarElement, 'mouseleave', mouseleaveHandle)
</script>

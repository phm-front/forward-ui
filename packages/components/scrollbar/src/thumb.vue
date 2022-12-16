<template>
  <transition :name="ns.b('fade')">
    <div
      ref="barRef"
      :class="[ns.e('bar'), ns.is(vertical ? 'vertical' : 'horizontal')]"
      v-show="always || visible"
    >
      <div
        :class="[ns.e('thumb')]"
        :style="style"
        @mousedown="handleVerMousedown"
      ></div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, inject, computed, onBeforeUnmount } from 'vue'
import type { CSSProperties } from 'vue'
import { useEventListener, isClient } from '@vueuse/core'
import { thumbProps } from './thumb'
import { useNamespace } from '@forward-ui/hooks'
import { scrollbarContextKey } from '@forward-ui/utils'

const ns = useNamespace('scrollbar')
const props = defineProps(thumbProps)
const emit = defineEmits(['updateMove'])

const { scrollbarElement, maxTransitionX, maxTransitionY, wrapElement } =
  inject(scrollbarContextKey)!
const visible = ref(false)
// 是否正在拖动滚动条
const mousedowning = ref(false)
const barRef = ref<HTMLDivElement>()
let originalOnSelectStart:
  | ((this: GlobalEventHandlers, ev: Event) => any)
  | null = isClient ? document.onselectstart : null

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

const scrollToByMove = () => {
  wrapElement.value?.scrollTo({
    left: ((props.move! / 100) * wrapElement.value.offsetWidth) / props.ratio!,
    top: ((props.move! / 100) * wrapElement.value.offsetHeight) / props.ratio!,
  })
}

// 竖直方向滚动条mousedown事件
const handleVerMousedown = (e: MouseEvent) => {
  e.stopPropagation()
  originalOnSelectStart = document.onselectstart
  // 禁止拖动过程中选其他元素
  document.onselectstart = () => false
  let { pageY, pageX } = e
  const cacheMove = props.move!
  mousedowning.value = true
  document.onmousemove = (e: MouseEvent) => {
    e.stopPropagation()
    const movePageY = e.pageY
    const movePageX = e.pageX
    let distancePersent: number
    let res: number
    if (props.vertical) {
      distancePersent =
        ((movePageY - pageY) * 100) / Number(props.size?.split('px')[0])
      res = cacheMove + distancePersent
    } else {
      distancePersent =
        ((movePageX - pageX) * 100) / Number(props.size?.split('px')[0])
      res = cacheMove + distancePersent
    }
    const flag = props.vertical ? true : false
    const max = props.vertical ? maxTransitionY : maxTransitionX
    if (res > 0 && res < max.value) {
      // 滚动条移动
      emit('updateMove', flag, res)
    } else if (res <= 0) {
      emit('updateMove', flag, 0)
    } else {
      emit('updateMove', flag, max.value)
    }
    scrollToByMove()
  }
  document.onmouseup = () => {
    if (document.onselectstart !== originalOnSelectStart) {
      document.onselectstart = originalOnSelectStart
    }
    mousedowning.value = true
    document.onmousemove = null
    document.onmouseup = null
  }
}

const mouseoverHandle = () => {
  visible.value = !!props.size
}
const mouseleaveHandle = () => {
  if (!mousedowning.value) {
    visible.value = false
  }
}
// 添加监听事件
const cleanup1 =useEventListener(scrollbarElement, 'mouseover', mouseoverHandle)
const cleanup2 =useEventListener(scrollbarElement, 'mouseleave', mouseleaveHandle)


onBeforeUnmount(() => {
  cleanup1()
  cleanup2()
})
</script>

<template>
  <div ref="scrollbarRef" :class="ns.b()">
    <div
      ref="wrapRef"
      :class="wrapClasses"
      :style="wrapStyle"
      @scroll="handleScroll"
    >
      <component
        ref="viewRef"
        :is="tag"
        :class="[ns.e('view'), wrapClass]"
        :style="viewStyle"
      >
        <slot />
      </component>
    </div>
    <!-- 滚动条 -->
    <template v-if="!native">
      <bar
        ref="barRef"
        :always="always"
        :width="sizeWidth"
        :height="sizeHeight"
        :ratio-x="ratioX"
        :ratio-y="ratioY"
      ></bar>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, provide, onMounted } from 'vue'
import { useNamespace } from '@forward-ui/hooks'
import { isNumber, useResizeObserver } from '@vueuse/core';
import { scrollbarContextKey, debugWarn } from '@forward-ui/utils'
import { scrollbarProps } from './scrollbar'
import { addUnit } from '@forward-ui/utils'
import { GAP } from './utils'
import Bar from './bar.vue'
import { isObject } from '@vue/shared';
defineOptions({
  name: 'FScrollbar',
})
const COMPONENT_NAME = 'FScrollbar'
const props = defineProps(scrollbarProps)
const emit = defineEmits(['scroll'])

const wrapRef = ref<HTMLDivElement>()
const scrollbarRef = ref<HTMLDivElement>()
const viewRef = ref<HTMLElement>()
const barRef = ref<InstanceType<typeof Bar>>()
const sizeWidth = ref('0')
const sizeHeight = ref('0')
const maxTransitionY = ref(0)
const maxTransitionX = ref(0)
// 滚动比率
const ratioX = ref(1)
const ratioY = ref(1)

provide(scrollbarContextKey, {
  scrollbarElement: scrollbarRef,
  wrapElement: wrapRef,
  maxTransitionY,
  maxTransitionX
})

const ns = useNamespace('scrollbar')

const wrapClasses = computed(() => {
  return [
    ns.e('wrap'),
    props.wrapClass,
    // 隐藏原生滚动条
    { [ns.em('wrap', 'hidden-native')]: !props.native },
  ]
})
const wrapStyle = computed(() => {
  return [
    props.wrapStyle,
    {
      height: addUnit(props.height),
      maxHeight: addUnit(props.maxHeight)
    },
  ]
})

// TODO: refactor method overrides, due to script setup dts
// @ts-nocheck
function scrollTo(xCord: number, yCord?: number): void
function scrollTo(options: ScrollToOptions): void
function scrollTo(arg1: unknown, arg2?: number) {
  if (isObject(arg1)) {
    wrapRef.value!.scrollTo(arg1)
  } else if (isNumber(arg1) && isNumber(arg2)) {
    wrapRef.value!.scrollTo(arg1, arg2)
  }
}

const setScrollTop = (value: number) => {
  if (!isNumber(value)) {
    debugWarn(COMPONENT_NAME, 'value must be a number')
    return
  }
  wrapRef.value!.scrollTop = value
}

const setScrollLeft = (value: number) => {
  if (!isNumber(value)) {
    debugWarn(COMPONENT_NAME, 'value must be a number')
    return
  }
  wrapRef.value!.scrollLeft = value
}

const handleScroll = () => {
  if (wrapRef.value) {
    barRef.value?.handleScroll(wrapRef.value)

    emit('scroll', {
      scrollLeft: wrapRef.value.scrollLeft,
      scrollTop: wrapRef.value.scrollTop
    })
  }
}
// 更新滚动条状态
const update = () => {
  if (!wrapRef.value) return
  // vertical滚动条高度
  const barHeight = wrapRef.value.offsetHeight - GAP
  // 水平滚动条宽度
  const barWidth = wrapRef.value.offsetWidth - GAP
  // 滚动条thumb高度
  const thumbHeight =
    (wrapRef.value.offsetHeight / wrapRef.value.scrollHeight) * barHeight
  // 滚动条thumb宽度
  const thumbWidth =
    (wrapRef.value.offsetWidth / wrapRef.value.scrollWidth) * barWidth
  // 滚动条实际宽高
  const realHeight = Math.max(props.minSize, thumbHeight)
  const realWidth = Math.max(props.minSize, thumbWidth)
  console.log(realWidth)
  // 计算滚动比率
  ratioY.value =
    realHeight < barHeight
      ? (barHeight - realHeight) /
        realHeight /
        ((barHeight - thumbHeight) / thumbHeight)
      : 1
  ratioX.value =
    realWidth < barWidth
      ? (barWidth - realWidth) /
        realWidth /
        ((barWidth - thumbWidth) / thumbWidth)
      : 1

  sizeHeight.value = realHeight < barHeight ? `${realHeight}px` : ''
  sizeWidth.value = realWidth < barWidth ? `${realWidth}px` : ''

  maxTransitionY.value =
    realHeight < barHeight ? ((barHeight - realHeight) * 100) / realHeight : 0
  maxTransitionX.value =
    realWidth < barWidth ? ((barWidth - realWidth) * 100) / realWidth : 0
}

// 尺寸改变重新计算滚动条相关数据
useResizeObserver(viewRef, update)
useResizeObserver(wrapRef, update)

onMounted(() => {
  if (!props.native) {
    update()
  }
})
defineExpose({
  wrapRef,
  update,
  handleScroll,
  scrollTo,
  setScrollTop,
  setScrollLeft
})
</script>

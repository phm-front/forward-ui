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
import { scrollbarContextKey } from '@forward-ui/utils'
import { scrollbarProps } from './scrollbar'
import { addUnit } from '@forward-ui/utils'
import { GAP } from './utils'
import Bar from './bar.vue'
defineOptions({
  name: 'FScrollbar',
})
const props = defineProps(scrollbarProps)

const wrapRef = ref<HTMLDivElement>()
const scrollbarRef = ref<HTMLDivElement>()
const viewRef = ref<HTMLElement>()
const barRef = ref<InstanceType<typeof Bar>>()
const sizeWidth = ref('0')
const sizeHeight = ref('0')
// 滚动比率
const ratioX = ref(1)
const ratioY = ref(1)

provide(scrollbarContextKey, {
  scrollbarElement: scrollbarRef,
  wrapElement: wrapRef,
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
      maxHeight: addUnit(props.maxHeight),
    },
  ]
})

const handleScroll = () => {
  if (wrapRef.value) {
    barRef.value?.handleScroll(wrapRef.value)
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
}

onMounted(() => {
  if (!props.native) {
    update()
  }
})
</script>

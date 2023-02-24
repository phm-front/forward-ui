<template>
  <transition
    :name="ns.b('fade')"
    @before-leave="onClose"
    @after-leave="$emit('destroy')"
  >
    <div
      v-show="visible"
      ref="messageRef"
      :id="id"
      :class="[
        ns.b(),
        { [ns.m(type)]: type && !icon },
        customClass,
        ns.is('center', center),
        ns.is('closable', showClose),
      ]"
      :style="customStyle"
    >
      <!-- TODO:badge组件 -->
      <div v-if="repeatNum > 1">{{ repeatNum }}</div>
      <f-icon v-if="iconComponent" :class="[ns.e('icon'), typeClass]">
        <component :is="iconComponent" />
      </f-icon>
      <slot>
        <p v-if="!dangerouslyUseHTMLString" :class="ns.e('content')">
          {{ message }}
        </p>
        <p v-else :class="ns.e('content')" v-html="message" />
      </slot>
      <f-icon v-if="showClose" :class="ns.e('closeBtn')" @click.stop="close">
        <Close />
      </f-icon>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useNamespace } from '@forward-ui/hooks'
import { TypeComponentsMap, TypeComponents } from '@forward-ui/utils'
import { useResizeObserver, useTimeoutFn } from '@vueuse/core'
import { computed, CSSProperties, onMounted, ref, watch } from 'vue'
import { getLastOffset } from './instance'
import { messageProps } from './message'

const { Close } = TypeComponents

defineOptions({
  name: 'FMessage',
})

const props = defineProps(messageProps)
const ns = useNamespace('message')

const messageRef = ref<HTMLDivElement>()

const visible = ref(false)
const height = ref(0)

let stopTimer: (() => void) | undefined = undefined

const typeClass = computed(() => {
  const type = props.type
  return { [ns.bm('icon', type)]: type && TypeComponentsMap[type] }
})

const iconComponent = computed(
  () => props.icon || TypeComponentsMap[props.type] || ''
)

const lastOffset = computed(() => getLastOffset(props.id))
const offset = computed(() => props.offset + lastOffset.value)
const bottom = computed((): number => height.value + offset.value)
const customStyle = computed<CSSProperties>(() => ({
  top: `${offset.value}px`,
  zIndex: props.zIndex,
}))

function startTimer() {
  if (props.duration === 0) return
  ;({ stop: stopTimer } = useTimeoutFn(() => {
    close()
  }, props.duration))
}

function clearTimer() {
  stopTimer?.()
}

function close() {
  visible.value = false
}

onMounted(() => {
  startTimer()
  visible.value = true
})

watch(
  () => props.repeatNum,
  () => {
    clearTimer()
    startTimer()
  }
)

useResizeObserver(messageRef, () => {
  height.value = messageRef.value!.getBoundingClientRect().height
})

defineExpose({
  visible,
  bottom,
  close,
})
</script>

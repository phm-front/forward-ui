<template>
  <div
    :class="containerCls"
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave"
  >
    <template v-if="props.type !== 'textarea'">
      <div :class="[inputNs.e('wrapper'), inputNs.is('focus', isFocus)]">
        <input
          ref="input"
          :class="inputNs.e('inner')"
          :type="props.type"
          :disabled="disabled"
          :value="props.modelValue"
          :formatter="formatter"
          :parser="parser"
          v-bind="$attrs"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <!-- input suffix -->
        <span v-if="suffixVisible" :class="inputNs.e('suffix')">
          <span :class="inputNs.e('suffix-inner')">
            <!-- clear icon -->
            <f-icon
              v-if="showClear"
              :class="[inputNs.e('icon'), inputNs.e('clear')]"
              @mousedown.prevent="NOOP"
              @click="clear"
            >
              <circle-close />
            </f-icon>
          </span>
        </span>
      </div>
    </template>
    <template v-else>
      <textarea
        ref="textarea"
        :class="[textareaNs.e('inner')]"
        :style="textareaStyle"
        :value="props.modelValue"
        :disabled="disabled"
        :rows="rows"
        v-bind="$attrs"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, shallowRef, onMounted, watch, nextTick } from 'vue'
import type { StyleValue, CSSProperties } from 'vue'
import { calcTextareaHeight } from './utils'
import { isClient, useResizeObserver, isObject } from '@vueuse/core'
import { useNamespace, useCursor } from '@forward-ui/hooks'
import { inputProps } from './input'
import { UPDATE_MODEL_EVENT } from '@forward-ui/constants'
import { NOOP } from '@vue/shared'

import { FIcon } from '@forward-ui/components'
import { CircleClose } from '@element-plus/icons-vue'
import { debugWarn } from '@forward-ui/utils'
type TargetElement = HTMLInputElement | HTMLTextAreaElement
defineOptions({
  name: 'FInput',
})

const props = defineProps(inputProps)
const emit = defineEmits([
  UPDATE_MODEL_EVENT,
  'focus',
  'blur',
  'change',
  'input',
  'clear',
])

const inputNs = useNamespace('input')
const textareaNs = useNamespace('textarea')

const isFocus = ref(false)
const isHover = ref(false)
const textareaCalcStyle = shallowRef(props.inputStyle)
const textarea = ref<HTMLTextAreaElement>()
const input = ref<HTMLInputElement>()

const [recordCursor, setCursor] = useCursor(input)

const _ref = computed(() => input.value || textarea.value)
const containerCls = computed(() => [
  props.type === 'textarea' ? textareaNs.b() : inputNs.b(),
  inputNs.is('disabled', props.disabled),
])
const textareaStyle = computed<StyleValue>(() => [
  props.inputStyle,
  textareaCalcStyle.value,
  { resize: props.resize } as CSSProperties,
])
const showClear = computed(() => {
  return (
    props.clearable &&
    props.modelValue &&
    !props.disabled &&
    (isFocus.value || isHover.value)
  )
})
const suffixVisible = computed(() => {
  return showClear.value
})

const handleInput = async (e: Event) => {
  recordCursor()
  let { value } = e.target as TargetElement
  if (props.formatter) {
    value = props.parser ? props.parser(value) : value
    value = props.formatter(value)
  }
  emit(UPDATE_MODEL_EVENT, value)
  emit('input', value)
  await nextTick()
  setCursor()
}
const handleFocus = (e: FocusEvent) => {
  isFocus.value = true
  emit('focus', e)
}
const handleBlur = (e: FocusEvent) => {
  isFocus.value = false
  emit('blur', e)
}
const handleMouseenter = () => {
  isHover.value = true
}
const handleMouseleave = () => {
  isHover.value = false
}
const focus = async () => {
  await nextTick()
  _ref.value?.focus()
}
const clear = (e: MouseEvent) => {
  emit(UPDATE_MODEL_EVENT, '')
  emit('change', '')
  emit('clear')
  emit('input', '')
  focus()
}
const resizeTextarea = () => {
  const { type, autosize } = props
  if (type !== 'textarea' || !isClient) return
  if (autosize) {
    const minRows = isObject(autosize) ? autosize.minRows : undefined
    const maxRows = isObject(autosize) ? autosize.maxRows : undefined
    textareaCalcStyle.value = {
      ...calcTextareaHeight(textarea.value!, minRows, maxRows),
    }
  } else {
    textareaCalcStyle.value = {
      minHeight: calcTextareaHeight(textarea.value!).minHeight,
    }
  }
}
useResizeObserver(textarea, (entries) => {
  // console.log(entries)
})
watch(
  () => props.modelValue,
  () => {
    nextTick(resizeTextarea)
  }
)
watch(
  () => props.type,
  async () => {
    await nextTick()
    resizeTextarea()
  }
)
onMounted(() => {
  if (!props.formatter && props.parser) {
    debugWarn(
      'ElInput',
      'If you set the parser, you also need to set the formatter.'
    )
  }
  resizeTextarea()
})
</script>

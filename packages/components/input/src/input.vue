<template>
  <div
    :class="containerCls"
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave"
  >
    <template v-if="props.type !== 'textarea'">
      <!-- prepend slot -->
      <div v-if="$slots.prepend" :class="inputNs.be('group', 'prepend')">
        <slot name="prepend" />
      </div>

      <div :class="[inputNs.e('wrapper'), inputNs.is('focus', isFocus)]">
        <!-- prefix -->
        <span v-if="$slots.prefix || prefixIcon" :class="inputNs.e('prefix')">
          <span :class="inputNs.e('prefix-inner')">
            <slot name="prefix" />
            <f-icon v-if="prefixIcon" :class="inputNs.e('icon')">
              <component :is="prefixIcon"></component>
            </f-icon>
          </span>
        </span>
        <input
          ref="input"
          :class="inputNs.e('inner')"
          :type="inputType"
          :disabled="disabled"
          :value="props.modelValue"
          :formatter="formatter"
          :parser="parser"
          :readonly="readonly"
          :autocomplete="autocomplete"
          :form="props.form"
          :aria-label="label"
          :tabindex="tabindex"
          v-bind="$attrs"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          @compositionstart="handleCompositionStart"
          @compositionupdate="handleCompositionUpdate"
          @compositionend="handleCompositionEnd"
        />
        <!-- input suffix -->
        <span v-if="suffixVisible" :class="inputNs.e('suffix')">
          <span :class="inputNs.e('suffix-inner')">
            <template v-if="!showClear || !showPwd || !isWordLimitVisible">
              <slot name="suffix" />
              <f-icon v-if="suffixIcon" :class="inputNs.e('icon')">
                <component :is="suffixIcon" />
              </f-icon>
            </template>
            <!-- clear icon -->
            <f-icon
              v-if="showClear"
              :class="[inputNs.e('icon'), inputNs.e('clear')]"
              @mousedown.prevent="NOOP"
              @click="clear"
            >
              <circle-close />
            </f-icon>
            <!-- password icon -->
            <f-icon
              v-if="showPwd"
              :class="[inputNs.e('icon'), inputNs.e('password')]"
              @click="handlePwdIconClick"
            >
              <component :is="pwsIcon"></component>
            </f-icon>
            <span v-if="isWordLimitVisible" :class="inputNs.e('count')">
              <span :class="inputNs.e('count-inner')">
                {{ textLength }} / {{ $attrs.maxlength }}
              </span>
            </span>
          </span>
        </span>
      </div>

      <!-- append slot -->
      <div v-if="$slots.append" :class="inputNs.be('group', 'append')">
        <slot name="append" />
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
        :readonly="readonly"
        :autocomplete="autocomplete"
        :form="props.form"
        :aria-label="label"
        :tabindex="tabindex"
        v-bind="$attrs"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @compositionstart="handleCompositionStart"
        @compositionupdate="handleCompositionUpdate"
        @compositionend="handleCompositionEnd"
      />
      <span
        v-if="isWordLimitVisible"
        :style="countStyle"
        :class="textareaNs.e('count')"
      >
        {{ textLength }} / {{ attrs.maxlength }}
      </span>
    </template>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  shallowRef,
  onMounted,
  watch,
  nextTick,
  useSlots,
  useAttrs,
} from 'vue'
import type { StyleValue, CSSProperties } from 'vue'
import { calcTextareaHeight } from './utils'
import { isClient, useResizeObserver, isObject } from '@vueuse/core'
import { useNamespace, useCursor } from '@forward-ui/hooks'
import { isKorean } from '@forward-ui/utils'
import { inputProps } from './input'
import { UPDATE_MODEL_EVENT } from '@forward-ui/constants'
import { NOOP } from '@vue/shared'
import { isNil } from 'lodash-unified'

import { FIcon } from '@forward-ui/components'
import {
  CircleClose,
  Hide as IconHide,
  View as IconView,
} from '@element-plus/icons-vue'
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
  'compositionstart',
  'compositionupdate',
  'compositionend',
])
const slots = useSlots()
const attrs = useAttrs()
const inputNs = useNamespace('input')
const textareaNs = useNamespace('textarea')

const isFocus = ref(false)
const isHover = ref(false)
const textareaCalcStyle = shallowRef(props.inputStyle)
const textarea = ref<HTMLTextAreaElement>()
const input = ref<HTMLInputElement>()
const pwdVisible = ref(false)
// 输入汉字未合成时 控制不更新modelValue
const isComposing = ref(false)
const countStyle = ref<StyleValue>()

const [recordCursor, setCursor] = useCursor(input)

const _ref = computed(() => input.value || textarea.value)
const nativeInputValue = computed(() =>
  isNil(props.modelValue) ? '' : String(props.modelValue)
)
const containerCls = computed(() => [
  props.type === 'textarea' ? textareaNs.b() : inputNs.b(),
  inputNs.is('disabled', props.disabled),
  inputNs.is('exceed', inputExceed.value),
  inputNs.m(props.size),
  {
    [inputNs.b('group')]: slots.prepend || slots.append,
    [inputNs.bm('group', 'append')]: slots.append,
    [inputNs.bm('group', 'prepend')]: slots.prepend,
    [inputNs.m('prefix')]: slots.prefix || props.prefixIcon,
    [inputNs.m('suffix')]:
      slots.suffix || props.suffixIcon || props.clearable || props.showPassword,
    [inputNs.bm('suffix', 'password-clear')]: showClear.value && showPwd.value,
  },
  attrs.class
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
    !props.readonly &&
    (isFocus.value || isHover.value)
  )
})
const showPwd = computed(() => {
  return (
    props.showPassword && props.modelValue && !props.readonly && !props.disabled
  )
})
const suffixVisible = computed(() => {
  return true
})
const pwsIcon = computed(() => {
  return pwdVisible.value ? IconView : IconHide
})
const inputType = computed(() => {
  if (props.type === 'password') {
    return pwdVisible.value ? 'text' : 'password'
  }
  return props.type
})
const isWordLimitVisible = computed(
  () =>
    props.showWordLimit &&
    !!attrs.maxlength &&
    (props.type === 'text' || props.type === 'textarea') &&
    !props.disabled &&
    !props.readonly &&
    !props.showPassword
)
const textLength = computed(() => Array.from(nativeInputValue.value).length)
const inputExceed = computed(
  () =>
    // show exceed style if length of initial value greater then maxlength
    !!isWordLimitVisible.value &&
    textLength.value > Number(attrs.maxlength)
)

const setNativeInputValue = () => {
  const input = _ref.value
  if (!input || input.value === nativeInputValue.value) return
  input.value = nativeInputValue.value
}

const handleInput = async (e: Event) => {
  recordCursor()
  let { value } = e.target as TargetElement
  if (props.formatter) {
    value = props.parser ? props.parser(value) : value
    value = props.formatter(value)
  }
  // 输入汉字未合成时 不更新modelValue
  if (isComposing.value) return

  if (value === nativeInputValue.value) {
    setNativeInputValue()
    return
  }

  emit(UPDATE_MODEL_EVENT, value)
  emit('input', value)
  await nextTick()
  setNativeInputValue()
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

const handleCompositionStart = (event: CompositionEvent) => {
  emit('compositionstart', event)
  isComposing.value = true
}

const handleCompositionUpdate = (event: CompositionEvent) => {
  emit('compositionupdate', event)
  const text = (event.target as HTMLInputElement)?.value
  const lastCharacter = text[text.length - 1] || ''
  isComposing.value = !isKorean(lastCharacter) // 是否是韩文
}

const handleCompositionEnd = (event: CompositionEvent) => {
  emit('compositionend', event)
  if (isComposing.value) {
    isComposing.value = false
    handleInput(event)
  }
}

const focus = async () => {
  await nextTick()
  _ref.value?.focus()
}
const blur = () => _ref.value?.blur()
const handlePwdIconClick = () => {
  pwdVisible.value = !pwdVisible.value
  focus()
}
const clear = () => {
  emit(UPDATE_MODEL_EVENT, '')
  emit('change', '')
  emit('clear')
  emit('input', '')
  focus()
}
const select = () => {
  _ref.value?.select()
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
  if (!isWordLimitVisible.value || props.resize !== 'both') return
  const entry = entries[0]
  const { width } = entry.contentRect
  countStyle.value = {
    /** right: 100% - width + padding(15) + right(6) */
    right: `calc(100% - ${width + 15 + 6}px)`,
  }
})
// see: https://github.com/ElemeFE/element/issues/14521
watch(nativeInputValue, () => setNativeInputValue())
watch(
  () => props.modelValue,
  () => {
    nextTick(resizeTextarea)
    if (props.validateEvent) {
      // formItem?.validate?.('change').catch((err) => debugWarn(err))
    }
  }
)
watch(
  () => props.type,
  async () => {
    await nextTick()
    setNativeInputValue()
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
  setNativeInputValue()
  nextTick(resizeTextarea)
})

defineExpose({
  blur,
  focus,
  clear,
  input,
  ref: _ref,
  resizeTextarea,
  select,
  textarea,
  textareaStyle
})
</script>

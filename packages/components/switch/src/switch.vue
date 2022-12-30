<template>
  <div :class="switchKls" :style="styles" @click.prevent="switchValue">
    <!-- TODO:接入Form -->
    <input
      ref="input"
      :class="ns.e('input')"
      :name="name"
      type="checkbox"
      :aria-checked="checked"
      :aria-disabled="switchDisabled"
      :disabled="switchDisabled"
      :true-value="activeValue"
      :false-value="inactiveValue"
      :tabindex="tabindex"
      @change="handleChange"
      @keydown.enter="switchValue"
    />

    <span
      v-if="!inlinePrompt && (inactiveIcon || inactiveText)"
      :class="[
        ns.e('label'),
        ns.em('label', 'left'),
        ns.is('active', !checked),
      ]"
    >
      <f-icon v-if="inactiveIcon"><component :is="inactiveIcon" /></f-icon>
      <span v-if="!inactiveIcon && inactiveText" :aria-hidden="checked">{{
        inactiveText
      }}</span>
    </span>

    <span ref="core" :class="ns.e('core')" :style="coreStyle">
      <div v-if="inlinePrompt" :class="ns.e('inner')">
        <template v-if="activeIcon || inactiveIcon">
          <f-icon :class="ns.is('icon')">
            <component :is="checked ? activeIcon : inactiveIcon" />
          </f-icon>
        </template>
        <template v-else-if="activeText || inactiveText">
          <span :class="ns.is('text')" :aria-hidden="!checked">
            {{ checked ? activeText : inactiveText }}
          </span>
        </template>
      </div>

      <div :class="ns.e('action')">
        <f-icon v-if="loading" :class="ns.is('loading')"><Loading /></f-icon>
      </div>
    </span>

    <span
      v-if="!inlinePrompt && (activeIcon || activeText)"
      :class="[
        ns.e('label'),
        ns.em('label', 'right'),
        ns.is('active', checked),
      ]"
    >
      <f-icon v-if="activeIcon">
        <component :is="activeIcon" />
      </f-icon>
      <span v-if="!activeIcon && activeText" :aria-hidden="!checked">{{
        activeText
      }}</span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useNamespace } from '@forward-ui/hooks'
import FIcon from '@forward-ui/components/icon'
import { Loading } from '@element-plus/icons-vue'
import {
  CHANGE_EVENT,
  INPUT_EVENT,
  UPDATE_MODEL_EVENT,
} from '@forward-ui/constants'
import { switchProps, switchEmits } from './switch'
import type { CSSProperties } from 'vue'
import { addUnit, debugWarn, isBoolean, throwError } from '@forward-ui/utils'
import { isPromise } from '@vue/shared'

const COMPONENT_NAME = 'FSwitch'
defineOptions({
  name: COMPONENT_NAME,
})

const props = defineProps(switchProps)
const emit = defineEmits(switchEmits)
const ns = useNamespace('switch')

const switchDisabled = computed(() => props.loading || props.disabled)

const switchKls = computed(() => [
  ns.b(),
  props.size && ns.m(props.size),
  ns.is('disabled', switchDisabled.value),
  ns.is('checked', checked.value),
])

const isControlled = ref(props.modelValue !== false)
const input = ref<HTMLInputElement>()
const core = ref<HTMLSpanElement>()

const coreStyle = computed<CSSProperties>(() => ({
  width: addUnit(props.width),
}))

const actualValue = computed(() => {
  return isControlled.value ? props.modelValue : props.value
})

const checked = computed(() => props.activeValue === actualValue.value)
if (![props.activeValue, props.inactiveValue].includes(actualValue.value)) {
  emit(UPDATE_MODEL_EVENT, props.inactiveValue)
  emit(CHANGE_EVENT, props.inactiveValue)
  emit(INPUT_EVENT, props.inactiveValue)
}

watch(checked, (val) => {
  input.value!.checked = val
  // if (props.validateEvent) {
  //   formItem?.validate?.('change').catch((err) => debugWarn(err))
  // }
})

watch(
  () => props.modelValue,
  () => {
    isControlled.value = true
  }
)

const handleChange = () => {
  const val = checked.value ? props.inactiveValue : props.activeValue
  emit(UPDATE_MODEL_EVENT, val)
  emit(CHANGE_EVENT, val)
  emit(INPUT_EVENT, val)
  nextTick(() => {
    input.value!.checked = checked.value
  })
}

const switchValue = () => {
  if (switchDisabled.value) return
  const { beforeChange } = props
  if (!beforeChange) {
    handleChange()
    return
  }

  const shouldChange = beforeChange()
  const isPromiseOrBool = [
    isPromise(shouldChange),
    isBoolean(shouldChange),
  ].includes(true)
  if (!isPromiseOrBool) {
    throwError(
      COMPONENT_NAME,
      'beforeChange must return type `Promise<boolean>` or `boolean`'
    )
  }

  if (isPromise(shouldChange)) {
    shouldChange
      .then((result) => {
        if (result) {
          handleChange()
        }
      })
      .catch((e) => {
        debugWarn(COMPONENT_NAME, `some error occurred: ${e}`)
      })
  } else if (shouldChange) {
    handleChange()
  }
}

const styles = computed(() => {
  return ns.cssVarBlock({
    ...(props.activeColor ? { 'on-color': props.activeColor } : null),
    ...(props.inactiveColor ? { 'off-color': props.inactiveColor } : null),
    ...(props.borderColor ? { 'border-color': props.borderColor } : null),
  })
})

onMounted(() => {
  input.value!.checked = checked.value
})

const focus = (): void => {
  input.value?.focus?.()
}

defineExpose({
  /**
   *  @description manual focus to the switch component
   **/
  focus,
  /**
   * @description whether Switch is checked
   */
  checked,
})
</script>

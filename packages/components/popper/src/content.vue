<template>
  <div
    ref="popperContentRef"
    :style="contentStyle"
    :class="contentClass"
    tabindex="-1"
    @mouseenter="(e) => $emit('mouseenter', e)"
    @mouseleave="(e) => $emit('mouseleave', e)"
  >
    <f-focus-trap
      :trapped="trapped"
      :trap-on-focus-in="true"
      :focus-trap-el="popperContentRef"
      :focus-start-el="focusStartRef"
      @focus-after-trapped="onFocusAfterTrapped"
      @focus-after-released="onFocusAfterReleased"
      @focusin="onFocusInTrap"
      @focusout-prevented="onFocusoutPrevented"
      @release-requested="onReleaseRequested"
    >
      <slot />
    </f-focus-trap>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  provide,
  computed,
  unref,
  onMounted,
  watch,
  inject,
  onBeforeUnmount,
} from 'vue'
import {
  POPPER_CONTENT_INJECTION_KEY,
  POPPER_INJECTION_KEY,
  isElement,
} from '@forward-ui/utils'
import { useZIndex, useNamespace } from '@forward-ui/hooks'
import { popperContentProps, popperContentEmits } from './content'
import { unwrapMeasurableEl, buildPopperOptions } from './utils'
import { createPopper } from '@popperjs/core'
import { isNil } from 'lodash-unified'

import type { WatchStopHandle } from 'vue'
import type { CreatePopperInstanceParams } from './content'
import FFocusTrap from '@forward-ui/components/focus-trap'

defineOptions({
  name: 'FPopperContent',
})

const { nextZIndex } = useZIndex()
const ns = useNamespace('popper')

const props = defineProps(popperContentProps)
const emit = defineEmits(popperContentEmits)
const { popperInstanceRef, contentRef, triggerRef, role } = inject(
  POPPER_INJECTION_KEY,
  undefined
)!

const popperContentRef = ref<HTMLElement>()
const arrowRef = ref<HTMLElement>()
const arrowOffset = ref<number>()
const contentZIndex = ref<number>(props.zIndex || nextZIndex())
const trapped = ref<boolean>(false)
const focusStartRef = ref<'container' | 'first' | HTMLElement>('first')

let triggerTargetAriaStopWatch: WatchStopHandle | undefined = undefined

provide(POPPER_CONTENT_INJECTION_KEY, {
  arrowRef,
  arrowOffset,
})

const contentStyle = computed(
  () => [{ zIndex: unref(contentZIndex) }, props.popperStyle] as any
)
const contentClass = computed(() => [
  ns.b(),
  ns.is('pure', props.pure),
  ns.is(props.effect),
  props.popperClass,
])
const computedReference = computed(
  () => unwrapMeasurableEl(props.referenceEl) || unref(triggerRef)
)
const ariaModal = computed<string | undefined>(() => {
  return role && role.value === 'dialog' ? 'false' : undefined
})

const updatePopper = (shouldUpdateZIndex = true) => {
  unref(popperInstanceRef)?.update()
  shouldUpdateZIndex && (contentZIndex.value = props.zIndex || nextZIndex())
}

const onFocusAfterTrapped = () => {
  emit('focus')
}

const onFocusAfterReleased = (event: CustomEvent) => {
  if (event.detail?.focusReason !== 'pointer') {
    focusStartRef.value = 'first'
    emit('blur')
  }
}

const onFocusInTrap = (event: FocusEvent) => {
  if (props.visible && !trapped.value) {
    if (event.target) {
      focusStartRef.value = event.target as typeof focusStartRef.value
    }
    trapped.value = true
  }
}

const onFocusoutPrevented = (event: CustomEvent) => {
  if (!props.trapping) {
    if (event.detail.focusReason === 'pointer') {
      event.preventDefault()
    }
    trapped.value = false
  }
}

const onReleaseRequested = () => {
  trapped.value = false
  emit('close')
}

const createPopperInstance = ({
  referenceEl,
  popperContentEl,
  arrowEl,
}: CreatePopperInstanceParams) => {
  const options = buildPopperOptions(props, {
    arrowEl,
    arrowOffset: unref(arrowOffset),
  })

  return createPopper(referenceEl, popperContentEl, options)
}

const togglePopperAlive = () => {
  const monitorable = { name: 'eventListeners', enabled: props.visible }
  unref(popperInstanceRef)?.setOptions?.((options) => ({
    ...options,
    modifiers: [...(options.modifiers || []), monitorable],
  }))
  updatePopper(false)
  if (props.visible && props.focusOnShow) {
    trapped.value = true
  } else if (props.visible === false) {
    trapped.value = false
  }
}

onMounted(() => {
  let updateHandle: WatchStopHandle

  watch(
    computedReference,
    (referenceEl) => {
      updateHandle?.()
      const popperInstance = unref(popperInstanceRef)
      popperInstance?.destroy?.()
      if (referenceEl) {
        const popperContentEl = unref(popperContentRef)!
        contentRef.value = popperContentEl
        // 创建popper实例
        popperInstanceRef.value = createPopperInstance({
          referenceEl,
          popperContentEl,
          arrowEl: unref(arrowRef),
        })

        updateHandle = watch(
          // getBoundingClientRect方法可以自定义 ps: { getBoundingClientRect() { return ref().value } }
          // 用于实现virtual-ref
          () => referenceEl.getBoundingClientRect(),
          () => updatePopper(),
          {
            immediate: true,
          }
        )
      } else {
        popperInstanceRef.value = undefined
      }
    },
    {
      immediate: true,
    }
  )

  watch(
    () => props.triggerTargetEl,
    (triggerTargetEl, prevTriggerTargetEl) => {
      triggerTargetAriaStopWatch?.()
      triggerTargetAriaStopWatch = undefined

      const el = unref(triggerTargetEl || popperContentRef.value)
      const prevEl = unref(prevTriggerTargetEl || popperContentRef.value)

      if (isElement(el)) {
        triggerTargetAriaStopWatch = watch(
          [role, () => props.ariaLabel, ariaModal, () => props.id],
          (watches) => {
            ;['role', 'aria-label', 'aria-modal', 'id'].forEach((key, idx) => {
              isNil(watches[idx])
                ? el.removeAttribute(key)
                : el.setAttribute(key, watches[idx]!)
            })
          },
          { immediate: true }
        )
      }
      if (prevEl !== el && isElement(prevEl)) {
        ;['role', 'aria-label', 'aria-modal', 'id'].forEach((key) => {
          prevEl.removeAttribute(key)
        })
      }
    },
    { immediate: true }
  )
  // popper 显示状态切换
  watch(() => props.visible, togglePopperAlive, { immediate: true })

  watch(
    () =>
      buildPopperOptions(props, {
        arrowEl: unref(arrowRef),
        arrowOffset: unref(arrowOffset),
      }),
    (option) => popperInstanceRef.value?.setOptions(option)
  )
})

onBeforeUnmount(() => {
  triggerTargetAriaStopWatch?.()
  triggerTargetAriaStopWatch = undefined
})

defineExpose({
  /**
   * @description popper content element
   */
  popperContentRef,
  /**
   * @description popperjs instance
   */
  popperInstanceRef,
  /**
   * @description method for updating popper
   */
  updatePopper,

  /**
   * @description content style
   */
  contentStyle,
})
</script>

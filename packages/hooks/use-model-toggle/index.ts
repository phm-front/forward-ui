import { getCurrentInstance, computed, watch, onMounted } from 'vue';
import { definePropType } from '@forward-ui/utils';
import { isBoolean, isClient } from '@vueuse/core'
import { isFunction } from '@vue/shared';

import type { Ref, ExtractPropTypes, ComponentPublicInstance } from 'vue';
import type { RouteLocationNormalizedLoaded } from 'vue-router'

type Value<T> = T[keyof T]
type ExtractPropType<T extends object> = Value<
  ExtractPropTypes<{
    key: T
  }>
>

const _prop = {
  type: definePropType<boolean | null>(Boolean),
  default: null,
} as const
const _event = {
  type: definePropType<(val: boolean) => void>(Function),
} as const

export type UseModelTogglePropsRaw<T extends string> = {
  [K in T]: typeof _prop
} & {
  [K in `onUpdate:${T}`]: typeof _event
}

export type ModelToggleParams = {
  indicator: Ref<boolean>
  toggleReason?: Ref<Event | undefined>
  shouldHideWhenRouteChanges?: Ref<boolean>
  shouldProceed?: () => boolean
  onShow?: (event?: Event) => void
  onHide?: (event?: Event) => void
}

export type UseModelTogglePropsGeneric<T extends string> = {
  [K in T]: ExtractPropType<typeof _prop>
} & {
  [K in `onUpdate:${T}`]: ExtractPropType<typeof _event>
}

export const createModelToggleComposable = <T extends string>(name: T) => {
  // v-model:name
  const updateEventKey = `update:${name}` as const
  const updateEventKeyRaw = `onUpdate:${name}` as const
  const useModelToggleEmits = [updateEventKey]

  const useModelToggleProps = {
    [name]: _prop,
    [updateEventKeyRaw]: _event,
  } as UseModelTogglePropsRaw<T>

  const useModelToggle = ({
    indicator, // 决定popper是否显示
    toggleReason,
    shouldHideWhenRouteChanges,
    shouldProceed,
    onShow,
    onHide,
  }: ModelToggleParams) => {
    const instance = getCurrentInstance()!
    const { emit } = instance
    const props = instance.props as UseModelTogglePropsGeneric<T> & {
      disabled: boolean
    }
    // 是否存在更新函数
    const hasUpdateHandler = computed(() =>
      isFunction(props[updateEventKeyRaw])
    )
    // 绑定值是否为null
    const isModelBindingAbsent = computed(() => props[name] === null)

    const doShow = (e?: Event) => {
      if (indicator.value === true) return
      indicator.value = true
      if (toggleReason) {
        toggleReason.value = event
      }
      if (isFunction(onShow)) {
        onShow(e)
      }
    }
    
    const doHide = (e?: Event) => {
      if (indicator.value === false) {
        return
      }

      indicator.value = false
      if (toggleReason) {
        toggleReason.value = e
      }
      if (isFunction(onHide)) {
        onHide(e)
      }
    }

    const show = (e?: Event) => {
      if (props.disabled === true || 
        (isFunction(shouldProceed) && !shouldProceed())
      ) return
      // 是否绑定了更新值的函数 onUpdate:name
      const shouldEmit = hasUpdateHandler.value && isClient

      if (shouldEmit) {
        emit(updateEventKey, true)
      }

      if (isModelBindingAbsent.value || !shouldEmit) {
        doShow(e)
      }
    }

    const hide = (e?: Event) => {
      if (props.disabled === true || !isClient) return

      const shouldEmit = hasUpdateHandler.value && isClient

      if (shouldEmit) {
        emit(updateEventKey, false)
      }

      if (isModelBindingAbsent.value || !shouldEmit) {
        doHide(e)
      }
    }

    const onChange = (val: boolean) => {
      if (!isBoolean(val)) return
      if (props.disabled && val) {
        if (hasUpdateHandler.value) {
          emit(updateEventKey, false)
        }
      } else if (indicator.value !== val) {
        if (val) {
          doShow()
        } else {
          doHide()
        }
      }
    }

    const toggle = () => {
      if (indicator.value) {
        hide()
      } else {
        show()
      }
    }

    watch(() => props[name], onChange)

    onMounted(() => {
      onChange(props[name])
    })
    // route改变 隐藏model
    if (
      shouldHideWhenRouteChanges &&
      instance.appContext.config.globalProperties.$route !== undefined
    ) {
      watch(
        () => ({
          ...(
            instance.proxy as ComponentPublicInstance<{
              $route: RouteLocationNormalizedLoaded
            }>
          ).$route,
        }),
        () => {
          if (shouldHideWhenRouteChanges.value && indicator.value) {
            hide()
          }
        }
      )
    }

    return {
      hide,
      show,
      toggle,
      hasUpdateHandler,
    }
  }

  return {
    useModelToggle,
    useModelToggleProps,
    useModelToggleEmits,
  }
}

const { useModelToggle, useModelToggleProps, useModelToggleEmits } =
  createModelToggleComposable('modelValue')

export { useModelToggle, useModelToggleEmits, useModelToggleProps }

export type UseModelToggleProps = ExtractPropTypes<typeof useModelToggleProps>

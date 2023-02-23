import {
  buildProps,
  definePropType,
  iconPropType,
  mutable,
  Mutable,
} from '@forward-ui/utils'
import { isClient } from '@vueuse/core'
import type { AppContext, ExtractPropTypes, VNode } from 'vue'
import type MessageConstructor from './message.vue'

export const messageTypes = ['success', 'info', 'warning', 'error'] as const
export type messageType = typeof messageTypes[number]

export const messageDefaults = mutable({
  id: '',
  type: 'info',
  message: '',
  showClose: false,
  center: false,
  duration: 3000,
  icon: undefined,
  dangerouslyUseHTMLString: false,
  customClass: '',
  onClose: undefined,
  offset: 16,
  zIndex: 0,
  grouping: false,
  repeatNum: 1,
  appendTo: isClient ? document.body : (undefined as never),
} as const)

export const messageProps = buildProps({
  id: {
    type: String,
    default: messageDefaults.id,
  },
  type: {
    type: String,
    values: messageTypes,
    default: messageDefaults.type,
  },
  message: {
    type: definePropType<string | VNode | (() => VNode)>([
      String,
      Object,
      Function,
    ]),
    default: messageDefaults.message,
  },
  showClose: {
    type: Boolean,
    default: messageDefaults.showClose,
  },
  center: {
    type: Boolean,
    default: messageDefaults.center,
  },
  duration: {
    type: Number,
    default: messageDefaults.duration,
  },
  dangerouslyUseHTMLString: {
    type: Boolean,
    default: messageDefaults.dangerouslyUseHTMLString,
  },
  icon: {
    type: iconPropType,
    default: messageDefaults.icon,
  },
  customClass: {
    type: String,
    default: messageDefaults.customClass,
  },
  onClose: {
    type: definePropType<() => void>(Function),
    required: false,
  },
  offset: {
    type: Number,
    default: messageDefaults.offset,
  },
  zIndex: {
    type: Number,
    default: messageDefaults.zIndex,
  },
  grouping: {
    type: Boolean,
    default: messageDefaults.grouping,
  },
  repeatNum: {
    type: Number,
    default: messageDefaults.repeatNum,
  },
} as const)

export type MessageProps = ExtractPropTypes<typeof messageProps>

export type MessageInstance = InstanceType<typeof MessageConstructor>

export type MessageOptions = Partial<
  Mutable<
    Omit<MessageProps, 'id'> & {
      appendTo?: HTMLElement | string
    }
  >
>
export type MessageParams = MessageOptions | MessageOptions['message']
export type MessageParamsNormalized = Omit<MessageProps, 'id'> & {
  appendTo: HTMLElement
}
export type MessageOptionsWithType = Omit<MessageOptions, 'type'>

export type MessageParamsWithType =
  | MessageOptionsWithType
  | MessageOptions['message']

export interface MessageHandler {
  close: () => void
}

export type MessageFn = {
  (options?: MessageParams, appContext?: null | AppContext): MessageHandler
  closeAll(type?: messageType): void
}

export type MessageTypedFn = (
  options?: MessageParamsWithType,
  appContext?: null | AppContext
) => MessageHandler

export interface Message extends MessageFn {
  success: MessageTypedFn
  warning: MessageTypedFn
  info: MessageTypedFn
  error: MessageTypedFn
}

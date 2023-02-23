import { isClient } from '@vueuse/core'
import { instances, MessageContext } from './instance'
import {
  messageDefaults,
  MessageFn,
  MessageHandler,
  messageTypes,
} from './message'
import MessageConstructor from './message.vue'
import { AppContext, createVNode, render } from 'vue'
import type {
  Message,
  MessageParams,
  MessageParamsNormalized,
  messageType,
  MessageOptions,
} from './message'
import {
  debugWarn,
  isElement,
  isFunction,
  isString,
  isVNode,
  isNumber,
} from '@forward-ui/utils'
import { useZIndex } from '@forward-ui/hooks'

let seed = 1

const normalizeOptions = (params?: MessageParams) => {
  const options: MessageOptions =
    !params || isString(params) || isVNode(params) || isFunction(params)
      ? { message: params }
      : params

  const normalized = {
    ...messageDefaults,
    ...options,
  }

  if (!normalized.appendTo) {
    normalized.appendTo = document.body
  } else if (isString(normalized.appendTo)) {
    let appendTo = document.querySelector<HTMLElement>(normalized.appendTo)

    if (!isElement(appendTo)) {
      debugWarn(
        '[FMessage]',
        'appendTo不是一个有效的HTML元素,返回document.body'
      )
      appendTo = document.body
    }

    normalized.appendTo = appendTo
  }

  return normalized as MessageParamsNormalized
}

const closeMessage = (instance: MessageContext) => {
  const idx = instances.indexOf(instance)
  if (idx === -1) return

  instances.splice(idx, 1)
  const { handler } = instance
  handler.close()
}

const createMessage = (
  { appendTo, ...options }: MessageParamsNormalized,
  context?: AppContext | null
) => {
  const { nextZIndex } = useZIndex()
  const id = `message_${seed++}`
  const userOnClose = options.onClose

  const props = {
    ...options,
    zIndex: nextZIndex() + options.zIndex,
    id,
    onClose: () => {
      userOnClose?.()
      closeMessage(instance)
    },
    onDestroy: () => {
      render(null, container)
    },
  }

  const container = document.createElement('div')

  const vnode = createVNode(
    MessageConstructor,
    props,
    isFunction(props.message) || isVNode(props.message)
      ? {
          default: isFunction(props.message)
            ? props.message
            : () => props.message,
        }
      : null
  )

  vnode.appContext = context || message._context

  render(vnode, container)
  appendTo.appendChild(container.firstElementChild!)

  const vm = vnode.component!

  const handler: MessageHandler = {
    close: () => {
      vm.exposed!.visible.value = false
    },
  }
  const instance: MessageContext = {
    id,
    vnode,
    vm,
    handler,
    props: (vnode.component as any).props,
  }

  return instance
}

const message: MessageFn &
  Partial<Message> & { _context: AppContext | null } = (
  options = {},
  context
) => {
  if (!isClient) return { close: () => undefined }

  // TODO:超出限制
  // if (isNumber(messageConfig.max) && instances.length >= messageConfig.max) {
  //   return { close: () => undefined }
  // }

  const normalized = normalizeOptions(options)

  if (normalized.grouping && instances.length) {
    const instance = instances.find(
      ({ vnode: vm }) => vm.props?.message === normalized.message
    )
    if (instance) {
      //@ts-ignore
      instance.props.repeatNum += 1
      //@ts-ignore
      instance.props.type = normalized.type
      return instance.handler
    }
  }

  const instance = createMessage(normalized, context)

  instances.push(instance)
  return instance.handler
}

messageTypes.forEach((type) => {
  message[type] = (options = {}, appContext) => {
    const normalized = normalizeOptions(options)
    return message({ ...normalized, type }, appContext)
  }
})

export function closeAll(type?: messageType): void {
  for (const instance of instances) {
    if (!type || type === instance.props.type) {
      instance.handler.close()
    }
  }
}

message.closeAll = closeAll
message._context = null
export default message as Message

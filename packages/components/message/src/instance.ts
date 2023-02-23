import { shallowReactive } from 'vue'
import type { Mutable } from '@forward-ui/utils'
import type { ComponentInternalInstance, VNode } from 'vue'
import type { MessageHandler, MessageParams } from './message'

export type MessageContext = {
  id: string
  vnode: VNode
  handler: MessageHandler
  vm: ComponentInternalInstance
  props: Mutable<MessageParams>
}

export const instances: MessageContext[] = shallowReactive([])

export const getInstance = (id: string) => {
  const idx = instances.findIndex((instances) => instances.id === id)
  const current = instances[idx]
  let prev: MessageContext | undefined
  if (idx > 0) {
    prev = instances[idx - 1]
  }
  return { current, prev }
}

export const getLastOffset = (id: string) => {
  const { prev } = getInstance(id)
  if (!prev) return 0
  return prev.vm.exposed!.bottom.value
}

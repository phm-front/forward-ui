import { onBeforeMount, ref, computed } from 'vue'
import { isClient } from '@vueuse/core'
import { defaultNamespace } from '../use-namespace'
import { useIdInjection } from '../use-id'

let cachedContainer: HTMLElement

export const usePopperContainerId = () => {
  const namespace = ref(defaultNamespace)
  const idInjection = useIdInjection()

  const id = computed(
    () => `${namespace.value}-popper-container-${idInjection.prefix}`
  )
  const selector = computed(() => `#${id.value}`)
  return { id, selector }
}

const createContainer = (id: string) => {
  const container = document.createElement('div')
  container.id = id
  document.body.appendChild(container)
  return container
}

export const usePopperContainer = () => {
  onBeforeMount(() => {
    if (!isClient) return
    const { id, selector } = usePopperContainerId()
    if (
      process.env.NODE_ENV === 'test' ||
      (!cachedContainer && !document.querySelector(selector.value))
    ) {
      cachedContainer = createContainer(id.value)
    }
  })
}

import type { InjectionKey, Ref } from 'vue'
interface ScrollbarContext {
  scrollbarElement: Ref<HTMLDivElement | undefined>,
  wrapElement: Ref<HTMLDivElement | undefined>
}
export const scrollbarContextKey: InjectionKey<ScrollbarContext> = Symbol('scrollbarContextKey')

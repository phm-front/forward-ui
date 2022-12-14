import type { InjectionKey, Ref } from 'vue'
interface ScrollbarContext {
  scrollbarElement: Ref<HTMLDivElement | undefined>,
  wrapElement: Ref<HTMLDivElement | undefined>,
  maxTransitionY: Ref<number>,
  maxTransitionX: Ref<number>
}
export const scrollbarContextKey: InjectionKey<ScrollbarContext> = Symbol('scrollbarContextKey')

// 提供vue3组件类型提示
// For this project development
import '@vue/runtime-core'

declare module '@vue/runtime-core' {
  // GlobalComponents for Volar
  export interface GlobalComponents {
    FIcon: typeof import('../packages/forward-ui')['FIcon']
  }
}

export {}

// 提供vue3组件类型提示
// For this project development
import '@vue/runtime-core'

declare module '@vue/runtime-core' {
  // GlobalComponents for Volar
  export interface GlobalComponents {
    FIcon: typeof import('../packages/forward-ui')['FIcon']
    FButton: typeof import('../packages/forward-ui')['FButton']
    FContainer: typeof import('../packages/forward-ui')['FContainer']
    FHeader: typeof import('../packages/forward-ui')['FHeader']
    FFooter: typeof import('../packages/forward-ui')['FFooter']
    FMain: typeof import('../packages/forward-ui')['FMain']
    FAside: typeof import('../packages/forward-ui')['FAside']
    FDivider: typeof import('../packages/forward-ui')['FDivider']
    FRow: typeof import('../packages/forward-ui')['FRow']
    FCol: typeof import('../packages/forward-ui')['FCol']
    FScrollbar: typeof import('../packages/forward-ui')['FScrollbar']
    FLink: typeof import('../packages/forward-ui')['FLink']
    FInput: typeof import('../packages/forward-ui')['FInput']
    FSwitch: typeof import('../packages/forward-ui')['FSwitch']
    FPopper: typeof import('../packages/forward-ui')['FPopper']
  }
}

export {}
